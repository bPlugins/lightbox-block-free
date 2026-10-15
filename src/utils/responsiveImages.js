import { createContext, useContext, useEffect, useMemo, useRef, useState } from '@wordpress/element';

// Per-block data: srcset map + lazy flag from render.php (data-responsive), loaded effect / icon from the lazyLoad attribute.
// Editor gets no map, so grid images keep their saved URL there.
const ResponsiveContext = createContext({ lazy: false, aboveFold: false, images: {}, effect: 'none', loadingIcon: false, iconStyle: 'spinner', iconSize: 28, iconColor: '', customIcon: '', placeholder: 'none', placeholderColor: '', cropPosition: 'center center', distance: 200, delay: 0 });

// Loading icon markup: <i> pieces per style (dots, lines, grid...), SVG arc for material. Shapes live in _loading-icons.scss
const iconPieces = { dots: 3, bars: 3, lines: 12, circleDots: 8, ripple: 2, grid: 9 };

// 'custom' shows the user's own uploaded loader (GIF / SVG / PNG) at the chosen size
export const LoadingIcon = ({ type = 'spinner', color, size, src = '', className = '' }) => <span className={`lbbSpinner lbbSpinner-${type} ${className}`.trim()} style={{ ...(color ? { color } : {}), ...(size ? { '--lbbIconSize': `${size}px` } : {}) }} aria-hidden='true'>
    {'custom' === type ? (src ? <img src={src} alt='' /> : null) : 'material' === type ?
        <svg viewBox='0 0 50 50'><circle cx='25' cy='25' r='20' /></svg> :
        Array.from({ length: iconPieces[type] || 0 }, (_, i) => <i key={i} />)}
</span>;

// Same defaults as the Pro plugin's site-wide settings
export const LAZY_DEFAULTS = { enabled: true, distance: 200, delay: 0, thumbSize: 'large', effect: 'fadeIn', loadingIcon: false, iconStyle: 'spinner', iconSize: 28, iconColor: '#888888', customIcon: '', placeholder: 'none', placeholderColor: '#f0f0f1', cropPosition: 'center center', webp: false };

// Block's lazyLoad holds only its overrides; site-wide settings (window.lbbLazyDefaults, editor only) fill the rest.
// On the front end render.php already sends the merged object.
// The block stores only the options it changed; an empty {} default reaches the editor as [] via PHP, so arrays count as "nothing changed"
export const lazyOverrides = (lazyLoad) => (lazyLoad && 'object' === typeof lazyLoad && !Array.isArray(lazyLoad)) ? lazyLoad : {};
export const getLazyLoad = (lazyLoad) => ({ ...LAZY_DEFAULTS, ...lazyOverrides(lazyLoad) });

// Shown until the image is near the viewport, so the real file is not requested
const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// One shared IntersectionObserver per load distance
const observers = {};
const observeNear = (el, distance, onNear) => {
    if (typeof IntersectionObserver === 'undefined') {
        onNear();
        return () => { };
    }
    if (!observers[distance]) {
        const callbacks = new Map();
        const io = new IntersectionObserver(entries => entries.forEach(entry => {
            const cb = entry.isIntersecting && callbacks.get(entry.target);
            if (cb) {
                callbacks.delete(entry.target);
                io.unobserve(entry.target);
                cb();
            }
        }), { rootMargin: `${distance}px` });
        observers[distance] = { io, callbacks };
    }
    const { io, callbacks } = observers[distance];
    callbacks.set(el, onNear);
    io.observe(el);

    return () => {
        callbacks.delete(el);
        io.unobserve(el);
    };
}

export const ResponsiveProvider = ResponsiveContext.Provider;

export const parseResponsive = (raw) => {
    try {
        const data = JSON.parse(raw || '{}');
        return { lazy: !!data?.lazy, images: (data?.images && typeof data.images === 'object') ? data.images : {} };
    } catch (e) {
        return { lazy: false, images: {} };
    }
}

// Adds the block's loaded effect / loading icon settings on top of the map (used by Lightbox.js in editor + front end)
export const LazyLoadProvider = ({ lazyLoad, children }) => {
    const parent = useContext(ResponsiveContext);
    // Icon style / size / color, custom icon and the blur placeholder are Pro features: Free uses the default spinner and a color box
    const { effect, loadingIcon, placeholder, placeholderColor, cropPosition, distance, delay } = getLazyLoad(lazyLoad);
    const value = useMemo(() => ({
        ...parent, effect, loadingIcon: !!loadingIcon, iconStyle: 'spinner', iconSize: 28, iconColor: '', customIcon: '', placeholder: 'blur' === placeholder ? 'color' : placeholder, placeholderColor, cropPosition, distance: Math.max(0, parseInt(distance, 10) || 0), delay: Math.max(0, parseInt(delay, 10) || 0)
    }), [parent, effect, loadingIcon, placeholder, placeholderColor, cropPosition, distance, delay]);

    return <ResponsiveProvider value={value}>{children}</ResponsiveProvider>
}

// Lightbox file for an image item: its WebP copy when one is served, else the original URL
export const useFullLookup = () => {
    const { images } = useContext(ResponsiveContext);
    return (url) => (url && !Array.isArray(images) && images[url]?.full) || url;
}

// Small (thumbnail size) URL for a grid image, for lists like the slider thumb strip
export const useThumbLookup = () => {
    const { images } = useContext(ResponsiveContext);
    return (url) => (url && !Array.isArray(images) && images[url]?.thumb) || url;
}

/**
 * Responsive (srcset), lazy-load, loaded-effect props for a grid <img>.
 * Spread imgProps after the img's own className / onLoad; render `spinner` inside the img wrapper
 * (it holds the placeholder layer and the loading icon).
 */
export const useResponsiveImg = (url, className = '', onLoad) => {
    const { lazy, aboveFold, images, effect, loadingIcon, iconStyle, iconSize, iconColor, customIcon, placeholder, placeholderColor, cropPosition, distance, delay } = useContext(ResponsiveContext);
    const r = (url && !Array.isArray(images) && images[url]) || null;
    const [isLoaded, setLoaded] = useState(false);
    const [isRevealed, setRevealed] = useState(false);
    const [isNear, setNear] = useState(!lazy || !!(r?.eager && aboveFold));
    const imgRef = useRef(null);

    // Real src/srcset go in only when the image is within `distance` px of the viewport, after the optional delay
    useEffect(() => {
        if (isNear || !imgRef.current) {
            return;
        }
        if (!delay || typeof IntersectionObserver === 'undefined') {
            return observeNear(imgRef.current, distance, () => setNear(true));
        }

        // With a delay the image must stay near the screen for the whole wait; scrolling past cancels it
        let timer;
        const io = new IntersectionObserver(([entry]) => {
            clearTimeout(timer);
            if (entry?.isIntersecting) {
                timer = setTimeout(() => {
                    io.disconnect();
                    setNear(true);
                }, delay);
            }
        }, { rootMargin: `${distance}px` });
        io.observe(imgRef.current);

        return () => {
            clearTimeout(timer);
            io.disconnect();
        };
    }, [isNear, distance, delay]);

    const classes = [className];
    const imgProps = r ? { srcSet: r.srcset || undefined, sizes: r.srcset ? r.sizes : undefined, width: r.width || undefined, height: r.height || undefined } : {};

    // skip-lazy / data-no-lazy keep WP Rocket, LiteSpeed, Smush etc. from rewriting our src/srcset
    if (lazy) {
        classes.push('skip-lazy');
        Object.assign(imgProps, { 'data-no-lazy': '1', decoding: 'async', ref: imgRef });

        if (!isNear) {
            Object.assign(imgProps, { src: BLANK_IMG, srcSet: undefined, sizes: undefined });
        }
    }

    if (effect && effect !== 'none') {
        classes.push(`lbbFx lbbFx-${effect}`);
    }
    if (isLoaded) {
        classes.push('is-loaded');
    }

    imgProps.className = classes.filter(Boolean).join(' ') || undefined;
    // Crop position: which part stays visible when object-fit crops the image to the box
    const cropStyle = cropPosition && 'center center' !== cropPosition ? { objectPosition: cropPosition } : undefined;
    imgProps.style = cropStyle;
    // Ignore the placeholder's own load event
    imgProps.onLoad = (e) => {
        if (!isNear) return;
        setLoaded(true);
        onLoad && onLoad(e);
    };
    imgProps.onError = () => isNear && setLoaded(true);

    // Placeholder stays until the loaded effect has finished, then goes (so transparent PNGs don't keep a background)
    useEffect(() => {
        if (!isLoaded) return;
        const timer = setTimeout(() => setRevealed(true), 700);
        return () => clearTimeout(timer);
    }, [isLoaded]);

    // Blur = tiny thumbnail blown up (LQIP); falls back to the color box when the image has no thumbnail (external URL)
    const phType = 'blur' === placeholder && !r?.thumb ? 'color' : placeholder;
    const phLayer = isRevealed || !phType || 'none' === phType ? null :
        'blur' === phType ? (isNear ? <img className='lbbPlaceholder lbbPlaceholder-blur' src={r.thumb} alt='' aria-hidden='true' style={cropStyle} /> : <span className='lbbPlaceholder' style={{ background: placeholderColor }} />) :
            <span className='lbbPlaceholder' style={{ background: placeholderColor }} />;

    const icon = (loadingIcon && !isLoaded) ? <LoadingIcon type={iconStyle} color={iconColor} size={iconSize} src={customIcon} /> : null;
    const spinner = (phLayer || icon) ? <>{phLayer}{icon}</> : null;

    return { src: r?.src, thumb: r?.thumb, imgProps, spinner };
}

// Auto Lightbox front end: opens core Image / Gallery images (and, Pro, the WooCommerce product gallery) tagged by inc/AutoLightbox.php. No React, Fancybox only.
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import './auto-lightbox.scss';

const SELECTOR = '[data-fancybox^="lbb-auto-"]';
const WOO_GALLERY = '.woocommerce-product-gallery';
const WOO_IMAGE = '.woocommerce-product-gallery__image';
const l10n = window.lbbAutoLightboxL10n || {};

const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Caption: the figure's figcaption (already filtered post content), else the image alt as plain text.
// WooCommerce: only the image's own caption, as WooCommerce shows it (its alt falls back to the product name)
const captionOf = (el, img) => {
    if (el.getAttribute('data-fancybox').startsWith('lbb-auto-woo')) {
        const text = img?.dataset.caption?.trim();
        return text ? escapeHtml(text) : '';
    }
    // Image / Gallery blocks and [caption]: <figure><figcaption>; [gallery]: .gallery-item .gallery-caption (<figcaption> or <dd>)
    const figcaption = el.closest('figure, .gallery-item')?.querySelector('figcaption, .gallery-caption');
    if (figcaption && figcaption.textContent.trim()) {
        return figcaption.innerHTML;
    }
    return img?.alt ? escapeHtml(img.alt) : '';
};

const toSlide = el => {
    const img = 'IMG' === el.tagName ? el : el.querySelector('img');
    return {
        src: 'A' === el.tagName ? el.getAttribute('href') : el.dataset.lbbSrc,
        type: 'image',
        thumb: img ? img.currentSrc || img.src : undefined,
        caption: captionOf(el, img),
    };
};

// WooCommerce slider: on close, show the image the visitor ended on
const syncWooSlider = (el, index) => {
    const gallery = el.closest(WOO_GALLERY);
    const $ = window.jQuery;
    if (gallery && $ && $(gallery).data('flexslider')) {
        $(gallery).flexslider(index);
    }
};

const open = el => {
    const group = el.getAttribute('data-fancybox');
    const items = [...document.querySelectorAll(SELECTOR)].filter(item => item.getAttribute('data-fancybox') === group);
    Fancybox.show(items.map(toSlide), {
        startIndex: Math.max(0, items.indexOf(el)),
        Hash: false,
        mainClass: 'lbbAutoLightbox',
        on: {
            close: fancybox => {
                const index = fancybox.getSlide()?.index;
                if (Number.isInteger(index) && items[index]) syncWooSlider(items[index], index);
            },
        },
    });
};

// An <img> we tagged but a theme wrapped in a link of its own (e.g. a featured image linked to the post): the link wins
const isWrapped = el => 'IMG' === el.tagName && !!el.closest('a[href]');

// The WooCommerce zoom lays a copy of the image over the link, so a click there lands on the gallery item, not on the link
const targetOf = node => {
    const el = node.closest?.(SELECTOR) || node.closest?.(WOO_IMAGE)?.querySelector(SELECTOR);
    return el && !isWrapped(el) ? el : null;
};

document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
    }
    const trigger = e.target.closest?.('.lbbAutoWooTrigger');
    if (trigger) {
        const gallery = trigger.closest(WOO_GALLERY);
        const el = gallery?.querySelector(`.flex-active-slide ${SELECTOR}`) || gallery?.querySelector(SELECTOR);
        e.preventDefault();
        el && open(el);
        return;
    }
    const el = targetOf(e.target);
    if (!el) {
        return;
    }
    e.preventDefault();
    open(el);
});

// WooCommerce shows its 🔍 button only with its own lightbox: the same button, for ours (styled by the theme's WooCommerce CSS)
const addWooTrigger = () => {
    if (!window.wc_single_product_params?.zoom_enabled) return;
    document.querySelectorAll(WOO_GALLERY).forEach(gallery => {
        if (gallery.querySelector('.woocommerce-product-gallery__trigger') || !gallery.querySelector(SELECTOR)) return;
        const trigger = document.createElement('a');
        trigger.href = '#';
        trigger.className = 'woocommerce-product-gallery__trigger lbbAutoWooTrigger';
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-label', l10n.zoom || 'View full-screen image gallery');
        trigger.innerHTML = '<span aria-hidden="true">🔍</span>';
        gallery.prepend(trigger);
    });
};

// Images with no link are not focusable: make them reachable and openable from the keyboard
const makeAccessible = () => {
    document.querySelectorAll(`img${SELECTOR}`).forEach(img => {
        if (img.hasAttribute('tabindex') || isWrapped(img)) return;
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        if (!img.getAttribute('aria-label')) {
            img.setAttribute('aria-label', img.alt ? (l10n.openNamed || '%s, open in lightbox').replace('%s', img.alt) : (l10n.open || 'Open image in lightbox'));
        }
    });
};

document.addEventListener('keydown', e => {
    if ('Enter' !== e.key && ' ' !== e.key) return;
    if (' ' === e.key && e.target.closest?.('.lbbAutoWooTrigger')) {
        e.preventDefault();
        e.target.click();
        return;
    }
    const el = e.target.closest?.(`img${SELECTOR}`);
    if (!el || isWrapped(el)) return;
    e.preventDefault();
    open(el);
});

const init = () => {
    makeAccessible();
    addWooTrigger();
};

if ('loading' === document.readyState) {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

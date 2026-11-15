import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

import { checkIcon, layersIcon, expandIcon, lockIcon, cartIcon } from '../LazyLoad/icons';
import './settingsBase.scss';
import './autoLightbox.scss';

// Preview scenes (same as Pro's Lazy Load page)
const svg = markup => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' ${markup}</svg>`)}`;
const tallScene = (sky1, sky2, sun, hill1, hill2) => svg(`viewBox='0 0 300 450'><defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${sky1}'/><stop offset='1' stop-color='${sky2}'/></linearGradient></defs><rect width='300' height='450' fill='url(#s)'/><circle cx='150' cy='72' r='40' fill='${sun}'/><path d='M0 320 L80 215 L150 290 L225 190 L300 280 V450 H0Z' fill='${hill1}'/><path d='M0 385 L110 320 L300 372 V450 H0Z' fill='${hill2}'/>`);
const wideScene = (sky1, sky2, sun, ground, tree) => svg(`viewBox='0 0 600 300'><defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${sky1}'/><stop offset='1' stop-color='${sky2}'/></linearGradient></defs><rect width='600' height='300' fill='url(#s)'/><circle cx='85' cy='105' r='42' fill='${sun}'/><path d='M0 225 Q150 185 300 222 T600 210 V300 H0Z' fill='${ground}'/><rect x='494' y='120' width='14' height='100' rx='3' fill='#5d4037'/><circle cx='501' cy='108' r='44' fill='${tree}'/>`);
const PREVIEW_TILES = [
    tallScene('#fda085', '#f6d365', '#fff7d6', '#b56576', '#6d597a'),
    wideScene('#8fd3f4', '#e0f7fa', '#fff59d', '#43a047', '#1b5e20'),
    tallScene('#a18cd1', '#fbc2eb', '#ffffff', '#5e548e', '#231942'),
    wideScene('#f6d365', '#fda085', '#fff3e0', '#8d6e63', '#33691e'),
    tallScene('#5ee7df', '#b490ca', '#fffde7', '#3d5a80', '#293241'),
    wideScene('#84fab0', '#8fd3f4', '#ffffff', '#2e7d32', '#004d40'),
];

const Toggle = ({ checked, onChange, label, disabled }) => <button
    type='button'
    role='switch'
    aria-checked={checked}
    aria-label={label}
    className={`lbbToggle${checked ? ' isOn' : ''}`}
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
><span /></button>;

// Same as LBBAutoLightbox::defaults() in PHP
const DEFAULTS = { enabled: false, image: true, gallery: true, wooDesc: true };

const SKIPPED = [
    { title: __('Linked to a page', 'lightbox-block'), text: __('Images linked to another page or URL keep their link.', 'lightbox-block') },
    { title: __('"no-lightbox" class', 'lightbox-block'), text: __('Add it in Block → Advanced → Additional CSS class.', 'lightbox-block') },
    { title: __('Lightbox blocks', 'lightbox-block'), text: __('Images inside our own block use that block\'s lightbox.', 'lightbox-block') },
];

// A small post with one image and a gallery: shows which images open, and opens a mock lightbox on click
const LivePreview = ({ enabled, image, gallery }) => {
    const [open, setOpen] = useState(null); // { group: 'image' | 'gallery', index }
    const items = { image: [PREVIEW_TILES[1]], gallery: [PREVIEW_TILES[0], PREVIEW_TILES[2], PREVIEW_TILES[4]] };
    const active = { image: enabled && image, gallery: enabled && gallery };

    useEffect(() => {
        if (open && !active[open.group]) setOpen(null);
    }, [enabled, image, gallery]);

    const tile = (group, src, index) => <button
        key={`${group}-${index}`}
        type='button'
        className={`lbbAutoTile${active[group] ? ' isOn' : ''}`}
        onClick={() => active[group] && setOpen({ group, index })}
        aria-label={active[group] ? __('Open preview lightbox', 'lightbox-block') : __('No lightbox', 'lightbox-block')}
    >
        <img src={src} alt='' />
        <span className='lbbAutoTileBadge'>{active[group] ? expandIcon : '—'}</span>
    </button>;

    const list = open ? items[open.group] : [];
    const step = dir => setOpen(prev => ({ ...prev, index: (prev.index + dir + list.length) % list.length }));

    return <div className='lbbAutoPreview'>
        <div className='lbbAutoPost'>
            <span className='lbbAutoLine isTitle' />
            <span className='lbbAutoLine' />
            <span className='lbbAutoLine isShort' />
            <span className='lbbPreviewLabel'>{__('Image block', 'lightbox-block')}</span>
            <div className='lbbAutoSingle'>{tile('image', items.image[0], 0)}</div>
            <span className='lbbAutoLine' />
            <span className='lbbPreviewLabel'>{__('Gallery block', 'lightbox-block')}</span>
            <div className='lbbAutoGallery'>{items.gallery.map((src, i) => tile('gallery', src, i))}</div>
        </div>

        {open && <div className='lbbAutoModal' role='dialog' aria-label={__('Preview lightbox', 'lightbox-block')}>
            <button type='button' className='lbbAutoClose' onClick={() => setOpen(null)} aria-label={__('Close', 'lightbox-block')}>×</button>
            {list.length > 1 && <button type='button' className='lbbAutoNav isPrev' onClick={() => step(-1)} aria-label={__('Previous', 'lightbox-block')}>‹</button>}
            <img src={list[open.index]} alt='' />
            {list.length > 1 && <button type='button' className='lbbAutoNav isNext' onClick={() => step(1)} aria-label={__('Next', 'lightbox-block')}>›</button>}
            <span className='lbbAutoCount'>{open.index + 1} / {list.length}</span>
        </div>}
    </div>;
};

// Lightbox → Settings → Auto Lightbox (Free): core Image / Gallery images open in our lightbox site-wide
// Settings rows, grouped by where the images are. pro: Lightbox Block Pro only
const SECTIONS = wooActive => [
    {
        title: __('Posts & Pages', 'lightbox-block'), text: __('Images inside your posts and pages.', 'lightbox-block'), rows: [
            { key: 'image', label: __('Post Images', 'lightbox-block'), help: __('On: single images in posts and pages open in the lightbox, also images added with the Classic editor.', 'lightbox-block') },
            { key: 'gallery', label: __('Post Galleries', 'lightbox-block'), help: __('On: each gallery in a post or page opens as one set, with Next / Previous and thumbnails.', 'lightbox-block') },
            { key: 'featured', pro: true, label: __('Post Featured Image', 'lightbox-block'), help: __('On: the featured image at the top of a post or page opens in the lightbox. In blog lists it still links to the post.', 'lightbox-block') },
        ],
    },
    {
        title: __('Shortcode & Widgets', 'lightbox-block'), text: __('Older Classic editor galleries and your sidebar or footer.', 'lightbox-block'), rows: [
            { key: 'shortcode', pro: true, label: __('Gallery Shortcode [gallery]', 'lightbox-block'), help: __('On: galleries made with the [gallery] shortcode (Classic editor → Add Media → Create Gallery) open as one set.', 'lightbox-block') },
            { key: 'widgets', pro: true, label: __('Widget Images', 'lightbox-block'), help: __('On: images in sidebar and footer widgets (Image, Text and Gallery widgets) open in the lightbox.', 'lightbox-block') },
        ],
    },
    {
        title: __('WooCommerce', 'lightbox-block'), icon: cartIcon, text: wooActive ? __('Images on your product pages.', 'lightbox-block') : __('WooCommerce is not active. These options work once it is.', 'lightbox-block'), rows: [
            { key: 'wooDesc', label: __('Product Description Images', 'lightbox-block'), help: __('On: images and galleries in the product description (Description tab) open in the lightbox.', 'lightbox-block') },
            { key: 'woo', pro: true, label: __('Product Gallery', 'lightbox-block'), help: __("On: the main product images at the top of the product page open in this lightbox instead of WooCommerce's own.", 'lightbox-block') },
        ],
    },
];

const AutoLightboxSettings = ({ autoLightbox, wooActive }) => {
    const navigate = useNavigate();
    const initial = { ...DEFAULTS, ...(autoLightbox || {}) };
    const [settings, setSettings] = useState(initial);
    const [saved, setSaved] = useState(initial);
    const [status, setStatus] = useState('');
    const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);
    const { enabled, image, gallery } = settings;
    const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

    const save = async () => {
        setStatus('saving');
        try {
            const res = await apiFetch({ path: '/wp/v2/settings', method: 'POST', data: { lbb_auto_lightbox: settings } });
            const next = { ...DEFAULTS, ...(res?.lbb_auto_lightbox || {}) };
            setSettings(next);
            setSaved(next);
            setStatus('saved');
            setTimeout(() => setStatus(''), 2500);
        } catch (e) {
            setStatus('error');
        }
    };

    useEffect(() => {
        const onLeave = e => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', onLeave);
        return () => window.removeEventListener('beforeunload', onLeave);
    }, [isDirty]);

    return <div className='lbbLazyPage lbbAutoPage'>
        <section className={`lbbHero${enabled ? ' isOn' : ''}`}>
            <div className='lbbHeroIcon'>{expandIcon}</div>
            <div className='lbbHeroText'>
                <span className='lbbEyebrow'>{__('Site-wide', 'lightbox-block')}</span>
                <h1>{__('Auto Lightbox', 'lightbox-block')}</h1>
                <p>{__('Open every Image and Gallery block image in a lightbox, old posts included. No block to insert.', 'lightbox-block')}</p>
            </div>
            <div className='lbbHeroSwitch'>
                <span className={`lbbStatus${enabled ? ' isOn' : ''}`}>{enabled ? __('Active', 'lightbox-block') : __('Off', 'lightbox-block')}</span>
                <Toggle checked={enabled} onChange={val => update('enabled', val)} label={__('Auto Lightbox', 'lightbox-block')} />
            </div>
        </section>

        <section className='lbbCard lbbInfoCard isWide'>
            <span className='lbbInfoIcon'>{layersIcon}</span>
            <div>
                <h4>{__('Works with the blocks you already use', 'lightbox-block')}</h4>
                <p>{__('Nothing to change in your posts. WordPress\'s own "Expand on click" is turned off for these images, so only one lightbox opens. Scripts load only on pages that have such an image.', 'lightbox-block')}</p>
            </div>
        </section>

        <div className='lbbLazyGrid'>
            <div className='lbbLazyMain'>
                {SECTIONS(wooActive).map(section => <section key={section.title} className={`lbbCard${enabled ? '' : ' isMuted'}`}>
                    <div className='lbbCardHead'>
                        <div>
                            <h3 className='lbbAutoCardTitle'>{section.icon && <span>{section.icon}</span>}{section.title}</h3>
                            <p>{section.text}</p>
                        </div>
                    </div>
                    {section.rows.map(row => {
                        const locked = !!row.pro;
                        return <div key={row.key} className={`lbbField lbbFieldRow${locked ? ' isLocked' : ''}`}>
                            <div>
                                <div className='lbbFieldLabel'><label>{row.label}</label>{locked && <span className='lbbProBadge'>{lockIcon} {__('Pro', 'lightbox-block')}</span>}</div>
                                <p className='lbbHelp'>{row.help}</p>
                            </div>
                            <Toggle checked={!locked && !!settings[row.key]} onChange={val => locked ? navigate('/pricing') : update(row.key, val)} label={row.label} />
                        </div>;
                    })}
                </section>)}

                <section className='lbbCard'>
                    <div className='lbbCardHead'>
                        <div>
                            <h3>{__('Skipped Automatically', 'lightbox-block')}</h3>
                            <p>{__('These images are left as they are.', 'lightbox-block')}</p>
                        </div>
                    </div>
                    <ul className='lbbAutoSkipList'>
                        {SKIPPED.map(item => <li key={item.title}>
                            <span className='lbbCheck'>{checkIcon}</span>
                            <div><strong>{item.title}</strong><small>{item.text}</small></div>
                        </li>)}
                    </ul>
                </section>
            </div>

            <aside className='lbbLazySide'>
                <div className='lbbCard'>
                    <div className='lbbCardHead'><div><h3>{__('Live Preview', 'lightbox-block')}</h3><p>{__('Click an image to try it.', 'lightbox-block')}</p></div></div>
                    <LivePreview enabled={enabled} image={image} gallery={gallery} />
                </div>
            </aside>
        </div>

        <div className={`lbbSaveBar${isDirty ? ' isDirty' : ''}`}>
            <span className='lbbSaveStatus'>
                {'saving' === status ? __('Saving…', 'lightbox-block') :
                    'saved' === status ? <>{checkIcon} {__('Settings saved', 'lightbox-block')}</> :
                        'error' === status ? __('Could not save. Please try again.', 'lightbox-block') :
                            isDirty ? __('You have unsaved changes', 'lightbox-block') : __('All changes saved', 'lightbox-block')}
            </span>
            <div className='lbbSaveActions'>
                <button type='button' className='lbbGhostBtn' onClick={() => setSettings({ ...DEFAULTS })}>{__('Reset to defaults', 'lightbox-block')}</button>
                <button type='button' className='lbbPrimaryBtn' disabled={!isDirty || 'saving' === status} onClick={save}>{__('Save Changes', 'lightbox-block')}</button>
            </div>
        </div>
    </div>;
};
export default AutoLightboxSettings;

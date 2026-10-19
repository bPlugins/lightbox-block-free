import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

import { boltIcon, checkIcon, crownIcon, layersIcon, lockIcon } from './icons';
import './lazyLoadProNotice.scss';

const PRO_FEATURES = [
    { title: __('One place for every gallery', 'lightbox-block'), text: __('Set lazy load once — every Lightbox block on your site follows it.', 'lightbox-block') },
    { title: __('10 loading icons + your own', 'lightbox-block'), text: __('Material, iOS lines, ripple, grid… or upload a GIF / SVG loader.', 'lightbox-block') },
    { title: __('Icon size & color', 'lightbox-block'), text: __('Match the loader to your brand.', 'lightbox-block') },
    { title: __('Blur placeholder (LQIP)', 'lightbox-block'), text: __('A tiny blurred preview fades into the sharp image.', 'lightbox-block') },
    { title: __('One-click WebP conversion', 'lightbox-block'), text: __('Convert every gallery image at once, with your own quality setting.', 'lightbox-block') },
    { title: __('Live preview', 'lightbox-block'), text: __('See effect, loader, placeholder and crop before saving.', 'lightbox-block') },
    { title: __('Per-gallery override', 'lightbox-block'), text: __('Any gallery can still use its own settings or reset to the site defaults.', 'lightbox-block') },
];

const FREE_FEATURES = [
    __('Lazy Load', 'lightbox-block'),
    __('Load Distance', 'lightbox-block'),
    __('Load Delay', 'lightbox-block'),
    __('Responsive srcset', 'lightbox-block'),
    __('Thumbnail Size', 'lightbox-block'),
    __('Loaded Effect', 'lightbox-block'),
    __('Loading Icon', 'lightbox-block'),
    __('Color Placeholder', 'lightbox-block'),
    __('Crop Position', 'lightbox-block'),
    __('WebP Images', 'lightbox-block'),
    __('Lazy-load Plugin Conflict Notice', 'lightbox-block'),
];

// Video tutorial on YouTube
const LAZY_TUTORIAL_URL = 'https://www.youtube.com/watch?v=XZCoyDO768M';

// New page with a Lightbox gallery block already inserted (filled by AdminMenu::starterContent)
const tryItUrl = adminUrl => `${adminUrl}post-new.php?post_type=page&lbb_starter=1`;

// Free plugin: site-wide Lazy Load settings live in Pro, so this tab only explains them
const LazyLoadProNotice = ({ adminUrl = '' }) => <div className='lbbLazyNotice'>
    <section className='lbbLazyNoticeFreeBar'>
        <span className='lbbLazyNoticeFreeIcon'>{checkIcon}</span>
        <p>
            <strong>{__('Lazy Load is free in the Lightbox block.', 'lightbox-block')}</strong>{' '}
            {__('Set it for each gallery in the Gutenberg editor: Lightbox block → General → Lazy Load.', 'lightbox-block')}
        </p>
        <div className='lbbLazyNoticeBarActions'>
            <a href={LAZY_TUTORIAL_URL} target='_blank' rel='noreferrer' className='lbbLazyNoticeVideo'>
                <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M8 5.5v13l10.5-6.5z' fill='currentColor' /></svg>
                {__('Watch tutorial', 'lightbox-block')}
            </a>
            <a href={tryItUrl(adminUrl)} target='_blank' rel='noreferrer' className='lbbLazyNoticeTry'>{__('Try it in a new page', 'lightbox-block')} ↗</a>
        </div>
    </section>

    <section className='lbbLazyNoticeHero'>
        <span className='lbbLazyNoticeIcon'>{boltIcon}</span>
        <span className='lbbLazyNoticeBadge'>{crownIcon} {__('Pro Feature', 'lightbox-block')}</span>
        <h1>{__('Global Lazy Load Settings', 'lightbox-block')}</h1>
        <p>{__('In Lightbox Block Pro you control lazy load for all your galleries from this page — loader style, placeholder, crop and more, set once for the whole site.', 'lightbox-block')}</p>

        <div className='lbbLazyNoticeActions'>
            <Link to='/pricing' className='lbbLazyNoticeBtn isPrimary'>{crownIcon} {__('Upgrade to Pro', 'lightbox-block')}</Link>
            <Link to='/feature-comparison' className='lbbLazyNoticeBtn'>{__('Compare Free vs Pro', 'lightbox-block')}</Link>
        </div>
    </section>

    <section className='lbbLazyNoticeGrid'>
        {PRO_FEATURES.map(item => <div key={item.title} className='lbbLazyNoticeItem'>
            <span className='lbbLazyNoticeLock'>{lockIcon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
        </div>)}
    </section>

    <section className='lbbLazyNoticeFree'>
        <span className='lbbLazyNoticeFreeIcon'>{layersIcon}</span>
        <div>
            <h3>{__('Already in your free version — per gallery', 'lightbox-block')}</h3>
            <p>{__('Open any Lightbox block → General → Lazy Load.', 'lightbox-block')}</p>
            <ul>
                {FREE_FEATURES.map(name => <li key={name}>{checkIcon} {name}</li>)}
            </ul>
        </div>
    </section>
</div>;
export default LazyLoadProNotice;

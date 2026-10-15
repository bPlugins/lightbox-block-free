import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

import { pagesIcon, crownIcon, lockIcon } from '../LazyLoad/icons';
import '../LazyLoad/lazyLoadProNotice.scss';

const PRO_FEATURES = [
    { title: __('Load More button', 'lightbox-block'), text: __('Show the first items, the rest on a click.', 'lightbox-block') },
    { title: __('Infinite Scroll', 'lightbox-block'), text: __('The next items load as visitors reach the bottom.', 'lightbox-block') },
    { title: __('Numbered Pages', 'lightbox-block'), text: __('1 2 3 … page links for very big galleries.', 'lightbox-block') },
    { title: __('Items per page', 'lightbox-block'), text: __('Set how many items each gallery shows at a time.', 'lightbox-block') },
    { title: __('"Showing X of Y" counter', 'lightbox-block'), text: __('With your own wording, e.g. "Showing 12 of 48 photos".', 'lightbox-block') },
    { title: __('Site-wide button style', 'lightbox-block'), text: __('Filled or outline, your color and corner radius on every gallery.', 'lightbox-block') },
];

// Free plugin: pagination is Pro, so this tab only explains it
const PaginationProNotice = () => <div className='lbbLazyNotice'>
    <section className='lbbLazyNoticeHero'>
        <span className='lbbLazyNoticeIcon'>{pagesIcon}</span>
        <span className='lbbLazyNoticeBadge'>{crownIcon} {__('Pro Feature', 'lightbox-block')}</span>
        <h1>{__('Gallery Pagination', 'lightbox-block')}</h1>
        <p>{__('Big galleries stay fast and tidy: show a few items first, then the rest with a Load More button, infinite scroll or page numbers. The lightbox still browses every item.', 'lightbox-block')}</p>

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
</div>;
export default PaginationProNotice;

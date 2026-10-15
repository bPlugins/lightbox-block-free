import { NavLink, Outlet } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

import { boltIcon, pagesIcon } from '../LazyLoad/icons';
import './settings.scss';

// One entry per global-settings tab; new features (Auto Lightbox, Protection…) add theirs here
export const SETTINGS_TABS = [
    { slug: 'lazy-load', label: __('Lazy Load', 'lightbox-block'), text: __('Loading, WebP, loaders', 'lightbox-block'), icon: boltIcon },
    { slug: 'pagination', label: __('Pagination', 'lightbox-block'), text: __('Load More & page numbers', 'lightbox-block'), icon: pagesIcon },
];

// Settings page: vertical tabs on the left, the active tab's screen on the right
const SettingsLayout = () => <div className='lbbSettings'>
    <nav className='lbbSettingsNav' aria-label={__('Settings sections', 'lightbox-block')}>
        <span className='lbbSettingsTitle'>{__('Settings', 'lightbox-block')}</span>
        {SETTINGS_TABS.map(tab => <NavLink key={tab.slug} to={`/settings/${tab.slug}`} className={({ isActive }) => `lbbSettingsTab${isActive ? ' isActive' : ''}`}>
            <span className='lbbSettingsTabIcon'>{tab.icon}</span>
            <span>
                <strong>{tab.label}</strong>
                <small>{tab.text}</small>
            </span>
        </NavLink>)}
    </nav>

    <div className='lbbSettingsBody'>
        <Outlet />
    </div>
</div>;
export default SettingsLayout;

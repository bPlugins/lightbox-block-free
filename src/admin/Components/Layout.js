import { Outlet, Link, useLocation } from 'react-router-dom';

import Header from '../../../../bpl-tools/Admin/Header';

const navigation = [
    { name: 'Welcome', href: '/welcome' },
    { name: 'Demos', href: '/demos' },
    { name: 'Settings', href: '/settings/lazy-load', base: '/settings', isNew: true },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Feature Comparison', href: '/feature-comparison' }
];

const Layout = (props) => {
    const location = useLocation();

    return <div className='bPlDashboard'>
        <Header {...props}>
            <nav className='bPlDashboardNav'>
                {navigation
                    ?.map((item, index) => <Link
                        key={index}
                        to={item.href}
                        className={`navLink ${location.pathname === item.href || (item.base && location.pathname.startsWith(item.base)) ? 'active' : ''}`}
                    >
                        {item.name}
                        {item.isNew && <span className='lbbNavNew'>New</span>}
                    </Link>)}
            </nav>
        </Header>

        <main className='bPlDashboardMain'>
            <Outlet />
        </main>
    </div>
}
export default Layout;
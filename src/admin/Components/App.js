import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from '../../../../bpl-tools/Admin/Welcome';
import Demos from '../../../../bpl-tools/Admin/Demos';
import Pricing from '../../../../bpl-tools/Admin/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare';
import OurPlugins from '../../../../bpl-tools/Admin/OurPlugins';
import { Settings } from '../../../../bpl-tools/Admin';

import Layout from './Layout';
import LazyLoadProNotice from './LazyLoad/LazyLoadProNotice';
import SettingsLayout from './Settings/SettingsLayout';
import PaginationProNotice from './Pagination/PaginationProNotice';
import { demoInfo, pricingInfo, settingsInfo, welcomeInfo } from '../utils/data';  // ← added welcomeInfo

const App = (props) => {

    const { adminUrl } = props;

    return <Router>
        <Routes>
            <Route path='/' element={<Layout {...props} />}>
                <Route index element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />
                <Route path='welcome' element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />
                <Route path='demos' element={<Demos {...props} demoInfo={demoInfo} />} />
                {/* Global settings (Pro): left tabs, each tab explains its Pro feature */}
                <Route path='settings' element={<SettingsLayout />}>
                    <Route index element={<Navigate to='lazy-load' replace />} />
                    <Route path='lazy-load' element={<LazyLoadProNotice {...props} />} />
                    <Route path='pagination' element={<PaginationProNotice {...props} />} />
                </Route>
                <Route path='lazy-load' element={<Navigate to='/settings/lazy-load' replace />} />
                <Route path='pricing' element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} />} />
                <Route path='feature-comparison' element={<FeatureCompare plans={['free', 'pro']} {...props} />} />
                {/* bpl-tools uninstall-data screen (not linked in the nav) moved off /settings, which is now our Settings page */}
                <Route path='data-settings' element={<Settings {...props} {...settingsInfo} />} />
                <Route path='our-plugins' element={<OurPlugins {...props} />} />
                <Route path='*' element={<Navigate to='/welcome' replace />} />
            </Route>
        </Routes>
    </Router>;
};
export default App;
import { createRoot } from 'react-dom';

import './dashboard.scss';
import App from './Components/App';
import { dashboardInfo } from './utils/data';

document.addEventListener('DOMContentLoaded', () => {
    const dashboardEl = document.getElementById('lbbDashboard');
    const info = JSON.parse(dashboardEl.dataset.info);

    // Lightbox → Lazy Load submenu opens the dashboard on its own tab
    if (info.initialRoute && !window.location.hash) {
        window.location.hash = `#/${info.initialRoute}`;
    }

    createRoot(dashboardEl).render(<App {...dashboardInfo(info)} />);

    dashboardEl.removeAttribute('data-info');
});
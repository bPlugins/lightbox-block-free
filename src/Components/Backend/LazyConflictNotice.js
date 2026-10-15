import { __, sprintf } from '@wordpress/i18n';
import { Notice } from '../../../../bpl-tools/Components';

// Other lazy-load plugins found by LBBLazyConflicts (PHP) → window.lbbLazyConflicts
const LazyConflictNotice = () => {
    const plugins = (typeof window !== 'undefined' && window.lbbLazyConflicts) || [];
    if (!plugins.length) {
        return null;
    }
    const risky = plugins.filter(plugin => !plugin.honors);

    return risky.length ?
        <Notice status='warning' isIcon={true} className='mb10'>
            {sprintf(__('%s may also lazy-load gallery images. If thumbnails stay blank, add the class "skip-lazy" to its lazy-load exclusions, or turn off Lazy Load Images here.', 'lightbox-block'), risky.map(plugin => plugin.name).join(', '))}
        </Notice> :
        <Notice status='success' isIcon={true} className='mb10'>
            {sprintf(__('%s lazy load is also on. It skips gallery images automatically, so both work together.', 'lightbox-block'), plugins.map(plugin => plugin.name).join(', '))}
        </Notice>;
}
export default LazyConflictNotice;

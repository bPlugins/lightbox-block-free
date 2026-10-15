import { __ } from '@wordpress/i18n';

// object-position values; the 3x3 grid follows this order
export const CROP_POSITIONS = [
    { value: 'left top', label: __('Top Left', 'lightbox-block') },
    { value: 'center top', label: __('Top', 'lightbox-block') },
    { value: 'right top', label: __('Top Right', 'lightbox-block') },
    { value: 'left center', label: __('Left', 'lightbox-block') },
    { value: 'center center', label: __('Center', 'lightbox-block') },
    { value: 'right center', label: __('Right', 'lightbox-block') },
    { value: 'left bottom', label: __('Bottom Left', 'lightbox-block') },
    { value: 'center bottom', label: __('Bottom', 'lightbox-block') },
    { value: 'right bottom', label: __('Bottom Right', 'lightbox-block') },
];

// Which part of the image stays visible when it is cropped to the grid box (FooGallery-style 3x3 picker)
const CropPositionGrid = ({ value = 'center center', onChange }) => <div className='lbbCropGrid' role='radiogroup' aria-label={__('Crop Position', 'lightbox-block')}>
    {CROP_POSITIONS.map(pos => <button
        key={pos.value}
        type='button'
        role='radio'
        aria-checked={value === pos.value}
        aria-label={pos.label}
        title={pos.label}
        className={value === pos.value ? 'isActive' : ''}
        onClick={() => onChange(pos.value)}
    ><span /></button>)}
</div>;
export default CropPositionGrid;

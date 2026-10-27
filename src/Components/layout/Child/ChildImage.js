import { useState } from '@wordpress/element';
import { placeholderImg } from '../../../utils/links';
import { useResponsiveImg } from '../../../utils/responsiveImages';

const ChildImage = ({ img, thumbnail, altText }) => {
    const [isPortrait, setIsPortrait] = useState(false);

    const handleLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setIsPortrait(naturalHeight > naturalWidth);
    };
    const { src, thumb, imgProps, spinner } = useResponsiveImg(thumbnail, 'rounded', handleLoad);
    const imgSrc = src || thumbnail || placeholderImg;

    // --lbbFitBg: blurred copy that fills the empty sides when Image Fit is contain (see Common/Style.js)
    return <div className={`img ${img?.animation}${isPortrait ? ' portrait' : ''}`} style={{ '--lbbFitBg': `url(${JSON.stringify(thumb || imgSrc)})` }}>
        <img className="rounded" src={imgSrc} alt={altText} {...imgProps} />
        {spinner}
    </div>
}
export default ChildImage;

import { useState } from '@wordpress/element';
import { placeholderImg } from '../../../utils/links';
import { useResponsiveImg } from '../../../utils/responsiveImages';

const ChildImage = ({ img, thumbnail, altText }) => {
    const [isPortrait, setIsPortrait] = useState(false);

    const handleLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setIsPortrait(naturalHeight > naturalWidth);
    };
    const { src, imgProps, spinner } = useResponsiveImg(thumbnail, 'rounded', handleLoad);

    return <div className={`img ${img?.animation}${isPortrait ? ' portrait' : ''}`}>
        <img className="rounded" src={src || thumbnail || placeholderImg} alt={altText} {...imgProps} />
        {spinner}
    </div>
}
export default ChildImage;

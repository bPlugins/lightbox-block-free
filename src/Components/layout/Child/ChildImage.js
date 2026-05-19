import { useState } from '@wordpress/element';
import { placeholderImg } from '../../../utils/links';

const ChildImage = ({ img, thumbnail, altText }) => {
    const [isPortrait, setIsPortrait] = useState(false);

    const handleLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setIsPortrait(naturalHeight > naturalWidth);
    };

    return <div className={`img ${img?.animation}${isPortrait ? ' portrait' : ''}`}>
        <img className="rounded" src={thumbnail || placeholderImg} alt={altText} onLoad={handleLoad} />
    </div>
}
export default ChildImage;
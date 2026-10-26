
import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';
import Caption from '../../layout/Child/Caption';
import ChildImage from '../../layout/Child/ChildImage';
import Icon from '../../layout/Child/Icon';
import EVideo from '../../../assets/img/video.svg';
import { useThumbLookup } from '../../../utils/responsiveImages';
import { safeUrl } from '../../../utils/functions';

const CloudflarestreamNotSupport = ({ attributes, type, mixAllData, id, caption, content, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, altText }) => {
    const getThumb = useThumbLookup();
    const { content: showContent } = attributes;

    return <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-video-gallery`}`} data-caption={sanitizeHTML(caption)} className="lbbmodalbtn" href={safeUrl(content, EVideo)} data-type={`${content === '' ? '' : 'html5video'}`} data-thumb-src={thumbnail ? getThumb(thumbnail) : undefined}>
        {"button" === lightboxType ? <button className='lbbBtnDesign'><ButtonContent /></button>
            : <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
            </div>
        }
    </a>
}
export default CloudflarestreamNotSupport;

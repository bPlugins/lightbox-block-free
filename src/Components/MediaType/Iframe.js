import { checkType } from '../../utils/functions';
import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';
import Icon from '../layout/Child/Icon';
import EIframe from '../../assets/img/iframe.svg';

const Iframe = ({ attributes, type, mixAllData, id, content, EAudio, lightboxType, img, thumbnail, caption, captionPosition, galleryIcon, ButtonContent, altText }) => {
    const { content: showContent } = attributes;
    return checkType(lightboxType, type, 'iframe') && <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-iframe-gallery`}`} className="lbbmodalbtn" data-src={`${content === '' ? EIframe : content}`} data-type={`${content === '' ? '' : 'iframe'}`} data-options='{ "iframe" : { "preload" : false, "css" : { "width" : "600px" } } }' href="javascript:;">
        {"button" === lightboxType ? <button className='lbbBtnDesign'><ButtonContent /></button>
            : <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
            </div>
        }
    </a>

}
export default Iframe;
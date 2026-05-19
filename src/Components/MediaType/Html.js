import { checkType } from '../../utils/functions';

import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';
import Icon from '../layout/Child/Icon';

const Html = ({ attributes, type, mixAllData, id, content, EAudio, lightboxType, img, thumbnail, caption, captionPosition, galleryIcon, ButtonContent, altText }) => {
    const { content: showContent } = attributes;
    return checkType(lightboxType, type, 'html') && <>

        <div id={`llb-dialog-html-${id}`} style={{ display: 'none' }}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>

        <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-html-gallery`}`} className="lbbmodalbtn" data-src={`#llb-dialog-html-${id}`}>
            {"button" === lightboxType ? <button className='lbbBtnDesign'><ButtonContent /></button>
                : <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                    <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                    <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                    <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
                </div>
            }
        </a></>
}
export default Html;
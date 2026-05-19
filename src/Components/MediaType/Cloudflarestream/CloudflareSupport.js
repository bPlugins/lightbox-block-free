

import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';
import { placeholderImg } from '../../../utils/links';
import Caption from '../../layout/Child/Caption';
import ChildImage from '../../layout/Child/ChildImage';
import Icon from '../../layout/Child/Icon';


const CloudflareSupport = ({ type, attributes, id, index, content, mixAllData, caption, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, altText }) => {
    const { content: showContent } = attributes;
    return <>
        <div id={`${id}-dialog-content${index}`} className='iframeHidden'>
            <div className="feedPopUpArea">
                <div className="feedPopUp">
                    <iframe src={content} className='iframe' />
                </div>
            </div>
        </div>

        <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-video-gallery`}`} data-src={`#${id}-dialog-content${index}`} data-caption={sanitizeHTML(caption)} className="feedItem">
            {"button" === lightboxType ? <button className='lbbBtnDesign'><ButtonContent /></button>
                : <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                    <div className={`img ${img?.animation}`}>
                        <img className="rounded" src={thumbnail || placeholderImg} />
                    </div>
                    <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                    <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                    <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
                </div>
            }
        </a>
    </>
}
export default CloudflareSupport;

import { sanitizeHTML } from '../../../../bpl-tools/utils/common';
import { checkType } from '../../utils/functions';
import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';
import Icon from '../layout/Child/Icon';
import EPdf from '../../assets/img/pdf.svg';


const Pdf = ({ attributes, type, mixAllData, id, caption, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, content, altText }) => {
    const { content: showContent } = attributes;

    return checkType(lightboxType, type, 'pdf') && <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-pdf-gallery`}`} data-caption={sanitizeHTML(caption)} className="lbbmodalbtn" href={`${content === '' ? EPdf : `https://docs.google.com/gview?embedded=true&url=${content}`}`} data-type={`${content === '' ? '' : 'pdf'}`}>
        {"button" === lightboxType ? <button className='lbbBtnDesign'><ButtonContent /></button>
            : <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
            </div>
        }
    </a>

}
export default Pdf;
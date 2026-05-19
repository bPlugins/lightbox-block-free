import { sanitizeHTML } from '../../../../bpl-tools/utils/common';
import { checkType } from '../../utils/functions';
import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';

const Image = ({ attributes, type, mixAllData, id, caption, content, EImage, lightboxType, img, captionPosition, ButtonContent, altText, thumbnail }) => {

    const { content: showContent } = attributes;

    // কন্ডিশনাল href নির্ধারণ
    // type 'image' হলে thumbnail চেক করবে, না থাকলে EImage
    // অন্যথায় content চেক করবে, না থাকলে EImage
    const getHref = () => {
        if (type === 'image') {
            return (content && content !== '') ? content : (thumbnail && thumbnail !== '') ? thumbnail : EImage;
        } else {
            return (content && content !== '') ? content : EImage;
        }
    };

    return checkType(lightboxType, type, 'image') && (
        <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-gallery`}`} data-caption={sanitizeHTML(caption || '')} className="lbbmodalbtn fancybox" href={getHref()}>
            {"button" === lightboxType ? (
                <button className='lbbBtnDesign'><ButtonContent /></button>
            ) : (
                <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                    <ChildImage altText={altText} img={img} thumbnail={content} contentNullThumbs={thumbnail} />
                    <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                </div>
            )}
        </a>
    );
};

export default Image;
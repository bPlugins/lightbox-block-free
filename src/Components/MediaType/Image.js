import { sanitizeHTML } from '../../../../bpl-tools/utils/common';
import { checkType, safeUrl } from '../../utils/functions';
import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';
import { useFullLookup } from '../../utils/responsiveImages';
import { useThumbLookup } from '../../utils/responsiveImages';

const Image = ({ attributes, type, mixAllData, id, caption, content, EImage, lightboxType, img, captionPosition, ButtonContent, altText, thumbnail }) => {

    const { content: showContent } = attributes;
    const getFull = useFullLookup();
    // Lightbox thumbnail strip: small thumb even before the grid image has loaded
    const getThumb = useThumbLookup();
    // Download gives the original only when the lightbox shows its WebP copy (that URL was matched to a real attachment)
    const fullSrc = ('image' === type && content) ? getFull(content) : '';
    const downloadSrc = (fullSrc && fullSrc !== content && /^https?:\/\//i.test(content)) ? content : undefined;

    // কন্ডিশনাল href নির্ধারণ
    // type 'image' হলে thumbnail চেক করবে, না থাকলে EImage
    // অন্যথায় content চেক করবে, না থাকলে EImage
    const getHref = () => {
        if (type === 'image') {
            return (content && content !== '') ? getFull(content) : (thumbnail && thumbnail !== '') ? thumbnail : EImage;
        } else {
            return (content && content !== '') ? content : EImage;
        }
    };

    return checkType(lightboxType, type, 'image') && (
        <a data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-gallery`}`} data-caption={sanitizeHTML(caption || '')} className="lbbmodalbtn fancybox" href={safeUrl(getHref(), EImage)} data-download-src={downloadSrc} data-thumb-src={'image' === type && content ? getThumb(content) : undefined}>
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
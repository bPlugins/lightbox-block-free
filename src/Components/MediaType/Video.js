import { checkType } from '../../utils/functions';
import CloudflareSupport from './Cloudflarestream/CloudflareSupport';
import CloudflarestreamNotSupport from './Cloudflarestream/CloudflarestreamNotSupport';


const Video = ({ attributes, type, content, mixAllData, id, caption, EVideo, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, index, altText }) => {

    const cloudProps = { type, mixAllData, id, caption, content, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, attributes, altText }

    return <>
        {
            ((checkType(lightboxType, type, 'video') || checkType(lightboxType, type, 'youtube')) && content.split('.')[1] !== 'cloudflarestream') ? <CloudflarestreamNotSupport {...cloudProps} EVideo={EVideo} /> :
                ((checkType(lightboxType, type, 'video') || checkType(lightboxType, type, 'youtube')) && content.split('.')[1] === 'cloudflarestream') && <CloudflareSupport {...cloudProps} index={index} />
        }
    </>
}
export default Video;
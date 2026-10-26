import { checkType, isCloudflareStream } from '../../utils/functions';
import CloudflareSupport from './Cloudflarestream/CloudflareSupport';
import CloudflarestreamNotSupport from './Cloudflarestream/CloudflarestreamNotSupport';


const Video = ({ attributes, type, content, mixAllData, id, caption, EVideo, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, index, altText }) => {

    const cloudProps = { type, mixAllData, id, caption, content, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, attributes, altText }

    const isVideo = checkType(lightboxType, type, 'video') || checkType(lightboxType, type, 'youtube');

    return <>
        {
            isVideo && (isCloudflareStream(content) ? <CloudflareSupport {...cloudProps} index={index} /> : <CloudflarestreamNotSupport {...cloudProps} EVideo={EVideo} />)
        }
    </>
}
export default Video;
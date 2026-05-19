import { checkType } from '../../../utils/functions';
import { audio, html, iframe, newspaper, pdf, video, youtube } from '../../../utils/icons';


const Icon = ({ galleryIcon, type, lightboxType }) => {
    let iconClass = "";
    let iconName = "";

    let effectiveType = "";
    if (checkType(lightboxType, type, "audio")) effectiveType = "audio";
    else if (checkType(lightboxType, type, "video")) effectiveType = "video";
    else if (checkType(lightboxType, type, "youtube")) effectiveType = "youtube";
    else if (checkType(lightboxType, type, "content")) effectiveType = "content";
    else if (checkType(lightboxType, type, "pdf")) effectiveType = "pdf";
    else if (checkType(lightboxType, type, "html")) effectiveType = "html";
    else effectiveType = "default";

    switch (effectiveType) {
        case "audio":
            iconClass = "music_icon audio_icon";
            iconName = audio;
            break;
        case "video":
            iconClass = "music_icon video_icon";
            iconName = video;
            break;
        case "youtube":
            iconClass = "music_icon youtube_icon";
            iconName = youtube;
            break;
        case "content":
            iconClass = "contnet-svgImage";
            iconName = newspaper;
            break;
        case "pdf":
            iconClass = "music_icon pdf_icon";
            iconName = pdf;
            break;
        case "html":
            iconClass = "music_icon html_icon";
            iconName = html;
            break;
        default:
            iconClass = "music_icon iframe_icon";
            iconName = iframe;
    }

    return galleryIcon && <div className={iconClass}>{iconName}</div>;
};


export default Icon;

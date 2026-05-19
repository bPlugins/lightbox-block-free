import { audioIcon, buttonIcon, contentIcon, htmlIcon, iframeIcon, imageIcon, pdfIcon, videoIcon, youtubeIcon } from './icons';

export const lightbox_type = [
    {
        icon: imageIcon(40),
        title: "Image Gallery",
        desc: "Browse through image gallery",
        class: "image",
        type: "gallery",
        status: false
    },
    {
        icon: buttonIcon(40),
        title: "Button",
        desc: "Single content",
        class: "btn-box",
        type: "button",
        status: false
    },
    {
        icon: audioIcon(40),
        title: "Audio Player",
        desc: "Play audio files with controls",
        class: "audio",
        type: "audio",
        status: true
    },
    {
        icon: videoIcon(40),
        title: "Video Player",
        desc: "Open videos files with controls",
        class: "video",
        type: "video",
        status: true
    },
    {
        icon: contentIcon(40),
        title: "Content",
        desc: "Add content with controls",
        class: "content",
        type: "content",
        status: true
    }
]

export const pro_lightbox_types = [
    {
        icon: pdfIcon(40),
        title: "PDF Viewer",
        desc: "View PDF documents inline",
        class: "pdf",
        type: "pdf"
    },
    {
        icon: youtubeIcon(40),
        title: "YouTube",
        desc: "Watch youtube videos",
        class: "youtube",
        type: "youtube"
    },
    {
        icon: iframeIcon(40),
        title: "Iframe",
        desc: "Open website in iframe",
        class: "website",
        type: "iframe"
    },
    {
        icon: htmlIcon(40),
        title: "HTML Code",
        desc: "Render custom HTML content",
        class: "html",
        type: "html"
    }
]
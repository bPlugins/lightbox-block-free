import { __ } from '@wordpress/i18n';
import { audio, audioIcon, buttonIcon, contentIcon, html, htmlIcon, iframe, iframeIcon, image, imageIcon, newspaper, pdf, pdfIcon, video, videoIcon, youtube, youtubeIcon } from './icons';

export const audioPlayerOpt = [
	{ label: __('Default', 'lightbox-block'), value: 'default' },
]


export const sliderOpt = [
	{ label: __('Classic', 'lightbox-block'), value: 'classic' },
	{ label: __('Modern', 'lightbox-block'), value: 'modern' },
]

export const ratioOpt = [
	{ label: __('16:9 - Landscape', 'lightbox-block'), value: '16:9' },
	{ label: __('4:3 - Horizontal', 'lightbox-block'), value: '4:3' },
	{ label: __('1:1 - Square', 'lightbox-block'), value: '1:1' },
	{ label: __('3:4 - Vertical', 'lightbox-block'), value: '3:4' },
	{ label: __('9:16 - Potrait', 'lightbox-block'), value: '9:16' },
]

export const captionPOpt = [
	{ label: __('Overly Center', 'lightbox-block'), value: 'overlyCenter' },
	{ label: __('Overly Top', 'lightbox-block'), value: 'overlyTop' },
	{ label: __('Overly Bottom', 'lightbox-block'), value: 'overlyBottom' },
]

export const imageAnimation = [
	{ label: __('Default', 'lightbox-block'), value: 'default' },
	{ label: __('Zoom In', 'lightbox-block'), value: 'zoomIn' },
	{ label: __('Zoom Out', 'lightbox-block'), value: 'zoomOut' },
	{ label: __('Rotate In', 'lightbox-block'), value: 'rotateIn' },
	{ label: __('Rotate Out', 'lightbox-block'), value: 'rotateOut' },
	{ label: __('Shine', 'lightbox-block'), value: 'shine' },
]

export const transitionOpt = [
	{ label: __('Default', 'lightbox-block'), value: 'fade' },
	{ label: __('Slide', 'lightbox-block'), value: 'slide' },
	{ label: __('CrossFade', 'lightbox-block'), value: 'crossfade' },
	{ label: __('Classic', 'lightbox-block'), value: 'classic' }
]

export const wheelOpt = [
	{ label: __('Zoom', 'lightbox-block'), value: 'zoom' },
	{ label: __('Slide', 'lightbox-block'), value: 'slide' },
]

export const thumbTypeOpt = [
	{ label: __('Classic', 'lightbox-block'), value: 'classic' },
	{ label: __('Modern', 'lightbox-block'), value: 'modern' },
]

export const layoutOpt = [
	{ label: __('Default', 'lightbox-block'), value: 'default' },
	{ label: __('Masonry', 'lightbox-block'), value: 'masonry' }
]

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'lightbox-block') },
	{ name: 'popup', title: __('Popup', 'lightbox-block') },
	{ name: 'style', title: __('Style', 'lightbox-block') },
]

export const lbType = [
	{ label: __('Button', 'lightbox-block'), value: 'button', icon: buttonIcon(17) },
	{ label: __('Gallery', 'lightbox-block'), value: 'gallery', icon: image },
	{ label: __('Audio Player', 'lightbox-block'), value: 'audio', icon: audio },
	{ label: __('Video Player', 'lightbox-block'), value: 'video', icon: video },
	{ label: __('Content', 'lightbox-block'), value: 'content', icon: newspaper }
]

export const contentType = [
	{ label: __('Image', 'lightbox-block'), value: 'image' },
	{ label: __('Audio', 'lightbox-block'), value: 'audio' },
	{ label: __('Video', 'lightbox-block'), value: 'video' },
	{ label: __('Content', 'lightbox-block'), value: 'content' },
]

export const btnTypeOpt = [
	{ label: __('Default', 'lightbox-block'), value: 'default' },
	{ label: __('Circle', 'lightbox-block'), value: 'circle' },
	{ label: __('Full Width', 'lightbox-block'), value: 'fullWidth' },
	{ label: __('Pill', 'lightbox-block'), value: 'pill' },
]

export const pxUnit = (def = 0) => ({ value: 'px', label: 'px', default: def });
export const perUnit = (def = 0) => ({ value: '%', label: '%', default: def });
export const emUnit = (def = 0) => ({ value: 'em', label: 'em', default: def });
export const remUnit = (def = 0) => ({ value: 'rem', label: 'rem', default: def });
export const vwUnit = (def = 0) => ({ value: 'vw', label: 'vw', default: def });
export const vhUnit = (def = 0) => ({ value: 'vh', label: 'vh', default: def });

export const aligns = [
	{ label: __('Left', 'lightbox-block'), value: 'left', class: 'false', icon: 'editor-alignleft' },
	{ label: __('Center', 'lightbox-block'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('Right', 'lightbox-block'), value: 'right', icon: 'editor-alignright' }
]

export const btnSopt = [
	{ label: __('Fill', 'lightbox-block'), value: 'fill' },
	{ label: __('Outline', 'lightbox-block'), value: 'outline' }
]
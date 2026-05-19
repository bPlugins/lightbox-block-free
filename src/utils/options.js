import { __ } from '@wordpress/i18n';
import { audio, audioIcon, buttonIcon, contentIcon, html, htmlIcon, iframe, iframeIcon, image, imageIcon, newspaper, pdf, pdfIcon, video, videoIcon, youtube, youtubeIcon } from './icons';

export const audioPlayerOpt = [
	{ label: __('Default', 'lightbox'), value: 'default' },
]


export const sliderOpt = [
	{ label: __('Classic', 'lightbox'), value: 'classic' },
	{ label: __('Modern', 'lightbox'), value: 'modern' },
]

export const ratioOpt = [
	{ label: __('16:9 - Landscape', 'bp-g-photos'), value: '16:9' },
	{ label: __('4:3 - Horizontal', 'bp-g-photos'), value: '4:3' },
	{ label: __('1:1 - Square', 'bp-g-photos'), value: '1:1' },
	{ label: __('3:4 - Vertical', 'bp-g-photos'), value: '3:4' },
	{ label: __('9:16 - Potrait', 'bp-g-photos'), value: '9:16' },
]

export const captionPOpt = [
	{ label: __('Overly Center', 'lightbox'), value: 'overlyCenter' },
	{ label: __('Overly Top', 'lightbox'), value: 'overlyTop' },
	{ label: __('Overly Bottom', 'lightbox'), value: 'overlyBottom' },
]

export const imageAnimation = [
	{ label: __('Default', 'lightbox'), value: 'default' },
	{ label: __('Zoom In', 'lightbox'), value: 'zoomIn' },
	{ label: __('Zoom Out', 'lightbox'), value: 'zoomOut' },
	{ label: __('Rotate In', 'lightbox'), value: 'rotateIn' },
	{ label: __('Rotate Out', 'lightbox'), value: 'rotateOut' },
	{ label: __('Shine', 'lightbox'), value: 'shine' },
]

export const transitionOpt = [
	{ label: __('Default', 'lightbox'), value: 'fade' },
	{ label: __('Slide', 'lightbox'), value: 'slide' },
	{ label: __('CrossFade', 'lightbox'), value: 'crossfade' },
	{ label: __('Classic', 'lightbox'), value: 'classic' }
]

export const wheelOpt = [
	{ label: __('Zoom', 'lightbox'), value: 'zoom' },
	{ label: __('Slide', 'lightbox'), value: 'slide' },
]

export const thumbTypeOpt = [
	{ label: __('Classic', 'lightbox'), value: 'classic' },
	{ label: __('Modern', 'lightbox'), value: 'modern' },
]

export const layoutOpt = [
	{ label: __('Default', 'lightbox'), value: 'default' },
	{ label: __('Masonry', 'lightbox'), value: 'masonry' }
]

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'lightbox') },
	{ name: 'popup', title: __('Popup', 'lightbox') },
	{ name: 'style', title: __('Style', 'lightbox') },
]

export const lbType = [
	{ label: __('Button', 'lightbox'), value: 'button', icon: buttonIcon(17) },
	{ label: __('Gallery', 'lightbox'), value: 'gallery', icon: image },
	{ label: __('Audio Player', 'lightbox'), value: 'audio', icon: audio },
	{ label: __('Video Player', 'lightbox'), value: 'video', icon: video },
	{ label: __('Content', 'lightbox'), value: 'content', icon: newspaper }
]

export const contentType = [
	{ label: __('Image', 'lightbox'), value: 'image' },
	{ label: __('Audio', 'lightbox'), value: 'audio' },
	{ label: __('Video', 'lightbox'), value: 'video' },
	{ label: __('Content', 'lightbox'), value: 'content' },
	{ label: __('Pdf', 'lightbox'), value: 'pdf' },
	{ label: __('Iframe', 'lightbox'), value: 'iframe' },
	{ label: __('HTML', 'lightbox'), value: 'html' },
	{ label: __('YouTube', 'lightbox'), value: 'youtube' },
]

export const btnTypeOpt = [
	{ label: __('Default', 'lightbox'), value: 'default' },
	{ label: __('Circle', 'lightbox'), value: 'circle' },
	{ label: __('Full Width', 'lightbox'), value: 'fullWidth' },
	{ label: __('Pill', 'lightbox'), value: 'pill' },
]

export const pxUnit = (def = 0) => ({ value: 'px', label: 'px', default: def });
export const perUnit = (def = 0) => ({ value: '%', label: '%', default: def });
export const emUnit = (def = 0) => ({ value: 'em', label: 'em', default: def });
export const remUnit = (def = 0) => ({ value: 'rem', label: 'rem', default: def });
export const vwUnit = (def = 0) => ({ value: 'vw', label: 'vw', default: def });
export const vhUnit = (def = 0) => ({ value: 'vh', label: 'vh', default: def });

export const aligns = [
	{ label: __('Left', 'lightbox'), value: 'left', class: 'false', icon: 'editor-alignleft' },
	{ label: __('Center', 'lightbox'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('Right', 'lightbox'), value: 'right', icon: 'editor-alignright' }
]

export const btnSopt = [
	{ label: __('Fill', 'lightbox'), value: 'fill' },
	{ label: __('Outline', 'lightbox'), value: 'outline' }
]
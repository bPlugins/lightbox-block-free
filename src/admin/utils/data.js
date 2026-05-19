import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';

const slug = 'lightbox-block';

export const dashboardInfo = (info) => {
    const { version, hasPro, licenseActiveNonce } = info;


    return {
        name: `Lightbox block`,
        displayName: `Lightbox Block - All In One Lightbox – Display Images, Audio, and Video in Popups`,
        description: 'Lightbox Block lets you display images, audio, video, and custom content in responsive lightbox galleries or media popups.',
        slug,
        version,
        hasPro,
        displayOurPlugins: true,
        media: {
            logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
            banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
            thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
            // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
            video: 'https://www.youtube.com/watch?v=wgwfteRLQcc',
            isYoutube: true
        },
        pages: {
            org: `https://wordpress.org/plugins/${slug}/`,
            // landing: `https://bplugins.com/products/${slug}/`,
            docs: `https://bplugins.com/docs/${slug}/`,
            pricing: `https://bplugins.com/products/${slug}/pricing`,
        },
        freemius: {
            product_id: 13492,
            plan_id: 22600,
            public_key: 'pk_8346b668170b2e4c33255d896d15c'
        },
        licenseActiveNonce,
        changelogs: [
            {
                version: '1.1.42 - 9 April, 2026',
                type: 'new',
                list: [
                    'Added a new aspect ratio feature for the slider layout.',
                ]
            },
            {
                version: '1.1.41 - 6 April, 2026',
                type: 'new',
                list: [
                    'Added a new modern dashboard',
                ]
            },
            {
                version: '1.1.40 - 18 March, 2026',
                type: 'update',
                list: [
                    'The slider DOM element wasn’t working properly. It’s now fixed.',
                ]
            },
            {
                version: '1.1.39 - 7 Feb, 2026',
                type: 'new',
                list: [
                    'The free plugin now supports shortcodes.',
                ]
            },
            {
                version: '2.0.8 - 22 Jan, 2026',
                type: 'update',
                list: [
                    'There were some minor issues with the title and the query, but I have resolved them.',
                ]
            },
            {
                version: '1.1.37 - 25 Jan, 2026',
                type: 'new',
                list: [
                    'You need to change the gallery type and control the show or hide options;',
                ]
            },
            {
                version: '1.1.36 - 14 Dec, 2025',
                type: 'new',
                list: [
                    'Global custom LightBox has been added;',
                ]
            },
            {
                version: '1.1.35 - 12 Nov, 2025',
                type: 'update',
                list: [
                    'We have fixed the issue where using two sliders on the same page caused conflicts. A new feature has also been added to change the arrow color;',
                ]
            },
            {
                version: '1.1.34 - 9 Nov, 2025',
                type: 'update',
                list: [
                    'freemius sdk update and new feature added;',
                ]
            },
            {
                version: '1.1.33 - 26 Oct, 2025',
                type: 'update',
                list: [
                    'Fixed issues with slider layout thumbnails and popup image width;',
                ]
            }

        ],
        proFeatures: [
            'Extended Media Types – Go beyond basic content by embedding PDFs, iframes, YouTube videos, and custom HTML alongside images, audio, and video.',
            'Custom Overlay & Captions – Change caption style and overlay colors to match your site’s branding.',
            'Autoplay Slideshows – Automatically start popup slideshows for a smooth presentation.',
            'Mouse-Wheel Navigation – Let users scroll with their mouse wheel to zoom or move between slides.',
            'Advanced Slide Effects – Enhance transitions with Slide, CrossFade, Classic, or Default effects.',
            'Topbar Controls – Show slide counts and allow zooming, rotating (clockwise/counter-clockwise), flipping, and fullscreen toggle directly in the popup topbar.',
            'Toolbar Actions – Add sharing (Facebook, Twitter), downloads, slideshow controls, thumbnails, and close buttons inside the popup.',
            'Thumbnail Previews – Display gallery thumbnails in Classic or Modern styles for easy navigation.',
            'Advanced Media Player Controls – Full audio/video control panel including play/pause, restart, rewind, fast-forward, progress bar, duration, mute, volume, PiP, Airplay, settings, download, and fullscreen.',
            'Multiple Audio Players – Choose from four different audio player designs to suit your style.',
            'Hover Effects – Add engaging hover animations such as Zoom, Rotate, or Shine for gallery items.',
            'Gallery Styling Options – Customize border radius and choose from five aspect ratios (Landscape, Square, Horizontal, Vertical, Portrait).',
            'Color & Size Controls – Personalize the modal background, close icon colors, and adjust modal/icon sizes per device.',
            'Slider Layout – Use a slider format for galleries instead of grid or masonry when needed.',
        ],
        startButton: {
            label: 'Start Now',
            url: `wp-admin/post-new.php?post_type=lbb`
        }
    }
}

export const demoInfo = {
    allInOneLabel: 'See All Demos',
    allInOneLink: 'https://bplugins.com/products/lightbox-block/#demos',
    demos: [
        {
            icon: '',
            title: 'Grid + Lightbox',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-grid-lightbox/'
        },
        {
            icon: '',
            title: 'Modern Lightbox',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-modern-lightbox/'
        },
        {
            icon: '',
            title: 'Album',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-album/'
        },
        {
            icon: '',
            title: 'YouTube Video Album',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-youtube-video-album/'
        },
        {
            icon: '',
            title: 'Vimeo Video Album',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-vimeo-video-album/'
        },
        {
            icon: '',
            title: 'Masonry',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-masonry/'
        },
        {
            icon: '',
            title: 'PDF',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-pdf/'
        },
        {
            icon: '',
            title: 'Iframe',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-iframe/'
        },
        {
            icon: '',
            title: 'Slider Layout',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-slider-layout/'
        },
        {
            icon: '',
            title: 'Video Gallery',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-video-gallery/'
        },
        {
            icon: '',
            title: 'HTML Table',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/lightbox-block-html-table'
        },

    ]
}

export const pricingInfo = {
    logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`, // Optional
    pluginId: 13492,
    planId: 22600,
    licenses: [
        1,
        3,
        null
    ],
    button: {
        label: 'Buy Now ➜'
    },
    featured: {
        selected: 3, // choose from licenses item
    }
}
import { adminUrl } from '../../utils/functions';
import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';
import { elementorTabIcon, gutenbergTabIcon, phpTabIcon, shortcodeTabIcon } from './icons';

const slug = 'lightbox-block';

export const dashboardInfo = (info) => {
    const { version, isPremium, hasPro, adminUrl, licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;


    const proSuffix = isPremium ? ' Pro' : '';

    return {
        name: `Lightbox Block${proSuffix}`,
        displayName: `Lightbox Block${proSuffix} - All In One Lightbox – Display Images, Audio, and Video in Popups`,
        description: 'Lightbox Block lets you display images, audio, video, and custom content in responsive lightbox galleries or media popups.',
        slug,
        version,
        isPremium,
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
        adminUrl,
        licenseActiveNonce,
        deleteDataOnUninstall,
        uninstallNonce,
        startButton: {          // ← new — drives the primary CTA button in the hero card
            label: 'Start Now',
            url: `${adminUrl}post-new.php?post_type=lbb`
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

export const welcomeInfo = (adminUrl) => ({
    keywords: ['Image', 'Audio', 'Video', 'Content', 'Iframe', 'PDF', 'HTML', 'Vimeo'],
    keywordsLabel: 'Select Media Type',
    gettingStarted: {
        tabs: [
            {
                key: 'gutenberg',
                label: 'Gutenberg',
                icon: gutenbergTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Add the Lightbox Block',
                        body: 'Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>Lightbox</strong> to find and insert the Lightbox block.',
                        link: { url: `${adminUrl}post-new.php`, label: 'Open Editor' }
                    },
                    {
                        num: 2,
                        title: 'Extended Media Types',
                        body: 'Go beyond basic content by embedding <strong>PDF</strong>, <strong>Iframe</strong>, <strong>YouTube</strong>, <strong>Vimeo</strong>, <strong>HTML</strong>, and <strong>Custom HTML</strong> alongside images, audio, and video.'
                    },
                    {
                        num: 3,
                        title: 'Advanced Slide Effects',
                        body: 'Enhance transitions with <strong>Slide</strong>, <strong>CrossFade</strong>, <strong>Classic</strong>, or <strong>Default</strong> effects.'
                    },
                    {
                        num: 4,
                        title: 'Multiple Audio Players',
                        body: 'Choose from four different audio player designs to suit your style.'
                    },
                    {
                        num: 5,
                        title: 'Advanced Media Player Controls',
                        body: 'Full audio/video control panel including <strong>play/pause</strong>, <strong>restart</strong>, <strong>rewind</strong>, <strong>fast-forward</strong>, <strong>progress bar</strong>, <strong>duration</strong>, <strong>mute</strong>, <strong>volume</strong>, <strong>PiP</strong>, <strong>Airplay</strong>, <strong>settings</strong>, <strong>download</strong>, and <strong>fullscreen</strong>.'
                    },
                    {
                        num: 6,
                        title: 'Gallery Styling Options',
                        body: 'Customize border radius and choose from five aspect ratios (<strong>Landscape</strong>, <strong>Square</strong>, <strong>Horizontal</strong>, <strong>Vertical</strong>, <strong>Portrait</strong>).'
                    }
                ]
            },
            {
                key: 'shortcode',
                label: 'ShortCode',
                icon: shortcodeTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Open ShortCode Generator',
                        body: 'Go to <strong>Lightbox &rsaquo; ShortCode Generator</strong> in your WordPress admin and click <strong>Add New ShortCode</strong>.',
                        link: { url: `${adminUrl}edit.php?post_type=lbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Select Media Type',
                        body: 'Choose your preferred media type below (image, audio, video, text, HTML, iframe, YouTube, PDF, Vimeo) to configure your block.'
                    },
                    {
                        num: 3,
                        title: 'Publish & Copy the Shortcode',
                        body: 'Publish the post. Return to the ShortCode Generator list — the shortcode <code>[lbb-lightbox-block id=POST_ID]</code> is shown in the list table. Click it to copy to clipboard.'
                    },
                    {
                        num: 4,
                        title: 'Paste Anywhere',
                        body: 'Paste the copied shortcode (e.g. <code>[lbb-lightbox-block id=3128]</code>) into any post, page, widget area, or block using the <strong>Shortcode</strong> block.'
                    }
                ]
            },
            {
                key: 'elementor',
                label: 'Elementor',
                icon: elementorTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a ShortCode',
                        body: 'Go to <strong>Lightbox Block &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the shortcode from the list table.',
                        link: { url: `${adminUrl}edit.php?post_type=lbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Add a Shortcode Widget',
                        body: 'Open the Elementor editor on any page. Search for the <strong>Shortcode</strong> widget and drag it to your desired location on the canvas.'
                    },
                    {
                        num: 3,
                        title: 'Enter & Preview',
                        body: 'Type <code>[lbb-lightbox-block id=3128]</code> into the widget\'s Shortcode field (replace <em>YOUR_ID</em> with your actual post ID) and click <strong>Preview</strong> to see the posts rendered live.'
                    }
                ]
            },
            {
                key: 'php',
                label: 'Theme / PHP',
                icon: phpTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a ShortCode',
                        body: 'Go to <strong>LightBox Block &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the post ID shown in the list table.',
                        link: { url: `${adminUrl}edit.php?post_type=lbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Open Your Template',
                        body: 'Open the theme template file where you want to display the posts block — for example <code>single.php</code>, <code>page.php</code>, or a custom template part.'
                    },
                    {
                        num: 3,
                        title: 'Render via do_shortcode',
                        body: 'Add <code>&lt;?php echo do_shortcode(\'[lbb-lightbox-block id=YOUR_ID]\'); ?&gt;</code> in your template (replace <em>YOUR_ID</em> with your actual post ID) to render the block on the front end.'
                    }
                ]
            }
        ]
    },
    changelogs: [
        {
            version: '1.1.43 - 23 June, 2026',
            type: 'new',
            list: [
                '<strong>Update</strong> Added a new, modern dashboard.'
            ]
        },
        {
            version: '1.1.42 - 9 April, 2026',
            type: 'new',
            list: [
                '<strong>New:</strong>Added a new aspect ratio feature for the slider layout.',
            ]
        },
        {
            version: '1.1.41 - 6 April, 2026',
            type: 'new',
            list: [
                '<strong>New:</strong>Added a new modern dashboard',
            ]
        },
        {
            version: '1.1.40 - 18 March, 2026',
            type: 'update',
            list: [
                '<strong>Update:</strong>The slider DOM element wasn’t working properly. It’s now fixed.',
            ]
        },
        {
            version: '1.1.39 - 7 Feb, 2026',
            type: 'new',
            list: [
                '<strong>New:</strong>The free plugin now supports shortcodes.',
            ]
        },
        {
            version: '2.0.8 - 22 Jan, 2026',
            type: 'update',
            list: [
                '<strong>Update:</strong>There were some minor issues with the title and the query, but I have resolved them.',
            ]
        },
        {
            version: '1.1.37 - 25 Jan, 2026',
            type: 'new',
            list: [
                '<strong>New:</strong>You need to change the gallery type and control the show or hide options;',
            ]
        },
        {
            version: '1.1.36 - 14 Dec, 2025',
            type: 'new',
            list: [
                '<strong>New:</strong>Global custom LightBox has been added;',
            ]
        },
        {
            version: '1.1.35 - 12 Nov, 2025',
            type: 'update',
            list: [
                '<strong>Update:</strong>We have fixed the issue where using two sliders on the same page caused conflicts. A new feature has also been added to change the arrow color;',
            ]
        },
        {
            version: '1.1.34 - 9 Nov, 2025',
            type: 'update',
            list: [
                '<strong>Update:</strong>freemius sdk update and new feature added;',
            ]
        },
        {
            version: '1.1.33 - 26 Oct, 2025',
            type: 'update',
            list: [
                '<strong>Update:</strong>Fixed issues with slider layout thumbnails and popup image width;',
            ]
        }

    ],
    changelogsLimit: 6,
    changelogsReadMoreLabel: 'View More Changelogs',
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
})




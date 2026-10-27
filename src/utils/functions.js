import { sanitizeURL } from '../../../bpl-tools/utils/common';

export const adminUrl = (isFreemiusFile) => {

  // const premiumPath = isFreemiusFile ? '/wp-admin/admin.php?page=lightbox-block-dashboard#/pricing' : '/wp-admin/tools.php?page=lightbox-block-dashboard#/pricing';

  const premiumPath = '/wp-admin/edit.php?post_type=lbb&page=lightbox-block#/pricing';

  return window.location.origin + premiumPath;
}

export const checkType = (lightboxType, type, t) => {

  if (lightboxType === t) {
    return true;
  }
  return (['button', 'gallery'].includes(lightboxType)) && t === type
}

export const ratioCheck = (val = "9:16") => {
  const [width, height] = val.split(':');
  const result = (parseInt(height) / parseInt(width)) * 100;
  return result;
}

// Grid image fit: cover | containPortrait | contain (older Pro blocks only have the fitPortrait toggle)
export const getImageFit = (image) => image?.fit || (image?.fitPortrait ? 'containPortrait' : 'cover');

// Lightbox caption HTML: tags of bpl-tools sanitizeHTML, http/https links only (mailto: and tel: are Pro).
// No style/class: a caption link could be stretched invisibly over the whole lightbox (clickjacking)
const captionTags = ['b', 'strong', 'i', 'em', 'span', 'a', 'br'];
const captionAttrs = ['href', 'target', 'rel'];

export const sanitizeCaption = (input) => {
  const doc = new DOMParser().parseFromString(input || '', 'text/html');

  doc.body.querySelectorAll('*').forEach(node => {
    if (!captionTags.includes(node.tagName.toLowerCase())) {
      node.remove();
      return;
    }

    [...node.attributes].forEach(({ name, value }) => {
      if (!captionAttrs.includes(name)) {
        node.removeAttribute(name);
      } else if ('href' === name) {
        const href = sanitizeURL(value);
        href ? node.setAttribute('href', href) : node.removeAttribute('href');
      }
    });
  });

  return doc.body.innerHTML;
}

// Gallery caption: formatting tags only, no attributes; links become plain text (the item itself is a link)
const gridCaptionTags = ['b', 'strong', 'i', 'em', 'span', 'br'];

export const sanitizeGridCaption = (input) => {
  const doc = new DOMParser().parseFromString(input || '', 'text/html');

  doc.body.querySelectorAll('*').forEach(node => {
    const tag = node.tagName.toLowerCase();
    if ('a' === tag) {
      node.replaceWith(...node.childNodes);
    } else if (!gridCaptionTags.includes(tag)) {
      node.remove();
    } else {
      [...node.attributes].forEach(({ name }) => node.removeAttribute(name));
    }
  });

  return doc.body.innerHTML;
}

export const getNumber = (val) => {
  const colGap = val;
  const columnGap = colGap.match(/\d/g);
  const gutterX = parseInt(columnGap.join(""));
  return gutterX;
}

export const getBoxValue = object => Object.values(object).join(" ");


export function loadFrameIfNotLoaded(iframe) {

  if (iframe && iframe.contentDocument !== null) {
    const source = iframe.src;
    iframe.src = source;
    setTimeout(() => {
      loadFrameIfNotLoaded(iframe);
    }, 1200);
  }
}


export const manageVideo = (player) => {
  //orientation
  if (window?.innerWidth < 992) {
    player.on("enterfullscreen", () => {
      screen?.orientation?.lock("landscape");
    });

    player.on("exitfullscreen", () => {
      screen?.orientation?.lock("portrait");
    });
  }

  player.elements?.container?.classList.add('fancybox__content');
}

export const checkUrlImage = (url) => {
  if (typeof url !== 'string') return false;

  // Check if URL ends with common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
  const lowerUrl = url.toLowerCase();

  // Check for image file extension
  const hasImageExtension = imageExtensions.some(ext => lowerUrl.endsWith(ext));

  // Optional: Check if URL contains image MIME type (for data URLs)
  const isDataImage = lowerUrl.startsWith('data:image/');

  return hasImageExtension || isDataImage;
}

export const isAudioVideoOrYouTube = (content) => {
  if (typeof content !== 'string') return false;

  const lowerContent = content.toLowerCase();

  // Common audio and video extensions
  const mediaExtensions = [
    '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', // audio
    '.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv', '.flv' // video
  ];

  // Check if it ends with any known audio/video extension
  const hasMediaExtension = mediaExtensions.some(ext => lowerContent.endsWith(ext));

  // Check for base64 or data URL formats for audio/video
  const isDataMedia =
    lowerContent.startsWith('data:audio/') ||
    lowerContent.startsWith('data:video/');

  // Check if it's a YouTube URL (regular or short)
  const isYouTube =
    lowerContent.includes('youtube.com/watch') ||
    lowerContent.includes('youtu.be/');

  return hasMediaExtension || isDataMedia || isYouTube;
}

export const isPdf = (content) => {
  if (typeof content !== 'string') return false;

  const lowerContent = content.toLowerCase();

  // Check if it ends with .pdf extension
  const hasPdfExtension = lowerContent.endsWith('.pdf');

  // Check if it’s a Base64 data URL for PDF
  const isDataPdf = lowerContent.startsWith('data:application/pdf');

  return hasPdfExtension || isDataPdf;
}

export const isWebsite = (content) => {
  if (typeof content !== 'string') return false;

  try {
    const url = new URL(content);
    // Check if the protocol is http or https
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    // If it throws, it's not a valid URL
    return false;
  }
}

export const isHtml = (content) => {
  if (typeof content !== 'string') return false;

  const trimmed = content.trim();

  // Quick check: HTML usually starts and ends with angle brackets
  const looksLikeHtml = /^<([a-z]+)([^>]*?)>([\s\S]*?)<\/\1>$/.test(trimmed);

  // Alternatively, check for common HTML tags
  const commonHtmlTags = [
    '<html', '<div', '<span', '<p', '<a', '<body', '<head',
    '<title', '<h1', '<h2', '<h3', '<img', '<ul', '<li', '<script', '<style'
  ];

  const containsHtmlTag = commonHtmlTags.some(tag => trimmed.toLowerCase().includes(tag));

  return looksLikeHtml || containsHtmlTag;
}

/**
 * Sanitize a value before interpolating it into a CSS string rendered
 * via dangerouslySetInnerHTML.
 *
 * Prevents stored-XSS vectors such as:
 *   }</style><script>alert(1)</script><style>
 *
 * Strips: < > { } ` " and common HTML entity escapes for those chars.
 * Numbers are returned as-is for performance.
 * Nullish values become an empty string.
 */
export const sanitizeCSSValue = (value) => {
  if (value == null) return '';
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return String(value);
  // Remove characters that can break out of a CSS value / <style> context
  return value.replace(/[<>{}`"\\]/g, '');
}

// Only https://*.cloudflarestream.com URLs may be loaded into the Cloudflare Stream iframe
export const isCloudflareStream = (url) => {
  try {
    const { protocol, hostname } = new URL(url);
    return 'https:' === protocol && ('cloudflarestream.com' === hostname || hostname.endsWith('.cloudflarestream.com'));
  } catch {
    return false;
  }
}

// http(s) or relative URL, otherwise the fallback (blocks javascript:, data: etc. in href)
export const safeUrl = (url, fallback = '') => sanitizeURL(url) || fallback;

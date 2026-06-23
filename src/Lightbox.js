
import { useEffect, useState, useRef } from 'react';
import { Fancybox } from '@fancyapps/ui';
import { lbbConfig } from './config';
import EImage from './assets/img/image.svg';
import EAudio from './assets/img/audio.svg';
import EPdf from './assets/img/pdf.svg';
import EVideo from './assets/img/video.svg';
import Default from './Components/layout/Default';
import MasonryLayout from './Components/layout/Masonry';
import Slider from './Components/layout/Slider';

const Lightbox = ({ ContentArea, attributes, isBackend = false, custom, id, Modal, index = 0 }) => {
	const { lightboxType, items, layout, columns, button, galleryIcon, popupOptions, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls, audio, popupTheme } = attributes;
	const { mixAllData } = popupOptions;
	const [isOpen, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef();

	// funcyapps feature
	useEffect(() => {
		lbbConfig(id, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls);

		return () => {
			Fancybox.destroy();
		};
	}, [id, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls, audio]);

	const filteredItems = 'button' === lightboxType ? [items[0]] : items;

	const ButtonContent = () => <>
		{button.icon?.class && <i className={`icon ${button.icon?.class} `}></i>}
		<span>{button.text}</span>
	</>
	// check lightboxType
	if (!lightboxType) {
		return false
	}

	useEffect(() => {
		if (!isBackend) return;
		const el = containerRef.current;
		if (!el) return;

		const handleBackendClick = (e) => {
			const anchor = e.target.closest('[data-fancybox]');
			if (!anchor) return;

			e.stopPropagation();
			e.preventDefault();

			const galleryId = anchor.getAttribute('data-fancybox');
			const container = e.currentTarget;
			const allAnchors = Array.from(container.querySelectorAll(`[data-fancybox="${galleryId}"]`));

			const fancyItems = allAnchors.map(a => {
				const dataSrc = a.getAttribute('data-src');
				const item = {
					caption: a.getAttribute('data-caption') || ''
				};

				if (dataSrc) {
					// For audio inline content: extract HTML as a string to avoid
					// cross-document iframe issues in the WordPress block editor.
					// Fancybox.show() with type:'html' creates fresh DOM elements
					// in its own document context.
					const inlineEl = container.querySelector(dataSrc) || document.querySelector(dataSrc);
					if (inlineEl) {
						item.src = `<div class="llb-dialog-audio fancybox__content" style="display:block; padding:0;">${inlineEl.innerHTML}</div>`;
						item.type = 'html';
					} else {
						item.src = a.getAttribute('href');
					}
				} else {
					item.src = a.getAttribute('href');
					const dataType = a.getAttribute('data-type');
					if (dataType) item.type = dataType;
				}

				return item;
			});

			const idx = allAnchors.indexOf(anchor);

			Fancybox.show(fancyItems, {
				startIndex: idx >= 0 ? idx : 0,
				wheel: options.wheel,
				autoFocus: false,
				backdropClick: 'close',
				closeButton: 'auto',
				Carousel: { transition: options?.transition },
				Toolbar: {
					display: {
						left: Object.keys(popupIconLeft).filter(k => popupIconLeft[k]),
						middle: Object.keys(popupIconMiddle).filter(k => popupIconMiddle[k]),
						right: Object.keys(popupIconRight).filter(k => popupIconRight[k])
					}
				},
				Thumbs: {
					type: thumb.type,
					showOnStart: thumb.showOnStart,
					minCount: 2
				},
				Slideshow: {
					playOnStart: slideShow?.playOnStart,
					timeout: slideShow?.timeout
				},
				on: {
					done: (fancybox) => {
						if (typeof Plyr === 'undefined') return;

						const nonPlyrKeys = ['skipTime', 'isHeart', 'isPlaybackSpeed'];
						const plyrControls = Object.keys(controls).filter(k => controls[k] && !nonPlyrKeys.includes(k));

						// HTML5 video
						const videoElements = document.querySelectorAll('.fancybox__html5video');
						Plyr.setup(videoElements, {
							controls: plyrControls,
							fullscreen: { enabled: true, fallback: true, iosNative: true, container: null }
						});

						// YouTube & Vimeo
						const youtubeVideos = document.querySelectorAll('.has-youtube .fancybox__content');
						const vimeoVideos = document.querySelectorAll('.has-vimeo .fancybox__content');
						Plyr.setup(youtubeVideos);
						Plyr.setup(vimeoVideos);

						// Audio — scope to Fancybox container only, to avoid
						// mutating the hidden original inline element's DOM.
						const popupContainer = fancybox?.container || document;
						const audioElements = Array.from(popupContainer.querySelectorAll('.lbb-audio-player')).filter(el => !el.plyr);
						if (audioElements.length) {
							Plyr.setup(audioElements, { controls: plyrControls });
						}
					},
					close: () => {
						// Pause all audio players
						document.querySelectorAll('.lbb-audio-player').forEach(player => {
							if (player?.plyr?.pause) player.plyr.pause();
						});
						// Pause all video players
						document.querySelectorAll('video').forEach(v => {
							if (!v.paused) v.pause();
						});
					},
					init: (fancybox) => {
						setTimeout(() => {
							if (fancybox.container) {
								fancybox.container.classList.add(`${id}-lbb_modal_area`);
								fancybox.container.classList.add('lbb_modal_area');
								if (popupTheme?.color) {
									fancybox.container.style.setProperty('--fancybox-bg', popupTheme.color);
								}
							}
						}, 100);
					}
				}
			});
		};

		el.addEventListener('click', handleBackendClick, true);
		return () => el.removeEventListener('click', handleBackendClick, true);
	}, [isBackend, options, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, id, popupTheme, controls]);

	useEffect(() => {
		if (layout === 'default') {
			const lightBoxElement = document.querySelector(`#${id} .lbbLightBox`);
			if (lightBoxElement) {
				lightBoxElement?.style.setProperty('height', 'auto');
			}
		}
	}, [layout, id]);

	useEffect(() => {
		if (layout === 'default' || layout === 'masonry') {
			const Elements = document.querySelector(`#${id} .f-thumbs`);

			if (Elements) {
				Elements.style.display = 'none';
			}
		}
	}, [layout]);


	const globalProps = {
		attributes, filteredItems, mixAllData, id, EImage, ButtonContent, EAudio, EVideo, EPdf, galleryIcon, setActiveIndex, isOpen, custom, isBackend, activeIndex, ContentArea, Modal, setOpen
	}

	const masonryProps = {
		...globalProps,
		containerRef
	}

	return <div ref={containerRef} className={` ${lightboxType !== 'button' ? `lbbLightBox ${layout} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}` : 'lbbLightBox llbButton'}`} id={`lightbox-${index}`}>
		{layout === 'masonry' ? <MasonryLayout {...masonryProps} /> : layout === 'slider' ? <Slider {...globalProps} /> : <Default {...globalProps} />}
	</div>
}
export default Lightbox;

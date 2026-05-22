
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
	const { lightboxType, items, layout, columns, button, galleryIcon, popupOptions, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls, audio } = attributes;
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
				const item = {
					src: a.getAttribute('href'),
					caption: a.getAttribute('data-caption') || ''
				};
				const dataType = a.getAttribute('data-type');
				if (dataType) item.type = dataType;
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
					init: (fancybox) => {
						setTimeout(() => {
							if (fancybox.container) {
								fancybox.container.classList.add(`${id}-lbb_modal_area`);
								fancybox.container.classList.add('lbb_modal_area');
							}
						}, 100);
					}
				}
			});
		};

		el.addEventListener('click', handleBackendClick, true);
		return () => el.removeEventListener('click', handleBackendClick, true);
	}, [isBackend, options, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, id]);

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

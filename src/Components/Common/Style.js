import { getTypoCSS, getColorsCSS } from '../../../../bpl-tools/utils/getCSS';
import { getBoxValue, ratioCheck } from '../../utils/functions';

const Style = ({ attributes, id, index = 0 }) => {
	const { columnGap, rowGap, img, image, imgBorder, playerColor, overlyColor, captionTypo, captionColors, btnTypo, btnWidth, btnHeight, btnAlign, btnColors, btnHovColors, btnPadding, btnBorder, btnRadius, btnSpaceBetween, sliderHeight, popupTheme, audio, slider, content } = attributes;

	const { closeIconSize } = popupTheme;
	const { lightboxCaption } = content;
	console.log(lightboxCaption);


	const { typo } = audio;
	const mainSl = `#${id}`;
	const lightboxSl = `${mainSl} #lightbox-${index}`;
	const audioPlayerModal = `#lbb_audio_modal-${id}`;

	const newStyles = `
	${getTypoCSS('', btnTypo)?.googleFontLink}
	${getTypoCSS('', typo)?.googleFontLink}
	${getTypoCSS('', captionTypo)?.googleFontLink}
	${getTypoCSS(`${lightboxSl} button`, btnTypo)?.styles}
	${getTypoCSS(`${lightboxSl} .contentArea .caption p`, captionTypo)?.styles}
	${getTypoCSS(`${audioPlayerModal} .audioPlayer .top .title`, typo)?.styles}

	${lightboxSl} .f-carousel__nav button {
		${getColorsCSS(slider?.arrowColors)};
	}

	${lightboxSl}{
		grid-gap: ${rowGap} ${columnGap};
		justify-content:${btnAlign}; 
	}

	${lightboxSl} a{
		width:${btnWidth};
		height:${btnHeight};
	}

	${lightboxSl} .contentArea .caption p {
		${getColorsCSS(captionColors)};
	}
	
	${mainSl} .default .contentArea .img, ${lightboxSl} .f-carousel .contentArea .img {
		 
		padding-top: ${ratioCheck(image?.ratio)}%;
	}

	.${id}-lbb_modal_area .fancybox__caption {
		display: ${lightboxCaption ? 'block' : 'none'};
	}

	${lightboxSl} .lbbContent_area {
		border-radius:${img?.borderRadius}px;
		border:${getBoxValue(imgBorder)};
	}

	${lightboxSl} .lbbContent_area .contentArea::after {
		background:${overlyColor};
		border-radius:${img?.borderRadius}px;
	}
	
	${lightboxSl}.llbButton .flex{
		justify-content: ${btnAlign};
	}

	${lightboxSl} .lbbBtnDesign {
		${getColorsCSS(btnColors)};
		padding:${getBoxValue(btnPadding)};
		border:${getBoxValue(btnBorder)};
		column-gap:${btnSpaceBetween};
		border-radius:${(getBoxValue(btnRadius))};
		width:100%;
		height:100%;
	}
	
	${lightboxSl} .lbbBtnDesign:hover{
		${getColorsCSS(btnHovColors)};
	}

	.plyr {
		--plyr-color-main: ${playerColor};
	}

	${mainSl} .slider a {
		width:100%;
		height:100%;
	}

	 

	#ghbModal-${id}, #lbb_audio_modal-${id} {
		background: ${popupTheme?.color};
	}

	@media (min-width: 1025px) {

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content,
		#lbb_audio_modal-${id} .llb-custom-modal-content,
		#llb-dialog-html-${id},
		#ghbModal-${id} .ghbChildSection {
			width: ${popupTheme?.size?.desktop}%!important;
		}

		.${id}-lbb_modal_area {
			--fancybox-bg:${popupTheme?.color};
			z-index: 99999 ;
		}

		 
		
		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${closeIconSize?.desktop}px;
			height: ${closeIconSize?.desktop}px;
		}

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.desktop - 10}px;
			height: ${closeIconSize?.desktop - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${closeIconSize?.desktop}px;
			height: ${closeIconSize?.desktop}px;
		}
		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.desktop - 10}px;
			height: ${closeIconSize?.desktop - 10}px;
		}
	}

	@media (max-width: 1024px) {

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content,
		 #lbb_audio_modal-${id} .llb-custom-modal-content,
		 #llb-dialog-html-${id},
		 #ghbModal-${id} .ghbChildSection {
			width: ${popupTheme?.size?.tablet}%!important;
		}

		${lightboxSl} .f-carousel { 
			 
		}	

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${closeIconSize?.tablet}px;
			height: ${closeIconSize?.tablet}px;
		}

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.tablet - 10}px;
			height: ${closeIconSize?.tablet - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${closeIconSize?.tablet}px;
			height: ${closeIconSize?.tablet}px;
		}
		
		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.tablet - 10}px;
			height: ${closeIconSize?.tablet - 10}px;
		}
	}

	@media (max-width: 640px) {

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content,
		#lbb_audio_modal-${id} .llb-custom-modal-content,
		#llb-dialog-html-${id}, 
		#ghbModal-${id} .ghbChildSection {
			width: ${popupTheme?.size?.mobile}%!important;
		}

		${lightboxSl} .f-carousel {
			 
		}

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${closeIconSize?.mobile}px;
			height: ${closeIconSize?.mobile}px;
		}

		.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.mobile - 10}px;
			height: ${closeIconSize?.mobile - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${closeIconSize?.mobile}px;
			height: ${closeIconSize?.mobile}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.mobile - 10}px;
			height: ${closeIconSize?.mobile - 10}px;	
		}	
	}
	.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn{
		background: ${popupTheme?.closeIconColors?.bg};	 
	}	
	
	.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn:hover{
		background: ${popupTheme?.closeIconHColor?.bg};
	}

	.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
		fill:${popupTheme?.closeIconColors?.color};
		stroke:${popupTheme?.closeIconColors?.color};
	}
	
	.${id}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn:hover svg {
		fill:${popupTheme?.closeIconHColor?.color};
		stroke:${popupTheme?.closeIconHColor?.color};
	}
	
	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close {
		background: ${popupTheme?.closeIconColors?.bg};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close:hover {
		background: ${popupTheme?.closeIconHColor?.bg};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
		fill:${popupTheme?.closeIconColors?.color};
		stroke:${popupTheme?.closeIconColors?.color};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close:hover svg{
		fill:${popupTheme?.closeIconHColor?.color};
		stroke:${popupTheme?.closeIconHColor?.color};
	}

	${mainSl} .slider .f-thumbs{
		--f-thumb-gap: ${columnGap};
	}

	 	
`;

	return <style dangerouslySetInnerHTML={{
		__html: newStyles
	}} />;
}
export default Style;
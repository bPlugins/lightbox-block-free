import { getTypoCSS, getColorsCSS } from '../../../../bpl-tools/utils/getCSS';
import { getBoxValue, ratioCheck, sanitizeCSSValue as s } from '../../utils/functions';

const Style = ({ attributes, id, index = 0 }) => {
	const { columnGap, rowGap, img, image, imgBorder, playerColor, overlyColor, captionTypo, captionColors, btnTypo, btnWidth, btnHeight, btnAlign, btnColors, btnHovColors, btnPadding, btnBorder, btnRadius, btnSpaceBetween, sliderHeight, popupTheme, audio, slider, content } = attributes;

	const { closeIconSize } = popupTheme;
	const { lightboxCaption } = content;


	const { typo } = audio;
	const mainSl = `#${s(id)}`;
	const lightboxSl = `${mainSl} #lightbox-${s(index)}`;
	const audioPlayerModal = `#lbb_audio_modal-${s(id)}`;

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
		grid-gap: ${s(rowGap)} ${s(columnGap)};
		justify-content:${s(btnAlign)}; 
	}

	${lightboxSl} a{
		width:${s(btnWidth)};
		height:${s(btnHeight)};
	}

	${lightboxSl} .contentArea .caption p {
		${getColorsCSS(captionColors)};
	}
	
	${mainSl} .default .contentArea .img, ${lightboxSl} .f-carousel .contentArea .img {
		 
		padding-top: ${ratioCheck(image?.ratio)}%;
	}

	.${s(id)}-lbb_modal_area .fancybox__caption {
		display: ${lightboxCaption ? 'block' : 'none'};
	}

	${lightboxSl} .lbbContent_area {
		border-radius:${s(img?.borderRadius)}px;
		border:${s(getBoxValue(imgBorder))};
	}

	${lightboxSl} .lbbContent_area .contentArea::after {
		background:${s(overlyColor)};
		border-radius:${s(img?.borderRadius)}px;
	}
	
	${lightboxSl}.llbButton .flex{
		justify-content: ${s(btnAlign)};
	}

	${lightboxSl} .lbbBtnDesign {
		${getColorsCSS(btnColors)};
		padding:${s(getBoxValue(btnPadding))};
		border:${s(getBoxValue(btnBorder))};
		column-gap:${s(btnSpaceBetween)};
		border-radius:${s(getBoxValue(btnRadius))};
		width:100%;
		height:100%;
	}
	
	${lightboxSl} .lbbBtnDesign:hover{
		${getColorsCSS(btnHovColors)};
	}

	.plyr {
		--plyr-color-main: ${s(playerColor)};
	}

	${mainSl} .slider a {
		width:100%;
		height:100%;
	}

	 

	#ghbModal-${s(id)}, #lbb_audio_modal-${s(id)} {
		background: ${s(popupTheme?.color)};
	}

	.fancybox__container.${s(id)}-lbb_modal_area {
		--fancybox-bg:${s(popupTheme?.color)} !important;
		z-index: 99999 ;
	}

	@media (min-width: 1025px) {

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content,
		#lbb_audio_modal-${s(id)} .llb-custom-modal-content,
		#llb-dialog-html-${s(id)},
		#ghbModal-${s(id)} .ghbChildSection {
			width: ${s(popupTheme?.size?.desktop)}%!important;
		}

		 
		
		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${s(closeIconSize?.desktop)}px;
			height: ${s(closeIconSize?.desktop)}px;
		}

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.desktop - 10}px;
			height: ${closeIconSize?.desktop - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${s(closeIconSize?.desktop)}px;
			height: ${s(closeIconSize?.desktop)}px;
		}
		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.desktop - 10}px;
			height: ${closeIconSize?.desktop - 10}px;
		}
	}

	@media (max-width: 1024px) {

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content,
		 #lbb_audio_modal-${s(id)} .llb-custom-modal-content,
		 #llb-dialog-html-${s(id)},
		 #ghbModal-${s(id)} .ghbChildSection {
			width: ${s(popupTheme?.size?.tablet)}%!important;
		}

		${lightboxSl} .f-carousel { 
			 
		}	

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${s(closeIconSize?.tablet)}px;
			height: ${s(closeIconSize?.tablet)}px;
		}

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.tablet - 10}px;
			height: ${closeIconSize?.tablet - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${s(closeIconSize?.tablet)}px;
			height: ${s(closeIconSize?.tablet)}px;
		}
		
		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.tablet - 10}px;
			height: ${closeIconSize?.tablet - 10}px;
		}
	}

	@media (max-width: 640px) {

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content,
		#lbb_audio_modal-${s(id)} .llb-custom-modal-content,
		#llb-dialog-html-${s(id)}, 
		#ghbModal-${s(id)} .ghbChildSection {
			width: ${s(popupTheme?.size?.mobile)}%!important;
		}

		${lightboxSl} .f-carousel {
			 
		}

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn {
			width: ${s(closeIconSize?.mobile)}px;
			height: ${s(closeIconSize?.mobile)}px;
		}

		.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
			width: ${closeIconSize?.mobile - 10}px;
			height: ${closeIconSize?.mobile - 10}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close{
			width: ${s(closeIconSize?.mobile)}px;
			height: ${s(closeIconSize?.mobile)}px;
		}

		${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
			width: ${closeIconSize?.mobile - 10}px;
			height: ${closeIconSize?.mobile - 10}px;	
		}	
	}
	.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn{
		background: ${s(popupTheme?.closeIconColors?.bg)};	 
	}	
	
	.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn:hover{
		background: ${s(popupTheme?.closeIconHColor?.bg)};
	}

	.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn svg {
		fill:${s(popupTheme?.closeIconColors?.color)};
		stroke:${s(popupTheme?.closeIconColors?.color)};
	}
	
	.${s(id)}-lbb_modal_area .fancybox__slide .fancybox__content .f-button.is-close-btn:hover svg {
		fill:${s(popupTheme?.closeIconHColor?.color)};
		stroke:${s(popupTheme?.closeIconHColor?.color)};
	}
	
	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close {
		background: ${s(popupTheme?.closeIconColors?.bg)};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close:hover {
		background: ${s(popupTheme?.closeIconHColor?.bg)};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close svg {
		fill:${s(popupTheme?.closeIconColors?.color)};
		stroke:${s(popupTheme?.closeIconColors?.color)};
	}

	${audioPlayerModal} .llb-custom-modal-content .llb-custom-modal-close:hover svg{
		fill:${s(popupTheme?.closeIconHColor?.color)};
		stroke:${s(popupTheme?.closeIconHColor?.color)};
	}

	${mainSl} .slider .f-thumbs{
		--f-thumb-gap: ${s(columnGap)};
	}

	 	
`;

	return <style dangerouslySetInnerHTML={{
		__html: newStyles
	}} />;
}
export default Style;
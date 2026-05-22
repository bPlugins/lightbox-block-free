
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { Modal } from '@wordpress/components';
import { produce } from 'immer';
import { withSelect } from "@wordpress/data";

import Lightbox from '../../Lightbox';
import ContentArea from './Settings/ContentArea';
import Settings from './Settings/Settings';
import Style from '../Common/Style';
import { lightbox_type } from '../../utils/ligtbox-gallery-type';
import ClipBoard from './ClipBoard';
import UploadGallery from './UploadGallery';
import SingleMediaUpload from './SingleMediaUpload';
import MarketingBanner from './MarketingBanner';
import { placeholderImg } from '../../utils/links';

const Edit = props => {
	const { attributes, setAttributes, clientId, isSelected, currentPostId, CPTType } = props;
	const { lightboxType, items } = attributes;

	const Els = useRef();
	const id = `lbbLightBox-${clientId}`

	const [activeIndex, setActiveIndex] = useState(0);

	const updateItem = (type, index, val, childType = false) => {
		const newItem = produce(attributes.items, draft => {
			if (childType) {
				draft[index][type][childType] = val;
			} else {
				draft[index][type] = val;
			}
		});
		setAttributes({ items: newItem });
	}

	const checkPro = (lb_type) => {
		setAttributes({ lightboxType: lb_type?.type })
	}
	const shortcode = `[lbb-lightbox-block id=${currentPostId}]`;

	const SingleMediaUploadProps = { attributes, setAttributes };

	useEffect(() => {

		if ((lightboxType === "content" || lightboxType === "html" || lightboxType === "button") && items?.length === 0) {
			const newItem = { type: lightboxType === 'button' ? 'image' : lightboxType, id, content: "", title: "", caption: "", thumbnail: placeholderImg, artist: "Morgan Wallen", isAudioThumbnails: true, altText: '', importCaption: false, thumbCaption: "" }

			setAttributes({ items: [...items, newItem] });
		}
	}, [lightboxType]);


	return <div {...useBlockProps()}>
		{CPTType === "lbb" && <ClipBoard shortcode={shortcode} />}

		{!lightboxType ?
			<div className='lbbLightBoxPlaceholder'>
				<div className='lightboxlayout'>

					<div className="media-lightbox">
						<h2 className="title">{__('Select a lightbox type', 'lightbox-block')}</h2>
						<p className="subtitle">{__('Open any media type in a beautiful lightbox', 'lightbox-block')}</p>
						<div className="cards">
							{
								lightbox_type?.map((lb_type, index) => {

									return <div key={index} onClick={() => checkPro(lb_type)} className={`media-card ${lb_type.class}`} >
										{lb_type.status && <div className="new-status"> {__('New', 'lightbox-block')} </div>}
										{lb_type.icon}
										<h3>{lb_type.title}</h3>
										<p>{lb_type?.desc}</p>
									</div>
								})
							}
						</div>
						<MarketingBanner />
					</div>
				</div>
			</div>
			: <div>
				<Settings attributes={attributes} setAttributes={setAttributes} id={id} clientId={clientId} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

				<div ref={Els} id={id} style={{ position: 'relative' }}>
					<Style attributes={attributes} id={id} />
					{!isSelected && <div className='lbbPopProtect'></div>}

					{/* {Els.forEach((lightboxEl, index) => { */}
					{
						(lightboxType === 'gallery' && items?.length == 0) ? <>
							<UploadGallery setAttributes={setAttributes} items={items} />
						</> :
							((lightboxType !== "content" && lightboxType !== "code" && lightboxType !== "button") && items?.length === 0) ?
								<div className="createGalleryItemsPanel">
									<SingleMediaUpload {...SingleMediaUploadProps} />
								</div> :
								<Lightbox ContentArea={ContentArea} Modal={Modal} id={id} isSelected={isSelected} attributes={attributes} isBackend={true} custom={{ updateItem }} />
					}

					{/* })} */}
				</div>
			</div >}
	</div >
};
export default withSelect((select) => {
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();
	return {
		currentPostId,
		CPTType
	};
})(Edit);
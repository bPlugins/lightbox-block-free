import CheckContentType from './CheckContentType';


const Default = ({ attributes, filteredItems, mixAllData, id, EImage, ButtonContent, EAudio, EVideo, EPdf, galleryIcon, setOpen, setActiveIndex, isOpen, custom, activeIndex, ContentArea, Modal }) => {
    const { lightboxType, img, caption: captionPosition, } = attributes;

    return filteredItems?.map((item, index) => {
        const { type, thumbnail, thumbCaption, content, contentCaption, caption: customCaption, importCaption, altText, isAudioThumbnails, artist } = item || {};

        const caption = importCaption ? (type == 'image' ? contentCaption : thumbCaption) : customCaption;
        const commonProps = { type, id, caption, importCaption, lightboxType, img, captionPosition, ButtonContent, altText, isAudioThumbnails, index, artist };

        const imageTypeNotSupport = { thumbnail, galleryIcon };

        return <div key={index} className="flex flex-wrap gap-5 justify-center max-w-5xl mx-auto px-6 lbbContent_area">

            <CheckContentType commonProps={commonProps} imageTypeNotSupport={imageTypeNotSupport} activeIndex={activeIndex} EAudio={EAudio} EVideo={EVideo} setActiveIndex={setActiveIndex} setOpen={setOpen} index={index} item={item} isOpen={isOpen} Modal={Modal} ContentArea={ContentArea} custom={custom} mixAllData={mixAllData} content={content} EImage={EImage} attributes={attributes} EPdf={EPdf} />
        </div>
    })
}
export default Default;
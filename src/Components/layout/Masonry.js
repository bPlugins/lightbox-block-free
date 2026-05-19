import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CheckContentType from './CheckContentType';


const MasonryLayout = ({ attributes, filteredItems, mixAllData, id, EImage, ButtonContent, EAudio, EVideo, galleryIcon, setOpen, setActiveIndex, isOpen, custom, activeIndex, ContentArea, Modal }) => {
    const { lightboxType, columnGap, rowGap, img, caption: captionPosition, columns } = attributes;
    const { desktop, tablet, mobile } = columns;
    return <ResponsiveMasonry columnsCountBreakPoints={{ 0: mobile, 576: tablet, 768: desktop }} gutterBreakPoints={{ 0: columnGap }}>
        <Masonry itemStyle={{ gap: rowGap }}>
            {filteredItems?.map((item, index) => {
                const { type, thumbnail, thumbCaption, content, contentCaption, caption: customCaption, importCaption, altText, isAudioThumbnails, artist } = item || {};
                const caption = importCaption ? (type == 'image' ? contentCaption : thumbCaption) : customCaption;
                const commonProps = { type, id, caption, lightboxType, img, captionPosition, ButtonContent, altText, isAudioThumbnails, artist }

                const imageTypeNotSupport = { thumbnail, galleryIcon }

                return <div key={index} className=" lbbContent_area">

                    <CheckContentType commonProps={commonProps} imageTypeNotSupport={imageTypeNotSupport} activeIndex={activeIndex} EAudio={EAudio} EVideo={EVideo} setActiveIndex={setActiveIndex} setOpen={setOpen} index={index} item={item} isOpen={isOpen} Modal={Modal} ContentArea={ContentArea} custom={custom} mixAllData={mixAllData} content={content} EImage={EImage} attributes={attributes} />
                </div>
            })}
        </Masonry>
    </ResponsiveMasonry>
}
export default MasonryLayout;
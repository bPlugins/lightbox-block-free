import { useEffect, useState } from 'react';
import { placeholderImg } from '../../utils/links';
import CheckContentType from './CheckContentType';

const Slider = ({ attributes, filteredItems, mixAllData, id, EImage, ButtonContent, EAudio, EVideo, galleryIcon, setOpen, setActiveIndex, isOpen, custom, activeIndex, ContentArea, Modal }) => {
    const { lightboxType, img, caption: captionPosition, layout, slider } = attributes;

    const [carousel, setCarousel] = useState(null);
    const [carouselItems, setCaroulelItems] = useState(filteredItems);

    useEffect(() => {
        carousel?.destroy();
        setCaroulelItems(filteredItems);

    }, [filteredItems, slider]);

    useEffect(() => {
        const cr = new Carousel(document.getElementById(`lbbCarousel-${id}`), {
            Dots: false,
            Thumbs: {
                type: slider?.thumbs,
            },
        }, { Thumbs });

        setCarousel(cr);
    }, [carouselItems, layout, slider]);





    return <div className='f-carousel' id={`lbbCarousel-${id}`}>

        {carouselItems?.map((item, index) => {
            const { type, thumbnail, thumbCaption, content, contentCaption, caption: customCaption, importCaption, altText, isAudioThumbnails, artist } = item || {};

            const caption = importCaption ? (type == 'image' ? contentCaption : thumbCaption) : customCaption;
            const commonProps = { type, id, caption, lightboxType, img, captionPosition, ButtonContent, altText, isAudioThumbnails, artist, index }

            const imageTypeNotSupport = {
                thumbnail,
                galleryIcon
            }

            const actualType = lightboxType === 'gallery' ? type : lightboxType;

            const thumbSource = actualType === 'image' 
                ? (content ? content : placeholderImg) 
                : (thumbnail ? thumbnail : placeholderImg);




            return <div key={index} className="f-carousel__slide flex flex-wrap gap-5 justify-center max-w-5xl mx-auto px-6 lbbContent_area" data-thumb-src={thumbSource}>

                <CheckContentType commonProps={commonProps} imageTypeNotSupport={imageTypeNotSupport} activeIndex={activeIndex} EAudio={EAudio} EVideo={EVideo} setActiveIndex={setActiveIndex} setOpen={setOpen} index={index} item={item} isOpen={isOpen} Modal={Modal} ContentArea={ContentArea} custom={custom} mixAllData={mixAllData} content={content} EImage={EImage} attributes={attributes} />
            </div>
        })}
    </div>

}
export default Slider;
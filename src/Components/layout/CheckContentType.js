import Audio from '../MediaType/Audio';
import Content from '../MediaType/Content';
import Html from '../MediaType/Html';
import Iframe from '../MediaType/Iframe';
import Image from '../MediaType/Image';
import Pdf from '../MediaType/Pdf';
import Video from '../MediaType/Video';

const CheckContentType = ({ commonProps, imageTypeNotSupport, activeIndex, EAudio, EVideo, setActiveIndex, setOpen, index, item, isOpen, Modal, ContentArea, custom, mixAllData, content, EImage, EPdf, attributes }) => {
    return <>
        <Image {...commonProps} {...imageTypeNotSupport} mixAllData={mixAllData} content={content} EImage={EImage} attributes={attributes} />

        <Audio {...commonProps}{...imageTypeNotSupport} mixAllData={mixAllData} content={content} EAudio={EAudio} attributes={attributes} />

        <Video {...commonProps}{...imageTypeNotSupport} mixAllData={mixAllData} content={content} EVideo={EVideo} index={index} attributes={attributes} />

        <Content {...commonProps}{...imageTypeNotSupport} setOpen={setOpen} setActiveIndex={setActiveIndex} index={index} isOpen={isOpen} activeIndex={activeIndex} Modal={Modal} ContentArea={ContentArea} item={item} custom={custom} attributes={attributes} />

        {/* new code start  */}
        <Pdf {...commonProps}{...imageTypeNotSupport} mixAllData={mixAllData} index={index} attributes={attributes} content={content} EPdf={EPdf} />

        <Iframe {...commonProps}{...imageTypeNotSupport} mixAllData={mixAllData} content={content} EAudio={EAudio} attributes={attributes} />

        <Html {...commonProps}{...imageTypeNotSupport} mixAllData={mixAllData} content={content} EAudio={EAudio} attributes={attributes} />
    </>
}
export default CheckContentType;
import { checkType } from '../../utils/functions';
import { placeholderImg } from '../../utils/links';
import Icon from '../layout/Child/Icon';

const Content = ({ attributes, type, lightboxType, img, thumbnail, setOpen, setActiveIndex, index, galleryIcon, ButtonContent, isOpen, activeIndex, Modal, id, ContentArea, item, custom, altText }) => {
    const { content: showContent } = attributes;

    return checkType(lightboxType, type, 'content') && <a>
        {"button" === lightboxType ?
            <button className='lbbBtnDesign' onClick={() => { setOpen(true); setActiveIndex(index); }}><ButtonContent /></button> :
            <div className={`content-thumbnail  contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                <div className={`img ${img?.animation}`} onClick={() => {
                    setOpen(true);
                    setActiveIndex(index);
                }}>
                    <img src={thumbnail || placeholderImg} alt={altText} />
                </div>
                {/* {caption && <div className={`caption ${captionPosition?.position}`}>
                    <p>{caption}</p>
                </div>} */}
                <Icon type={type} galleryIcon={galleryIcon} lightboxType={lightboxType} />
            </div>
        }

        {isOpen && activeIndex === index && <Modal id={id} activeIndex={activeIndex} onRequestClose={() => setOpen(false)} className="lbbLightBoxModal" overlayClassName='lbbLightBoxModalOverlay' shouldCloseOnClickOutside={false}>
            <ContentArea item={item} index={activeIndex} custom={custom} />


        </Modal>}
    </a>

}
export default Content;
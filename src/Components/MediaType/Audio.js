
import { sanitizeHTML } from '../../../../bpl-tools/utils/common';
import { checkType } from '../../utils/functions';
import Caption from '../layout/Child/Caption';
import ChildImage from '../layout/Child/ChildImage';
import Icon from '../layout/Child/Icon';
import EAudio from '../../assets/img/audio.svg';

import PopUpArea from './AudioPlayer/PopUpArea';

const Audio = ({ attributes, type, mixAllData, id, index, caption, content, lightboxType, img, thumbnail, captionPosition, galleryIcon, ButtonContent, altText, isAudioThumbnails }) => {
    const { content: showContent } = attributes;

    const commonAudioProps = { id, index, isAudioThumbnails, thumbnail, altText, content, attributes };

    return checkType(lightboxType, type, 'audio') && (
        <>
            <a
                data-fancybox={`${mixAllData ? `${id}-allDataGallery` : `${id}-audio-gallery`}`}
                data-caption={sanitizeHTML(caption)}
                className="lbbmodalbtn"
                href={`${content === '' ? EAudio : content}`}
                data-src={`#llb-dialog-audio-${id}-${index}`}
            >
                {lightboxType === "button" ? (
                    <button className='lbbBtnDesign'><ButtonContent /></button>
                ) : (
                    <div className={`contentArea ${showContent?.overlyColor && "overlyColor"}`}>
                        <ChildImage altText={altText} img={img} thumbnail={thumbnail} />
                        <Caption showContent={showContent} caption={caption} captionPosition={captionPosition} />
                        <Icon galleryIcon={galleryIcon} type={type} lightboxType={lightboxType} />
                    </div>
                )}
            </a>

            <PopUpArea id={id} commonAudioProps={commonAudioProps} />
        </>
    );
};

export default Audio;

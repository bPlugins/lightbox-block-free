import { useEffect, useRef } from 'react';
import { placeholderImg } from '../../../../utils/links';
import { useResponsiveImg } from '../../../../utils/responsiveImages';

const Default = ({ isAudioThumbnails, thumbnail, altText, content }) => {
    const showThumbnail = isAudioThumbnails;
    const audioContainerRef = useRef(null);
    // Player image lives in a hidden popup that may be copied into the lightbox, so no scroll observer / effect:
    // the large (WebP) file from the map with the browser's own lazy loading
    const { src: playerSrc } = useResponsiveImg(thumbnail);

    // Manage the audio element imperatively to avoid React's virtual DOM
    // conflicting with Plyr's DOM wrapping (Plyr is initialized by config.js
    // inside the Fancybox `done` event, not here).
    useEffect(() => {
        const container = audioContainerRef.current;
        if (!container) return;

        // Destroy any existing Plyr instance before clearing the container
        const existing = container.querySelector('.lbb-audio-player');
        if (existing?.plyr) {
            existing.plyr.destroy();
        }
        container.innerHTML = '';

        const audioEl = document.createElement('audio');
        audioEl.id = 'player';
        audioEl.className = 'lbb-audio-player';
        audioEl.preload = 'none'; // don't fetch the file until it is played

        const sourceMp3 = document.createElement('source');
        sourceMp3.src = content;
        sourceMp3.type = 'audio/mp3';

        const sourceOgg = document.createElement('source');
        sourceOgg.src = content;
        sourceOgg.type = 'audio/ogg';

        audioEl.appendChild(sourceMp3);
        audioEl.appendChild(sourceOgg);
        container.appendChild(audioEl);

        return () => {
            const el = container.querySelector('.lbb-audio-player');
            if (el?.plyr) el.plyr.destroy();
            container.innerHTML = '';
        };
    }, [content]);

    return (
        <div className='modal_imag_main_section'>
            {showThumbnail ? (
                <div className="modal_imag_area">
                    <img className="rounded" src={playerSrc || thumbnail || placeholderImg} alt={altText} loading='lazy' decoding='async' />
                </div>
            ) : (
                <div></div>
            )}

            <div ref={audioContainerRef} />
        </div>
    );
};

export default Default;

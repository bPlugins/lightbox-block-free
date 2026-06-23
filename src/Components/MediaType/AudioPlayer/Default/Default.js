import { useEffect, useRef } from 'react';
import { placeholderImg } from '../../../../utils/links';

const Default = ({ isAudioThumbnails, thumbnail, altText, content }) => {
    const showThumbnail = isAudioThumbnails;
    const audioContainerRef = useRef(null);

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
                    <img className="rounded" src={thumbnail || placeholderImg} alt={altText} />
                </div>
            ) : (
                <div></div>
            )}

            <div ref={audioContainerRef} />
        </div>
    );
};

export default Default;

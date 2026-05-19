import { useEffect, useRef, useMemo } from 'react';
import { placeholderImg } from '../../../../utils/links';

const Default = ({ isAudioThumbnails, thumbnail, altText, content, attributes }) => {
    const showThumbnail = isAudioThumbnails;
    const audioContainerRef = useRef(null);
    const plyrInstanceRef = useRef(null);

    const { controls } = attributes;

    // Build the Plyr-compatible controls array from the controls object
    const controlsOpt = useMemo(() => {
        return Object.keys(controls).filter(key => controls[key] && key !== 'skipTime' && key !== 'isHeart' && key !== 'isPlaybackSpeed');
    }, [controls]);

    // Stable string key for dependency comparison
    const controlsKey = JSON.stringify(controlsOpt);

    // Manage audio element + Plyr entirely outside React's virtual DOM
    // to avoid the removeChild conflict when Plyr wraps/moves the element
    useEffect(() => {
        const container = audioContainerRef.current;
        if (!container) return;

        // Destroy previous Plyr instance first
        if (plyrInstanceRef.current) {
            plyrInstanceRef.current.destroy();
            plyrInstanceRef.current = null;
        }

        // Clear the container (Plyr leaves behind its wrapper)
        container.innerHTML = '';

        // Create audio element imperatively
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

        // Initialize Plyr on the new element
        if (typeof Plyr !== 'undefined') {
            plyrInstanceRef.current = new Plyr(audioEl, {
                controls: controlsOpt,
            });
        }

        return () => {
            if (plyrInstanceRef.current) {
                plyrInstanceRef.current.destroy();
                plyrInstanceRef.current = null;
            }
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [controlsKey, content]);

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

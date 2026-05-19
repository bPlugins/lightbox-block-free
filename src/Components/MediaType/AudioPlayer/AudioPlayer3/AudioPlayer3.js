import { Volume2, VolumeX } from 'lucide-react';
import PlayPause from '../../../Common/playerComponents/PlayPause';
import { useAudio } from '../../../../hooks/useAudio';
import { useEffect } from 'react';


export default function AudioPlayer3({ caption, content: url, artist, attributes, customIsPlay }) {
    const { controls } = attributes || {};

    const { volume: isVolume, ["current-time"]: isCurrentTime, duration: isDurationTime } = controls;
    const { isPlaying, togglePlay, currentTime, duration, formatTime, toggleMute, isMuted, progressRef, handleProgressClick } = useAudio(url);

    useEffect(() => {
        if (customIsPlay) {
            togglePlay();
        }
    }, []);

    return (
        <div className="player3 audioPlayer">
            <div className="top">
                <PlayPause {...{ isPlaying, togglePlay }} />
                <div>
                    <h3 className="title">{caption}</h3>
                    <p className="artist">{artist}</p>
                </div>
            </div>

            <div className="progress">
                {isCurrentTime ? <span className="time">{formatTime(currentTime)}</span> : <span />}
                <div className="bar-bg">
                    <div
                        ref={progressRef} onClick={handleProgressClick}
                        className="bar-fill"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                {isDurationTime ? <span className="time">{formatTime(duration)}</span> : <span />}
            </div>

            <div className="bottom">
                <div className="bars">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="bar-line"
                            style={{ height: 10 + Math.random() * 10 }}
                        ></div>
                    ))}
                </div>

                {isVolume ? <button className="mute" onClick={toggleMute}>
                    {isMuted ? <VolumeX className='volumeIcn' /> : <Volume2 className='volumeIcn' />}
                </button> : <span />}
            </div>
        </div>
    );
}

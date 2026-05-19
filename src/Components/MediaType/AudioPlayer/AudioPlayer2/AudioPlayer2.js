import { Volume2, Heart, VolumeX } from 'lucide-react';
import { useAudio } from '../../../../hooks/useAudio';
import PlayPause from '../../../Common/playerComponents/PlayPause';
import { useEffect } from 'react';

export default function AudioPlayer2({ caption, content: url, artist, attributes, customIsPlay }) {
    const { controls } = attributes || {};
    const { volume: isVolume, ["current-time"]: isCurrentTime, duration: isDurationTime, isHeart, isPlaybackSpeed } = controls;

    const { isPlaying, togglePlay, currentTime, duration, formatTime, toggleMute, isMuted, playbackRate, changePlaybackRate, progressRef, handleProgressClick } = useAudio(url);

    useEffect(() => {
        if (customIsPlay) {
            togglePlay();
        }
    }, []);

    return (
        <div className="player2 audioPlayer">
            <div className="info6">
                <div className="top">
                    <div>
                        <h3 className="title">{caption}</h3>
                        <p className="artist">{artist}</p>
                    </div>
                    {isHeart && <button className="heart">
                        <Heart size={18} />
                    </button>}
                </div>

                <div className="progress">
                    <div ref={progressRef} onClick={handleProgressClick} className="bar-bg">
                        <div className="bar-fill" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                        <div className="thumb" style={{ left: `${(currentTime / duration) * 100}%`, top: '50%' }}></div>
                    </div>

                    <div className="time">
                        {isCurrentTime ? <span>{formatTime(currentTime)}</span> : <span />}
                        {isDurationTime ? <span>-{formatTime(duration - currentTime)}</span> : <span />}
                    </div>
                </div>

                <div className="controls">
                    {isVolume ? <div className="vol" onClick={toggleMute}>
                        {isMuted ? <VolumeX className='volumeIcn' /> : <Volume2 className='volumeIcn' />}
                    </div> : <div />}

                    <PlayPause {...{ isPlaying, togglePlay }} />

                    {isPlaybackSpeed ? (
                        <div className="speed-dropdown">
                            <button className="speed-button">{playbackRate.toFixed(1)}x</button>
                            <div className="speed-options">
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                    <div
                                        key={rate}
                                        onClick={() => changePlaybackRate(rate)}
                                        className="speed-option"
                                    >
                                        {rate}x
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <div />}

                </div>
            </div>
        </div>
    );
}

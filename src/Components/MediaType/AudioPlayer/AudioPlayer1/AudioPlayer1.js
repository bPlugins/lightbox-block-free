import { SkipBack, SkipForward, Rewind, FastForward, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../../../hooks/useAudio';
import PlayPause from '../../../Common/playerComponents/PlayPause';
import { useEffect } from 'react';

export default function AudioPlayer1({ caption, content: url, attributes, customIsPlay }) {
    const { controls } = attributes || {};
    const { rewind: isForBack, volume: isVolume, ["current-time"]: isCurrentTime, duration: isDurationTime, skipTime } = controls;
    const { isPlaying, togglePlay, currentTime, duration, formatTime, toggleMute, isMuted, skipBackward, skipForward, progressRef, handleProgressClick } = useAudio(url, skipTime);

    useEffect(() => {
        if (customIsPlay) {
            togglePlay();
        }
    }, []);

    return (
        <div className="player1 audioPlayer">
            <PlayPause {...{ size: 18, isPlaying, togglePlay }} />

            <div className="info">
                <div className="top">
                    <h3 className="title">{caption}</h3>
                    <span className="time">
                        {isCurrentTime && formatTime(currentTime)}
                        {isCurrentTime && isDurationTime && '/'}
                        {isDurationTime && formatTime(duration)}
                    </span>
                </div>

                <div ref={progressRef} onClick={handleProgressClick} className="bar-bg">
                    <div
                        className="bar-fill"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                        <div className="thumb" style={{ left: `${(currentTime / duration) * 100}%`, top: '50%' }}></div>
                    </div>
                </div>
            </div>

            <div className="controls">
                {isForBack && <button onClick={skipBackward} className="btn">
                    <Rewind className='forbackIcn' />
                </button>}
                {isForBack && <button onClick={skipForward} className="btn">
                    <FastForward className='forbackIcn' />
                </button>}
                {isVolume && <button className="btn" onClick={toggleMute} >
                    {isMuted ? <VolumeX className='volumeIcn' /> : <Volume2 className='volumeIcn' />}
                </button>}
            </div>
        </div>
    );
}
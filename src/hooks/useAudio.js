import { useState, useEffect, useRef } from 'react';

export const useAudio = (url = "", skipTime = 5) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const audioRef = useRef(null);
    const volBarRef = useRef(null);
    const progressRef = useRef(null);


    useEffect(() => {
        audioRef.current = new Audio(url);
        const audio = audioRef.current;
        audio.volume = volume;

        const updateTime = () => setCurrentTime(Math.floor(audio.currentTime));
        const handleDurationChange = () => setDuration(Math.floor(audio.duration));
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, [url]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const adjustVolume = (value) => {
        const clampedValue = Math.min(Math.max(value, 0), 1);
        setVolume(clampedValue);
        if (audioRef.current) {
            audioRef.current.volume = clampedValue;
            if (audioRef.current.muted) {
                audioRef.current.muted = false;
                setIsMuted(false);
            }
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const skipBackward = () => {
        const newTime = Math.max(currentTime - skipTime, 0);
        seek(newTime);
    };

    const skipForward = () => {
        const newTime = Math.min(currentTime + skipTime, duration);
        seek(newTime);
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const handleVolumeChange = (e) => {
        const bar = volBarRef.current;
        if (!bar) return;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newVolume = clickX / rect.width;
        adjustVolume(newVolume);
    };

    const changePlaybackRate = (rate) => {
        setPlaybackRate(rate);
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
        }
    };

    const handleProgressClick = (e) => {
        if (!progressRef.current || !audioRef.current || !duration) return;

        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        seek(newTime);
    };

    const restart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return {
        isPlaying,
        currentTime,
        duration,
        volume,
        togglePlay,
        seek,
        adjustVolume,
        formatTime,
        toggleMute,
        isMuted,
        volBarRef,
        handleVolumeChange,
        skipBackward,
        skipForward,
        changePlaybackRate,
        playbackRate,
        progressRef,
        handleProgressClick,
        restart
    };
};

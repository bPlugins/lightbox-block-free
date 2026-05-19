import { Pause, Play } from "lucide-react";

const PlayPause = ({ isPlaying, togglePlay }) => {

    return (

        <button className="play" onClick={togglePlay}>
            {isPlaying ? <Pause className="forbackIcn" /> : <Play className="forbackIcn" />}
        </button>
    )
}

export default PlayPause;





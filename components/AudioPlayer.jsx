import React from "react";
import Button from 'react-bootstrap/Button';
import { IconContext } from "react-icons"
import {
    FaPlayCircle,
    FaPauseCircle,
    FaRedoAlt
} from "react-icons/fa"

const useAudio = url => {
    const [audio] = React.useState(new Audio(url));
    const [playing, setPlaying] = React.useState(false);
    const [repeat, setRepeat] = React.useState(false);

    const togglePlayPause = () => setPlaying(!playing);
    const toggleRepeat = () => setRepeat(!repeat);

    React.useEffect(() => {
        playing ? audio.play() : audio.pause();
        repeat ? audio.loop = true : audio.loop = false;
    },
        [audio, playing, repeat]
    );

    React.useEffect(() => {
        audio.addEventListener('ended', () => {
            setPlaying(false)
            setRepeat(false)
        });
        return () => {
            audio.removeEventListener('ended', () => {
                setPlaying(false)
                setRepeat(false)
            });
        };
    }, [audio]);

    return [playing, repeat, togglePlayPause, toggleRepeat];
};

const AudioPlayer = ({ url }) => {
    const [playing, repeat, togglePlayPause, toggleRepeat] = useAudio(url);

    return <>
        <Button
            variant="default"
            type="button"
            className="rounded-circle p-0 ms-1"
            onClick={togglePlayPause}>
            {
                playing ? <FaPauseCircle /> : <FaPlayCircle />
            }
        </Button>

        <Button
            variant="default"
            type="button"
            className="rounded-circle p-0 ms-2"
            onClick={toggleRepeat}>
            <IconContext.Provider value={{ color: repeat && "#c0c0c0" }}>
                <FaRedoAlt />
            </IconContext.Provider>
        </Button>
    </>
};

export default AudioPlayer;
import React from "react";
import Button from 'react-bootstrap/Button';
import { IconContext } from "react-icons"
import {
    FaPlayCircle,
    FaPauseCircle,
    FaRedoAlt
} from "react-icons/fa"

const useAudio = url => {
    const audio = React.useRef();
    const [playing, setPlaying] = React.useState(false);
    const [repeat, setRepeat] = React.useState(false);

    const togglePlayPause = () => setPlaying(!playing);
    const toggleRepeat = () => setRepeat(!repeat);

    React.useEffect(() => {
        audio.current = new Audio(url)
    },
        [audio, url]
    );

    React.useEffect(() => {
        playing ? audio.current.play() : audio.current.pause();
        repeat ? audio.current.loop = true : audio.current.loop = false;
    },
        [audio, playing, repeat]
    );

    React.useEffect(() => {
        audio.current.addEventListener('ended', () => {
            setPlaying(false)
            setRepeat(false)
        });
        return () => {
            audio.current.removeEventListener('ended', () => {
                setPlaying(false)
                setRepeat(false)
            });
        };
    }, [audio]);

    React.useEffect(() => {
        return () => {
            audio.current.pause()
        }
    }, [audio])

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
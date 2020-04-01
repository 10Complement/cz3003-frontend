import React, { useState } from "react";
import Sound from "react-sound";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import bgMusic from "../Common/sound/Our-Mountain_v003_Looping.mp3"; //It says looping but it doesn't loop by itself, it loops because of the configuration in the music component
//import bgMusic from "../Common/sound/Lost-Jungle_Looping.mp3"; //Alternative music, can also be any other music
//Source: https://soundimage.org/fantasywonder/

window.soundManager.setup({debugMode: false});

const styles = {
	icon: {
		width: "26px",
        margin: "8px"
      },
    container: {
        backgroundColor: "#EEEEEE",
        borderRadius: "50%"
    }
}


export default function() {

    const [musicState, setMusicState] = useState(Sound.status.PLAYING);
    const [iconState, setIconState] = useState(<VolumeUpIcon style={styles.icon} />);

    function switchState() {

        if (musicState === Sound.status.PAUSED) { //Does not trigger when I pause/play the music using my headset buttons
            setMusicState(Sound.status.PLAYING);
            setIconState(<VolumeUpIcon style={styles.icon} />);
        } else {
            setMusicState(Sound.status.PAUSED);
            setIconState(<VolumeOffIcon style={styles.icon} />);
        }
        
    }

    return <div style={styles.container} onClick={() => switchState()}>
        {iconState}
        <Sound 
            url= {bgMusic}
            playStatus={musicState} 
            loop={true}
        />
    </div>;
}

//Issue with chrome browse: when using the refresh button of the browser, the music won't autoplay anymore, because of some stupid webbrowser policies preventing sound to autoplay

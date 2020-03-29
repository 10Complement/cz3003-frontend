import React, { useState } from "react";
import Sound from "react-sound";
import Image from "react-bootstrap/Image";

import Speaker from "./images/speaker.svg";
import Mute from "./images/mute.svg";

import bgMusic from "../Common/sound/Our-Mountain_v003_Looping.mp3";
//import bgMusic from "../Common/sound/Lost-Jungle_Looping.mp3";
//Source: https://soundimage.org/fantasywonder/

const styles = {
	icon: {
		width: "35px",
        margin: "5px"
      },
    container: {
        backgroundColor: "#EEEEEE",
        borderRadius: "50%"
    }
}


export default function(props) {

    const [musicState, setMusicState] = useState(Sound.status.PLAYING);
    const [iconState, setIconState] = useState(Speaker);

    function switchState() {

        if (musicState === Sound.status.PAUSED) { //Does not trigger when I pause/play the music using my headset buttons
            setMusicState(Sound.status.PLAYING);
            setIconState(Speaker);
        } else {
            setMusicState(Sound.status.PAUSED);
            setIconState(Mute);
        }
        
    }

    return <div style={styles.container}>
        <Image src={iconState} style={styles.icon} draggable={false} onClick={() => switchState()}/>
        <Sound 
            url= {bgMusic}
            playStatus={musicState} 
            loop={true}
        />
    </div>;
}

//Issue with chrome browse: when using the refresh button of the browser, the music won't autoplay anymore, because of some stupid webbrowser policies preventing sound to autoplay

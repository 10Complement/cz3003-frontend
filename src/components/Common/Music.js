import React from "react";
import Sound from "react-sound";

export default function(props) {

    var playStatus;

    if (props.playStatus == "playing") {
        playStatus = Sound.status.PLAYING;
    } else if (props.playStatus == "paused") {
        playStatus = Sound.status.PAUSED;
    } else {
        playStatus = Sound.status.STOPPED;
    }

    return <Sound 
        url= {props.url}
        playStatus={playStatus} 
        loop={true}
    />;
}

//Issue with chrome browse: when using the refresh button of the browser, the music won't autoplay anymore, because of some stupid webbrowser policies preventing sound to autoplay

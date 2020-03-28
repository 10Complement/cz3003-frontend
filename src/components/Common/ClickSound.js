import React from "react";
import Sound from "react-sound";

import clickSound from "./sound/multimedia_button_click_001.mp3";
//import clickSound from "./sound/Lost-Jungle_Looping.mp3"; //For testing purposes

export default function(props) {

    return <Sound 
        url= {clickSound}
        playStatus={props.playStatus} 
        autoLoad={true}
        loop={true}
    />

}
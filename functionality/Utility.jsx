import pause from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/pause.png';
// import play from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/play.png';
import add from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/add_one.png';
import remove from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/remove_one.png';
import reset from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/remove_all.png';
import React, { useRef, useState, useEffect } from 'react';

function Utility({onAction, add_button_action, isAffected, add_button}){
    const [current_value, change_icon] = useState("expand_screen.png");

    const button_clicked = (current) => {
        change_icon(() => {
            return current_value === current ? "diminish_screen.png" : "expand_screen.png";
            }
        );
    };



    return(
        <div className="utility_bar"
            isAffected={isAffected}
            style = {{marginTop: isAffected  ? "55.75vh" : "27.95vh"}}
            >
            <button className="utility_button"><img src={pause} style={{width: "45%", marginTop: "-3.5%"}}></img></button>
            <button className="utility_button"
                add_button={add_button}
                >
                <img src={add} style={{width: "35%"}}></img>
            </button>
            <button className="utility_button"><img src={remove} style={{width: "35%", marginTop: "0.5%"}}></img></button>
            <button className="utility_button"><img src={reset} style={{width: "35%", marginTop: "0.5%"}}></img></button>
            <button className="utility_button"
                onMouseDown= {() => button_clicked("expand_screen.png")}
                onClick= {onAction}
                >
                <img src={current_value} style={{width: "33%", marginTop: "2%"}}></img>
            </button>
        </div>
    );
}

export default Utility;
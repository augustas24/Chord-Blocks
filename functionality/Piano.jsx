import edge from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/edge.png';
import bottom from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/bottom.png';

import {LeftOctave, MiddleOctave, RightOctave} from './Octaves';
import React,{useState} from 'react';

function Piano(){
    const inactive_list = new Map([
        [1, "octave_button_left.png"],
        [2, "octave_button.png"],
        [3, "octave_button_right.png"]
    ]);

    const active_list = new Map([
        [1, "octave_button_left_active.png"],
        [2, "octave_button_active.png"],
        [3, "octave_button_right_active.png"]
      ]);
    
    const class_list = new Map([
        [1, "left_octave_button"],
        [2, "octave_button"],
        [3, "right_octave_button"]
    ]);

    function get_proper_class(index){
        if (index == 0){
            return "left_octave_button";
        }

        else if (index == 8){
            return "right_octave_button";
        }

        else {
            return "octave_button";
        }
    }

    //const octave_button_types = new Map([["a", 1], ["b", 2], ["c", 2], ["d", 2], ["e", 2], ["f", 2], ["g", 2], ["h", 2], ["i", 3]]);
    const octave_button_types = [1, 2, 2, 2, 2, 2, 2, 2, 3];
    const octave_names = ["C0", "C1", "C2", "C3", "C4", "C5", "C6"];
    const margin_left_list = ["5.8%", "24%", "42.3%", "60.5%", "78.7%", "96.9%", "115.2%"];

    //For å endre endre farge til oktavknappen (MOUSEDOWN):
    const [current_image_source, change_source] = useState(inactive_list.get(1)); //Bildet som brukes i "intial state"

    const change_image_source = (index) => { //Funksjonen som brukes når man clicker på bildet for å "toggle"
        change_source((index)
        );
    };

    // let selected_octave_button = active_list.get(current_image_source);

    function get_current_image_source(item) { // Metode for å legge til en ny liste/bar med blokker i all_bars
        return current_image_source === item ? active_list.get(item) : inactive_list.get(item);
    };
    
    //For å endre endre farge til oktavknappen (ONCLICK):
    const [selectedIndex, setSelectedIndex] = useState(-1);

    //For å endre tekstfarge til oktavknappen
    const [text_color, change_color] = useState("rgb(191, 122, 118)")

    const change_text_color = (index) => {
        change_color((index)
        );
    };

    function text_color_change(index) { // Metode for å legge til en ny liste/bar med blokker i all_bars
        return text_color === index ? "white" : "rgb(191, 122, 118)";
    };

    return (
        <div className="scrollable">
            
            <div className="edges_and_vertical_container">

                <div style={{display: "flex", flexDirection: "column", alignItems: "end", width: "4.05%", height: "100%"}}>
                    <img src={edge} style={{width: "94.5%", height: "100%", marginTop: "0.5%"}}></img>
                </div>
    
                <div className="vertical_container">

                    <div className="change_octave">

                        {octave_button_types.map((item, index) => 
                        (<img 
                            key={item} 
                            className={class_list.get(item)} //item
                            src={get_current_image_source(item)} 
                            onMouseDown={() => (setSelectedIndex(item), change_image_source(item), change_text_color(index - 1))}
                            // onClick = {() => (setSelectedIndex(item), change_image_source(item), change_text_color(index - 1))}
                            style={{gridColumn: index, filter: selectedIndex === item ?  "brightness(1.3)" : "brightness(1)"}} //onClick={() => set_to_active(index)}
                        >
                        </img>))}

                        {octave_names.map((item, index) => 
                        (<div 
                            key={item}
                            className= "octave_text" 
                            style={{color: text_color_change(index), marginLeft: margin_left_list[index], marginBottom:"0.45%"}}>
                            <strong>
                                {item}
                            </strong>
                        </div>))}

                    </div>

                    <div className="all_octaves">
                        <LeftOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <MiddleOctave />
                        <RightOctave />
                    </div>

                    <div style={{width:"100%", height: "5%", alignItems: "end"}}>
                        <img src={bottom} style={{width:"100%", height: "100%"}}></img>
                    </div>

                </div>

                <div style={{webkitTransform: "scaleX(-1)", transform: "scaleX(-1)", display: "flex", flexDirection: "column", alignItems: "end", width: "4.05%", height: "100%"}}>
                    <img src={edge} style={{width: "94.5%", height: "100%", marginTop: "0.5%"}}></img>
                </div>

            </div>
        </div>
    );
}

export default Piano; 
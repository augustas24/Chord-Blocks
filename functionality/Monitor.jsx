import visual from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/monitor.png';
import layout_1 from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/layout_1.png';
import layout_2 from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/layout_2.png';
import layout_3 from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/layout_3.png';
import layout_4 from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/layout_4.png';
import layout_5 from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/layout_5.png';

import React, { useRef, useState, useEffect } from 'react';
import $ from 'jquery';

function Monitor({isAffected}){
    let action_panel_list = ["BLOCK-MAP", "IMPORT", "EXPORT", "CONNECT", "LAYOUT", "PATTERNS"]

    let action_panel_icons = ['action_icon_1c.png', 'action_icon_2b.png', 'action_icon_3c.png', 'action_icon_4b.png', 'action_icon_5.png', 'action_icon_6b.png']

    let info_text_list = new Map([
        ["DEFAULT", "Hover the mouse over a component to get more info about it."],
        ["BLOCK", "The current chord progression. Click on an empty panel to add a chord. Click on non-empty panels to change and display their content."],
        ["PLAY", "Plays the currently set chord progression from its beginning."],
        ["STOP", "Stops playing the current progression."],
        ["ADD_ONE", "Adds a new chord panel with no contents to the progression."],
        ["REMOVE_ONE", "Removes the currently selected chord panel. If no chord panel is selected, then the most recently added panel is removed."],
        ["REMOVE_ALL", "Deletes all chords within the chord progression."],
        ["BLOCK-MAP", "Shows a condensed version of the chord progression to make quick edits."],
        ["IMPORT", "Imports chords from the text written in the field below."],
        ["EXPORT", "Exports the current chord progression to the clipboard or as a MIDI-file."],
        ["CONNECT", "Connects to external MIDI keyboards that are plugged into one of the USB ports."],
        ["CONFIGURE", "Lets you configure the span of your plugged in keyboard by first playing the lowest C note followed by the highest C note."],
        ["METRONOME", "Turns the metronome on or off."],
        ["LAYOUT", "Choose the layout that sets the sizes of components in this program."],
        ["PATTERNS", "Set the patterns and symbols that correspond to different chords."],
        ["OCTAVE", "Sets the playable octave to the one you click on. This also determines what octave chords in the progression are played from."],
        ["LAYOUT 1", "All three major components take up roughly the same amount of space within the window."],
        ["LAYOUT 2", "All keys within the piano are shown in the window at once. Monitor takes up 2/4 of the window."],
        ["LAYOUT 3", "All keys within the piano are shown in the window at once. Blocks take up 2/4 of the window."],
        ["LAYOUT 4", "No keys are visible, only the octave buttons above them. Monitor and blocks take up each half."],
        ["LAYOUT 5", "No keys are visible, only the octave buttons above them. The blocks take up 3/4 of the window."],
        ["PATTERN_OR_SYMBOL", "Click on the symbol or pattern you want to change. Press ENTER to apply your changes."]
    ]);

    //["IMPORT", "Imports chords from the text written in the field below. Write a list of chords with spaces or commas inbetween each chord."],
    //["CONNECT", "Connects to external MIDI keyboards that are plugged into one of the USB ports. If multiple keyboards are connected, click to sort through them."],

    let content_list = new Map([
        ["DEFAULT", default_content()],
        ["BLOCK-MAP", block_map_content()],
        ["IMPORT", import_content()], 
        ["EXPORT", export_content()],
        ["CONNECT", connect_content()],
        ["LAYOUT", layout_content()],
        ["PATTERNS", patterns_content()]
    ]);

    //onMouseEnter og onMouseLeave
    const [isHovered, setIsHovered] = useState("DEFAULT");

    let info_text = info_text_list.get(isHovered);

    const handleMouseEnter = (text) => {
        setIsHovered(text);
    };

    const handleMouseLeave = () => {
        setIsHovered("DEFAULT");
        // return isHovered = content_list.get("DEFAULT");
        // useEffect(() => {
        //     isHovered = content_list.get("DEFAULT");
        // }, [])
        
    };

    //onMouseDown
    const [selectedIndex, setSelectedIndex] = useState(-1);

    //onClick
    const [isClicked, setIsClicked] = useState(false);

    const is_clicked = (text) => {
        setIsClicked(text);
        action_panel_clicked("flex"); //Gjør slik at alle iconene forsvinner når man har trykket på et icon.
        handleMouseLeave(text); //Gjør slik at informasjonsteksten settes tilbake til DEFAULT
    };

    let current_content = content_list.get(isClicked);

    //For at ikonet til den valgte funksjonaliteten har riktig farge
    const [current_color, set_icon_color] = useState("rgb(74, 191, 217");

    const set_new_icon_color = (index) => {
        set_icon_color((index)
        );
    };

    function hent_farge(index) {
        return current_color === index ? "rgb(54, 85, 118)" : "rgb(74, 191, 217)"
    }

    //For at kun ikonet som musen hovrer over synlig
    const [currently_visible, set_visibility] = useState(0);

    const set_new_visibility = (index) => {
        set_visibility((index)
        );
    };

    function change_visiblity(index) {
        return currently_visible === index ? 100 : 0
    }

    //Så ikonet får riktig størrelse og plassering
    let width_list = ["8vh", "8.2vh", "8vh", "8vh", "9.1vh", "10.5vh"];
    function set_width(index){
        return width_list[index]
    }

    let margin_list = ["1.2vh", "1vh", "1.5vh", "2vh", "1vh", "0.2vh"]
    function get_placement(index){
        return margin_list[index]
    }

    //Så action_panelet forsvinner når en funksjonalitet er trykket på
    const [gone_on_click, clicked] = useState("none");

    const action_panel_clicked = (new_value) => { //prøv å bruke først i info_text
        clicked(() => {
            return gone_on_click === new_value ? "none" : "flex";
            }
        )
    };
    

    //funksjoner til de ulike funksjonalitetene
    function default_content(){
        return (
            <div class="default_class"
                >
                <img src="logo_1.png" >
                </img>
            </div>
        );
    }

    function block_map_content(){

        const create_block = (beat_list) => {
        let blocks = "";

        const elements = [];
        for (let i = 0; i < beat_list.length; i++) {

            let forste = beat_list[i].toString();
            blocks += forste + "fr ";

            elements.push(
                <p class="map_elements"><strong>B</strong></p>
            );
        }

        return(
            <div class="map_row" style={{gridTemplateColumns: blocks}}>
                {elements}
            </div>
            )
        }

        return (
            <div className="midi_map_class">
                {/* notes og beats */}
                <div style={{position: "absolute", display: "flex", flexDirection: "column", marginTop: "-1.1%", marginLeft: "-40%"}}>
                    <p class="notes_or_beats" style={{fontSize: "90%", paddingRight: "1.4vh", paddingLeft: "1.3vh"}}><strong>NOTES</strong></p>
                    <p class="notes_or_beats" style={{fontSize: "90%", paddingRight: "1.4vh", paddingLeft: "1.3vh"}}><strong>BEATS</strong></p>
                </div>

                {/* alle blokkene */}
                <div class="map">
                    {create_block([1, 1, 1, 1, 2, 2])}
                    {create_block([4, 3, 1])}
                    {/* {create_block([1, 3, 3, 1])} */}
                </div>

                {/* note verdiene */}
                <div style={{position: "absolute", display: "flex", flexDirection: "column", marginTop: "-1.1%", marginRight: "-38%"}}>
                    
                    <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
                        <div class="midi_map_note_background"><div class="midi_map_note_foreground" style={{width: "2vh", height: "4vh", mask: "url(note_quarter.png) center/contain no-repeat", maskSize: "100%"}}></div></div>
                        <div class="midi_map_note_background"><div class="midi_map_note_foreground" style={{width: "2vh", height: "4vh", mask: "url(note_half.png) center/contain no-repeat", maskSize: "100%"}}></div></div>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
                        <div class="midi_map_note_background"><div class="midi_map_note_foreground" style={{width: "2vh", height: "4vh", mask: "url(note_dotted_half.png) center/contain no-repeat", maskSize: "100%"}}></div></div>
                        <div class="midi_map_note_background"><div class="midi_map_note_foreground" style={{width: "2vh", height: "4vh", mask: "url(note_whole.png) center/contain no-repeat", maskSize: "100%"}}></div></div>
                    </div>
                
                </div>
                
            </div>
        )
    }

    function import_content(){
        return (
            <div style={{position: "absolute"}}>
                <input className="input_field" type = "text" value = "WRITE CHORD PROGRESSION HERE" style={{width: "81.1vh", marginTop: "8.4%"}}></input>
                <div style={{position: "absolute", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "-0.9%", marginLeft: "-0.4%"}}>
                    <p className="notes_or_beats" style={{fontSize: "90%", marginRight: "-0.18vh", paddingLeft: "16.55vh", paddingRight: "16.5vh"}}><strong>FINISH</strong></p>
                    <p className="notes_or_beats" style={{fontSize: "90%", marginLeft: "-0.18vh", paddingLeft: "16.5vh", paddingRight: "16.55vh"}}><strong>CLEAR</strong></p>
                </div>  
            </div>
        )
    }

    function export_content(){
        return (
            <div style={{position: "absolute", marginLeft: "-44.95%"}}>
                <div style={{position: "absolute", display: "flex", flexDirection: "row", marginTop: "-3.2vh"}}>
                    {/* file path */}
                    <input className="input_field" type = "text" value = "FILE PATH" style={{width: "40vh"}}></input>
                    
                    {/* file name */}
                    <input className="input_field" type = "text" value = "FILE NAME" style={{width: "40vh",  marginLeft: "-0.282vh"}}></input>
                </div>

                <div style={{position: "absolute", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "15.2vh", marginLeft: "-0.38vh"}}>
                    <p className="notes_or_beats" style={{fontSize: "90%", paddingLeft: "11.84vh", paddingRight: "11.84vh", whiteSpace: "nowrap"}}><strong>TO CLIPBOARD</strong></p>
                    <p className="notes_or_beats" style={{fontSize: "90%", marginLeft: "-0.7vh", paddingLeft: "13.15vh", paddingRight: "13.15vh", whiteSpace: "nowrap"}}><strong>AS MIDI FILE</strong></p>
                </div> 
                
            </div>
        )
    }

    function connect_content(){
        // test - erstattes av parameter
        let find_pianos = ["PIANO_NAME_1", "PIANO_NAME_2", "PIANO_NAME_3", "PIANO_NAME_4"];

        let list_of_pianos = [];

        for (let i = 0; i < find_pianos.length; i++){
            list_of_pianos.push(
                <div className="chord_recognition_patterns_row" style={{gridTemplateColumns: "1fr"}}>
                    <p style={{marginTop: "0.55vh", fontSize: "90%", color: "rgb(29, 156, 185)"}}><strong>{find_pianos[i]}</strong></p>
                </div>   
            );
        }

        return (
            <div style={{position: "absolute", marginTop: "3.95%", marginLeft: "-38%"}}>
                <div className="chord_recognition_patterns" style={{height: "9.3vh"}}>    
                    {list_of_pianos}
                </div>  
                <div style={{position: "absolute", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "8.7vh", marginLeft: "-0.3vh"}}>
                    <p className="notes_or_beats" style={{width: "12.85vh", fontSize: "90%" , paddingLeft: "12vh", paddingRight: "12vh", whiteSpace: "nowrap"}}><strong>SELECT</strong></p>
                    <p className="notes_or_beats" style={{width: "12.85vh", fontSize: "90%", marginLeft: "-0.7vh", paddingLeft: "9.6vh", paddingRight: "9.6vh", whiteSpace: "nowrap"}}><strong>CONFIGURE</strong></p>
                </div>
            </div>
        )
    }

    function layout_content(){
        let layout_names = ["LAYOUT 1", "LAYOUT 2", "LAYOUT 3", "LAYOUT 4", "LAYOUT 5"];

        //Setter innholdet i bildet:
        let layout_index = new Map([
            ["LAYOUT 1", layout_1],
            ["LAYOUT 2", layout_2],
            ["LAYOUT 3", layout_3], 
            ["LAYOUT 4", layout_4], 
            ["LAYOUT 5", layout_5], 
        ]);

        const [hover, set_hovered] = useState("LAYOUT 1");

        const layout_entered = (text) => {
            set_hovered(text);
        };

        let current_layout = layout_index.get(hover);

        //Indikerer raden som er aktiv:
        const [active_row, select_new_row] = useState("LAYOUT 1");

        const this_new_row = (this_item) => {
            select_new_row(this_item);
        };


            return (
                <div style={{position: "absolute", marginTop: "7.2vh", width:"60vh", height:"14.5vh", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    
                    <div className="chord_recognition_patterns" 
                        style={{position: "absolute", width: "39.5vh", height: "14.5vh", overflowY: "scroll", paddingTop: "0vh", marginTop: "0vh", marginLeft: "42.5%"}}>
                        {layout_names.map((item, index) => 
                        (<div 
                            className= "chord_recognition_patterns_row"
                             style={{height: "4.65vh", gridTemplateColumns: "1fr", marginBottom: "-0.25vh"}}>
                            <p 
                            key={item} 
                            className= {active_row === item ? "chord_recognition_patterns_element chord_recognition_patterns_element_active" : "chord_recognition_patterns_element"}
                            style={{paddingTop: "0.9vh", fontSize: "90%"}}
                            onClick={() => this_new_row(item)} //Skal endre fargen på elementet.
                            onMouseEnter={() => (handleMouseEnter(item),layout_entered(item))} //Midlertidig endre current_layout (bildet til høyre). Mørkeblå farge.
                            onMouseDown={() => (layout_entered(item))} //Sett innholder i bildet til høyre. Lyseblå farge.
                            onMouseLeave={console.log("replace")} //bildet til høyre skal settes tilbake til det som er valgt når man ikke hoverer over et chord_recognition_patterns_element. 
                                                                    //aka. current_layout = den valgte komponenten
                            >
                            <strong>
                                {item}
                            </strong></p>
                        </div>))}
                    </div> 

                    <img 
                    src={current_layout} style={{width:"50%", marginTop: "-0.5%", marginLeft: "-8.2%", border: "solid", borderWidth: "2px", borderColor: "rgb(113, 218, 242)"}}>
                    </img>   
                </div>
            )
        }

    function patterns_content(){
        const default_monstre = new Map([
            ["MINOR LETTERS:", "min"],
            ["MINOR SYMBOL:", "-"],
            ["AUGMENTED LETTERS:", "aug"],
            ["AUGMENTED SYMBOL:", "+"],
            ["MAJOR 7TH:", "maj"],
            ["DIMINISHED:", "dim"],
            ["SUSPENDED:", "sus"], 
            ["ADD:", "add"], 
            ["INVERSION:", "/"]
        ]);

        const elements = [];

        default_monstre.forEach (function(value, key){
            elements.push(
                <div className="chord_recognition_patterns_row">
                    <p style={{marginTop: "0.55vh", fontSize: "90%"}}><strong>{key}</strong></p>
                    <p className="chord_recognition_patterns_element"><strong>{value}</strong></p>
                </div>
                
            );
        })

        return (
            <div className="chord_recognition_patterns">    
                {elements}   
            </div>
        )
    }

    return (
        <div className="monitor"
            isAffected={isAffected}
            style= {{display: isAffected  ? "none" : "flex"}}
        >
            <img className="background" src={visual} style={{width: "70%", display: "block", marginLeft:"auto", marginRight: "auto"}}></img>
        
            <div className="info_text"
                onMouseEnter={() => action_panel_clicked("flex")}
                onMouseLeave={() => clicked("none")}
                >
                <p><strong>{info_text}</strong></p>
                
                <div className="action_panel" 
                    style={{marginTop: "-3%", display: gone_on_click}}
                >
                    {action_panel_list.map((item, index) => 
                    (<p 
                        className= {selectedIndex === index ? "action_panel_element element_active" : "action_panel_element"}
                        key={item} 
                        onMouseDown={() => {setSelectedIndex(index), set_new_icon_color(index)}}
                        onClick={() => {is_clicked(item)}}
                        onMouseEnter={() => (handleMouseEnter(item), set_new_visibility(index))} // i set_new_icon_color skal item være et liste element som med index
                        onMouseLeave={() => ((handleMouseLeave(item)), set_new_visibility(index))}
                        >
                        <strong style={{marginTop: "3%"}}>
                            {item}
                        </strong>
                        <div 
                            className= {selectedIndex === index ? "icon element_active" : "icon"}
                            style={{opacity: change_visiblity(index), background: hent_farge(index), mask: "url(" + action_panel_icons[index] + ")" + " center/contain no-repeat", width: set_width(index), height: set_width(index), marginTop: get_placement(index)}}
                            >
                        </div>
                    </p>))}                    

                </div>
            
            </div>

            {/* Innholdet i monitoren */}
            {current_content}


        {/* TEST */}
        {/* <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.simplyscroll.js"></script>
        <link rel="stylesheet" href="jquery.simplyscroll.css" media="all" type="text/css"></link>

        <script type="text/javascript">
            (function($) {
                $(function() { //on DOM ready 
                    $("#scroller").simplyScroll();
                })
            })(jQuery);
        </script> */}

        </div>
    );
}

export default Monitor;
import white from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/white_tangent.png';
import black from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/black_tangent.png';

import white_off from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/white_tangent.png';
import white_on from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/white_tangent_pressed.png';
import black_off from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/black_tangent.png';
import black_on from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/black_tangent_pressed.png';
import React,{useState} from 'react';

function PlayNote(){

}

const Tangent = (color, note_name) => { //Tangent-objekt
//ER DET SAMME SOM:
// const Tangent = function(color, note_name) {}

    // this.navn = navn;
    // this.tangent_nummer = tangent_nummer;
    // this.note_verdi = note_verdi;
    // this.oktav = oktav;
    // this.volume = volume;

    const off = new Map([
        [1, white_off],
        [2, black_off],
      ]);

      const on = new Map([
        [1, "white_tangent_pressed_test_2.png"],
        [2, "black_tangent_pressed_test_5.png"],
      ]);

    const [imageSrc, setImageSrc] = useState(off.get(color));
  
    const ClickedOn = () => { //Skal byttes om til funksjonen for når man trykke ned en tast
        setImageSrc((prevImageSrc) => 
            prevImageSrc === off.get(color) ? on.get(color) : off.get(color)
        );
    };
    
    if (color == 2){
        return(
            <img className={note_name} src={imageSrc} onClick={ClickedOn}></img>
        );
    }
    else {
        return(
            <img className={"white_key"} src={imageSrc} onClick={ClickedOn}></img>
        );
    }  
}

export function LeftOctave(){
    return (
        <div className="piano_octave_right" style={{marginLeft: "0%"}}>
            <div className="white_keys_left">
                {/* <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img> */}
                {Tangent(1)}
                {Tangent(1)}
            </div>
    
            <div className="black_keys">
                {/* <img className="black_key Bb" src={black} style={{gridColumn: "1", marginLeft: "75%"}}></img> */}
                {Tangent(2, "Bb_left")}
            </div>
        </div>
    );
}

export function MiddleOctave(){
    return (
        <div className="piano_octave" style={{marginLeft: "0%"}}>
            <div className = "white_keys">
                {/* <img className="white_key" src={white}></img> */}
                {/* <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img>
                <img className="white_key" src={white}></img> */}
                {Tangent(1)}
                {Tangent(1)}
                {Tangent(1)}
                {Tangent(1)}
                {Tangent(1)}
                {Tangent(1)}
                {Tangent(1)}
            </div>
                        
            <div className="black_keys">
                {Tangent(2, "Db")}
                {Tangent(2, "Eb")}
                {Tangent(2, "Gb")}
                {Tangent(2, "Ab")}
                {Tangent(2, "Bb")}
                {/* <img className="black_key Db" src={black}></img> */}
                {/* <img className="black_key Eb" src={black}></img>
                <img className="black_key Gb" src={black}></img>
                <img className="black_key Ab" src={black}></img>
                <img className="black_key Bb" src={black}></img> */}
            </div>
        </div>
    );
}

export function RightOctave(){
    return (
        <div className="piano_octave" style={{marginLeft: "0%"}}>
            <div className="white_keys_right">
                {/* <img className="white_key" src={white}></img> */}
                {Tangent(1)}
            </div>
        </div>
    );
}

// export default leftOctave; middleOctave; rightOctave; 
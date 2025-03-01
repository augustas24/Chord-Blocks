import quarter from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/note_quarter.png';
import half from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/note_half.png';
import dotted_half from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/note_dotted_half.png';
import whole from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/note_whole.png';
import staff from 'C:/Users/augus/OneDrive/Documents/pianoProgram/website/staff.png';
import React, { useRef, useState, useEffect } from 'react';


function Blocks({add_button}){
    let note_lengder = [quarter, half, dotted_half, whole]; //block_lenght skal korrespondere til et element i lista
    let block_lengder = ["quarter_block", "half_block", "dotted_half_block", "whole_block"];


    //Bars/liste av blocks
    const [all_bars, update_bars] = useState({
        
    });
      
    const add_new_bar = (new_list_key) => { // Metode for å legge til en ny liste/bar med blokker i all_bars
        update_bars((prevLists) => {
            return {
                ...prevLists, 
                [new_list_key]: [] 
            };
        });
    };

    const update_bar = (list_key, new_contents) => { //Metode for å oppdatere innholdet i en av listene i all_bars
        update_bars((prevLists) => {
            const list_variable = [...prevLists[list_key], new_contents];
            return {
                ...prevLists, 
                [list_key]: list_variable 
            };
        });
    };


    //Hver enklel staff, inneholder en bar/liste av blocks
    const [individual_staffs, update_staff] = useState({
        
    });

    const add_empty_staff_with_key = (new_key) => { // Lager ny tom 
        update_staff((prevLists) => {
            return {
                ...prevLists, 
                [new_key]: []
            };
        });
    };

    const insert_staff = (this_key, new_contents) => { //Metode for å oppdatere innholdet i en av listene i all_bars
        update_staff((prevLists) => {
            const new_staff = [...prevLists[this_key], new_contents];
            return {
                ...prevLists, 
                [this_key]: new_staff 
            };
        });
    };

    //Hver complete staff, inneholder en liste av MAX to staffs
    const [all_complete_staffs, update_complete_staff] = useState({
        
    });

    const add_empty_list_of_staffs = (key_name) => { //ny tom liste
        update_complete_staff((prevLists) => {
            return {
                ...prevLists, 
                [key_name]: []
            };
        });
    };

    const insert_two_staffs = (key_name, staff_1, staff_2) => { //erstatter lista med en liste av to staffs
        update_complete_staff((prevLists) => {
            const list_variable = [...prevLists[key_name], [staff_1, staff_2]];
            return {
                ...prevLists, 
                [key_name]: list_variable 
            };
        });
    };

    //Endre bottomPadding til de to siste staff'ene/bars
    const [current_padding, change_padding] = useState("7.2vh");

    const set_padding_of_last_staffs = () => {
        update_complete_staff(() => {
            
        });
    }

    //FUNKSJONALITET TIL add_button
    

    // //Update all visuals:
    // const [current_visuals, update_all_visuals] = useState();

    // const render_new_visuals = (new_visuals) => {
    //     update_all_visuals(() => {
    //         current_visuals = new_visuals
    //     });
    // }

    //Generer og holder orden på alle blokk-objekter (avspilling, etc.)
    class Block_generator {
        constructor() {
            this.bar_number = 1; //Tall som brukes til å telle bars/measures
            this.currently_active = null;
            this.start_block = null;
            this.end_block = null; 
            this.first_available_block = null;
        }

        //Skal lage to staffs og fire blokker i første bar ved oppstart. Skal ikke gå ann å slette denne baren med "-".
        start_up(){
            this.start_block = new Block(1); //Må settes uansett
            this.end_block = this.start_block;
            this.generate_chord_blocks(3, 1)
            this.generate_chord_blocks(2, 2)
            this.generate_chord_blocks(1, 4)
            this.generate_chord_blocks(1, 3)
            return (
                this.generate_chord_blocks(1, 1) //Så man ender opp med fire blocks i første bar
            );
        }

        generate_chord_blocks(antall, length = 0){ //default parameter er 0, som gir en empty block
            for (let i = 0; i < antall; i++){
                let ny_block = new Block(length);
                this.set_order(ny_block);
            }
            return (
                this.update_visuals()
            );
        }

        set_order(this_block){ //Setter det nyeste panelet til å være end_panel. 
            this_block.previous_block = this.end_block;
            this.end_block.next_block = this_block;
            this.end_block = this_block;
        }

        //Bruk variablene fra Block_generator til å oppdatere html-koden
        update_visuals(){
            let list_of_lists_of_blocks = [];
            let blocks = new DivContainers();
            let complete_staffs = new DivContainers();
            let all_staffs = new DivContainers();

            const beats_per_measure = 4; //Skal egentlig hentes fra en global variabel utenfor dette objektet.

            this.currently_active = this.start_block;
            let block_index = 0;
            let current_amounts_of_beats = 0;

            const key_name_string = ["a", "b", "c", "d", "e", "f"]; //Må endres hvis nye time signatures legges til

            while (this.currently_active != null){
                blocks.contents.push(
                    this.currently_active.return_block(this.bar_number, key_name_string[block_index])
                );

                current_amounts_of_beats += this.currently_active.block_length;

                if (this.currently_active.block_length == 0){ //Så tomme blokker telles med
                    current_amounts_of_beats += 1;
                }

                this.currently_active = this.currently_active.next_block; //Gå videre til neste blokk.

                block_index += 1;

                if (current_amounts_of_beats == beats_per_measure){ //Når en bar er fylt opp til antallet beats for den baren.
                    list_of_lists_of_blocks.push(blocks.contents);
                    blocks.contents = []; //Lager ny, tom liste av blocks
                    this.bar_number += 1; //Oppdaterer bar nr.
                    block_index = 0;
                    current_amounts_of_beats = 0;
                }
            } 

            let padding_bottom = "7.2vh";

            let last_left_staff = null;
            let last_right_staff = null;

            for (let i = 0; i < list_of_lists_of_blocks.length; i++){ //Iterer etter antallet bars


                if ((i % 2) == 0) { //Om indeks er partall - lag ny complete staff som inneholder en enkel staff 

                    let one_ahead = i + 1;

                    useEffect(() => { //Legger til en ny tom left bar
                        add_new_bar("bar_" + i.toString());
                      }, []);

                    useEffect(() => { //Legger til rikig content i left baren over
                        update_bar("bar_" + i.toString(), list_of_lists_of_blocks[i]);
                    }, []);

                    useEffect(() => { //Legger til en ny tom right bar
                        add_new_bar("bar_" + one_ahead.toString());
                      }, []);

                    //Legger til blockene for denne baren i en staff, andre baren er tom
                    let left_staff = 
                        <div 
                            className="staff" 
                            src={staff} 
                            style={{marginLeft: "0.2%", paddingBottom: padding_bottom}}
                            key={i}
                        >
                        {all_bars["bar_" + i.toString()]} 
                            
                        </div>
                    ;

                    let right_staff = 
                        <div 
                            className="staff" 
                            src={staff} 
                            style={{marginLeft: "-0.2%", paddingBottom: padding_bottom}}
                            key={i + 1}
                        >
                            {all_bars["bar_" + one_ahead.toString()]} 
                        </div>
                    ;

                    last_left_staff = all_bars["bar_" + i.toString()];
                    last_right_staff = all_bars["bar_" + one_ahead.toString()];
                    
                //FIKS SLIK AT ALT RENDRES UNDER OPPSTART - SKAL IKKE HA EVIG RENDRING VIA. useEffect !

                    useEffect(() => { //Legger til left_staff og right_staff i individual_staffs
                        add_empty_staff_with_key("staff_" + i.toString())
                        add_empty_staff_with_key("staff_" + one_ahead.toString())
                        insert_staff("staff_" + i.toString(), left_staff)
                        insert_staff("staff_" + one_ahead.toString(), right_staff)
                        // console.log("kjører");
                        return () => { //Return statement kjøres før komponenten i dependency arrayet endres - useEffect ødelegger seg selv når dette gjøres og deretter kjøres på nytt med ny verdi for individual_staffs

                        };
                    }, []);


                    useEffect(() => { //Legger til begge staffsene/bars i en complete_staff
                        add_empty_list_of_staffs("complete_staff_" + i.toString())
                        insert_two_staffs("complete_staff_" + i.toString(), individual_staffs["staff_" + i.toString()], individual_staffs["staff_" + one_ahead.toString()])
                        return () => { 

                        };
                    }, []);

                    complete_staffs.contents.push(
                        <div 
                            className="complete_staff" 
                            style={{paddingBottom: "0.75vh"}}
                            key={"complete_staff_" + i.toString()}
                        >
                            {/* {staffs.contents} */}
                            {all_complete_staffs["complete_staff_" + i.toString()]}
                        </div>
                    );
                }

                else { //Om indeks er oddetall - sett inn en ny staff i den eksisterende complete staff'en
                    let right_bar_current_name = "bar_" + i.toString();
                    
                    useEffect(() => {
                        update_bar(right_bar_current_name, list_of_lists_of_blocks[i]);
                        // console.log("kjører");
                    }, []); //dependency array = brukes til å si hva useEffect skal høre på.
                            //- Vil denne kun kjøres en gang, siden dependency arrayen er tom?
                            //individual_staffs[right_bar_current_name]
                };
            }

            all_staffs.contents.push(  //Legger til alle komplett staff i listen som holder på alle komponentene
                complete_staffs.contents
            );
            
            this.bar_number = 1; //Så antallet bars blir riktig neste gang vi oppdaterer Blocks

            //useEffect her???
            //const ref_test = useRef() //referanse til div'en nedenfor. Bør denne variabelen settes oppe ved
            //konstruktøren til Block_generator og deretter kalle på en funksjon som rerenderer ref_test ???

            let test_div = (
                <div 
                    className="all_sheets"
                    style={{paddingBottom: "5vh"}}
                    // ref={ref_test}
                    // isAffected={isAffected}
                    // style= {{maskSize: isAffected ? "100% 75%" : "100% 75%"}} //funker ikke som ønsket
                    
                >
                    {all_staffs.contents}
                </div>
            )

            //Istedenfor å gi en return-verdi - oppdater en verdi i useState ?
            return (
                test_div
            )
        }

    }

    class DivContainers{
        constructor() {
            this.contents = [];
        }
    }

    //Individuelle blokker
    class Block {
        constructor(block_length) {
            this.bar_number_number = null;
            this.block_length = block_length;
            // this.beat = null;

            this.chord_name = null;
            this.chord_contents = null;
            this.chord_notes = null;

            this.previous_block = null;
            this.next_block = null;
        }

        return_block(measure, letter){  
            this.bar_number_number = measure;
            if (this.block_length > 1) { //Brukes til half, dotted_half og whole
                return ( 
                    <div 
                        className={block_lengder[this.block_length-1]}
                        key={measure.toString() + letter} //Gir navn som: 1a, 2b, osv.
                        >
                        <p style={{position: "absolute", color: "white", left:"2%", top: "-11%"}}><strong>{this.bar_number_number}.</strong></p>
                        <p style={{position: "absolute", color: "white", fontSize: "150%", left:"32%", bottom: "17%"}}><strong>B</strong></p>
                        <p style={{color: "white", position: "absolute", left:"25%", bottom: "-9%"}}> <strong> B, Eb, Gb</strong></p>

                        {/* placeholder - skal erstattes av en funksjon */}
                        <img src={note_lengder[this.block_length-1]} style={{position: "absolute", width: "3.2vh", right:"25%", top: "48%"}}></img>
                        <img src={note_lengder[this.block_length-1]} style={{position: "absolute", width: "3.2vh", right:"25%", top: "30%"}}></img>
                        <img src={note_lengder[this.block_length-1]} style={{position: "absolute", width: "3.2vh", right:"25%", top: "13%"}}></img>     
                    </div>
                );
            }
                
            else if (this.block_length == 1) { //Brukes til quarter
                return (
                    <div 
                        className={block_lengder[this.block_length-1]}
                        key={measure.toString() + letter}
                        >
                        <p style={{position: "absolute", color: "white", left:"5%", top: "-12.5%"}}><strong>{this.bar_number_number}.</strong></p>
                        <p style={{position: "absolute", color: "white", fontSize: "150%", bottom: "17%"}}><strong>B</strong></p>
                        <p style={{color: "white", position: "absolute", bottom: "-9%"}}> <strong> B, Eb, Gb</strong></p>
                        <img src={note_lengder[this.block_length-1]} style={{position: "absolute", width: "8.5%", right: "5%", top: "-0.05%"}}></img>
                    </div>
                ); 
            }

            else { //Brukes til tomme blocks
                // console.log("funker");
                return (
                    <div 
                        className="empty_block"
                        key={measure.toString() + letter}
                        >
                        <p style={{position: "absolute", color: "white", left:"5%", top: "-12.5%", opacity: "90%"}}><strong>{this.bar_number_number}.</strong></p>
                        <img src={note_lengder[0]} style={{position: "absolute", width: "8.5%", right: "5%", top: "-0.05%", opacity: "90%"}}></img>
                    </div>
                );  
            }
        }

    }

    //Skriv om hele systemet?
    //  - Gjør slik at measures/bars er koblet sammen som en i lenkeliste?
    //      - Ha start-block og end-block i baren som variabler
    //  - Ved metoden start_up() lages en komplett staff med to bars, den første baren har fire tomme blokker, 
    //    den andre har ingen blokker
    //      - Fire tomme blokker lages i den andre baren når man trykker "+". Trykkes "+" igjen, lages en ny
    //        komplett staff med to bars, hvor den første har fire tomme blokker og den andre ingen.
    //  - Bruk margins og padding som er brukt i gamle versjonen ??? (endre alle tilfeller som bruker 
    //    "%" til "vh" så avstander er konsistent når komponenter resizes ???)

    const generator = new Block_generator();

    //Update all visuals:
    let [current_visuals, update_all_visuals] = useState(generator.start_up());

    const render_new_visuals = (new_visuals) => {
        update_all_visuals(new_visuals)
    };

    

    // render_new_visuals(generator.start_up())

    // ,generator.generate_chord_blocks(2, 2)
    // ,test.generate_chord_blocks(1, 1)
    // ,test.generate_chord_blocks(1, 3)
    // ,test.generate_chord_blocks(1, 4)
    // ,test.generate_chord_blocks(4, 1)
    // ,test.generate_chord_blocks(4, 1)

    return(
        // current_visuals
        generator.start_up()
    );
}


export default Blocks;
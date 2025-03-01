import Stats from './Stats';
import Blocks from './Blocks';
import Utility from './Utility';
import Monitor from './Monitor';
import Piano from './Piano';
import React, { useRef, useState, useEffect } from 'react';

function Everything(){

    //EXPAND/DIMINISH SCREEN
    const [isAffected, setIsAffected] = useState(false);

    const handleAction = () => {
        setIsAffected(!isAffected);
    };

    //ADD BUTTON 
    const [add_button, add_button_action] = useState(false);

    const add_button_function = () => {
        add_button_action(!isAffected);
    };

    return (
        <div className="upper_and_lower">
            <div className="upper"
                isAffected={isAffected}
                style= {{height: isAffected  ? "60.3vh" : "32.5vh"}}
            >
                <Stats />
                <Blocks add_button={add_button}/>
                <Utility onAction={handleAction} add_button_action={add_button_function} isAffected={isAffected} add_button={add_button}/>
            </div>

            <div className="lower">   
                <Monitor isAffected={isAffected}/>
                <Piano />
            </div>
        </div>
    );
}

export default Everything;
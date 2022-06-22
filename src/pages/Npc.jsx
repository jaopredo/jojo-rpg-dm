import React, { useState, useEffect } from 'react';

/* COMPONENTS */
import LoggedChar from '../components/LoggedChar';
import LoggedStand from "../components/LoggedStand";
import { DiceRoll, Barragem } from "../components/DiceRoll";

function Npc({ cookies }) {
    const [ charState, setCharState ] = useState();
    const [ standState, setStandState ] = useState();
    const [ subStandState, setSubStandState ] = useState();

    const [ rolling, setRolling ] = useState(false);
    const [ rollingText, setRollingText ] = useState('');
    const [ rollConfigs, setRollConfigs ] = useState({});

    const [ barrage, setBarrage ] =  useState(false);
    const [ barrageConfigs, setBarrageConfigs ] = useState({});

    const [ actualLife, setActualLife ] = useState();
    const [ actualMentalEnergy, setActualMentalEnergy ] = useState();
    const [ actualDA, setActualDA ] = useState();

    useEffect(() => {
        setCharState(cookies.npcchar)
    }, [])

    useEffect(() => {
        setActualLife(charState?.combat.life);
        setActualMentalEnergy(charState?.combat.mentalEnergy);
        setActualDA(charState?.combat?.da);
    }, [ charState ])

    const [showStand, setShowStand] = useState(false);
    const [showChar, setShowChar] = useState(true);

    return <>
        <menu className="generic-list logged-menu">
            <li onClick={() => {
                setShowChar(true);
                setShowStand(false)
            }}>PERSONAGEM</li>
            <li onClick={() => {
                setShowChar(false);
                setShowStand(true);
            }}>STAND</li>
        </menu>
        {showChar && <LoggedChar
            charState={charState}
            actualLife={actualLife}
            setActualLife={setActualLife}
            actualMentalEnergy={actualMentalEnergy}
            setActualMentalEnergy={setActualMentalEnergy}
            actualDA={actualDA}
            setActualDA={setActualDA}
            setRolling={setRolling}
            setRollingText={setRollingText}
            setRollConfigs={setRollConfigs}
        />}
        {/* {showStand && <LoggedStand
            standState={standState}
            subStandState={subStandState}
            setRolling={setRolling}
            setRollConfigs={setRollConfigs}
            setBarrageConfigs={setBarrageConfigs}
            setBarrage={setBarrage}
        />} */}
        { rolling && <DiceRoll rollConfigs={rollConfigs} setRolling={setRolling}>{rollingText}</DiceRoll> }
        { barrage && <Barragem barrageConfigs={barrageConfigs} setBarrage={setBarrage}/> }
    </>;
}

export default Npc;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

/* CSS */
import '../sass/logged.scss';

/* COMPONENTS */
import LoggedChar from '../components/LoggedChar';
import LoggedStand from "../components/LoggedStand";
import { DiceRoll, Barragem } from "../components/DiceRoll";
import { BsFillDoorOpenFill } from 'react-icons/bs';

function Logged({ playerId }) {
    const navigate = useNavigate();

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
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/dm/getplayerchar`, {
                headers: { authorization: `JOJO ${process.env.REACT_APP_DM_TOKEN}` },
                params: { id: playerId }
            }).then(resp => {
                const { data: infos } = resp;
                setCharState(infos.character);
                setStandState(infos.stand);
                setSubStandState(infos.substand);
            })
        }
        fetchData();
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
            <li>
                <BsFillDoorOpenFill onClick={() => navigate('/')} />
            </li>
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
        {showStand && <LoggedStand
            standState={standState}
            subStandState={subStandState}
            setRolling={setRolling}
            setRollConfigs={setRollConfigs}
            setBarrageConfigs={setBarrageConfigs}
            setBarrage={setBarrage}
        />}
        { rolling && <DiceRoll rollConfigs={rollConfigs} setRolling={setRolling}>{rollingText}</DiceRoll> }
        { barrage && <Barragem barrageConfigs={barrageConfigs} setBarrage={setBarrage}/> }
    </>;
}

export default Logged;
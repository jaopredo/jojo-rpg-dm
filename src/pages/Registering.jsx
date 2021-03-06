import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

function Registering({ cookies, haveStand, haveSubStand }) {
    const navigate = useNavigate();
    async function fetchData() {
        await axios.post(`${process.env.REACT_APP_API_URL}/npc`, {
            npc: cookies.character,
            stand: haveStand?cookies.stand:undefined,
            substand: haveSubStand?cookies.substand:undefined,
        }, {
            headers: { authorization: `JOJO ${process.env.REACT_APP_DM_TOKEN}` },
        }).then(() => navigate('/'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <div>REDIRECIONANDO, AGUARDE</div>;
}

export default Registering;
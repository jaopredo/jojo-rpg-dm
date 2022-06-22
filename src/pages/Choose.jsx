import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* COMPONENTS */
import Header from '../components/Header/';
import SubContainer from '../components/SubContainer';
import Card from '../components/Card';

/* SCSS */
import '../sass/choose.scss';

function Choose({ setCookie }) {
    const [ playersState, setPlayersState ] = useState();
    const [ npcState, setNpcState ] = useState();

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/dm/characters`, {
                headers: { authorization: `JOJO ${process.env.REACT_APP_DM_TOKEN}` }
            }).then(resp => {
                const { players, npcs } = resp.data;
                setPlayersState(players);
                setNpcState(npcs)
            })
        };

        fetchData();
    }, []);

    return (
        <>
            <Header>JOJO'S RPG</Header>
            <SubContainer>
                <div>
                    <h2>Players</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(playersState?.map(
                            players => <Link to='/player'>
                                <Card onClick={() => setCookie('playerid', players._id)} title={players.email}/>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>NPC's</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(npcState?.map(
                            npcs => <Link to='/npc'>
                                <Card onClick={() => {
                                    setCookie('npcchar', npcs)
                                }} title={npcs.basic.name}/>
                            </Link>
                        ))}
                    </ul>
                </div>
            </SubContainer>
        </>
    );
}

export default Choose;
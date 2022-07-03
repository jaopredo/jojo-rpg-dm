import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* COMPONENTS */
import colors from '../modules/colors';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Header from '../components/Header/';
import SubContainer from '../components/SubContainer';
import Card from '../components/Card';

/* SCSS */
import '../sass/choose.scss';

const DelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 50%;
    height: 40%;
    background: #666666;
    
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;

    color: white;
    text-align: center;
    padding: 10px;

    box-shadow:  14px 14px 37px #292929,
             -14px -14px 37px #a3a3a3;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const Choice = styled.button`
    background-color: ${props => props.confirm?colors.lifeColor:
                                props.deny?colors.errorColor:colors.gray};
    border: none;
    color: white;
    padding: 10px;
    font-size: 1.5em;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.confirm?'#33e02dfe':
                                props.deny?'#d41010':colors.gray};
    }
    &:active {
        background-color: ${props => props.confirm?'#1bbb15fd':
                                props.deny?'#b60808':colors.gray};
    }
`;

function Choose({ setCookie }) {
    const navigate = useNavigate();
    const [ playersState, setPlayersState ] = useState();
    const [ npcState, setNpcState ] = useState();

    const [ delNpc, setDelNpc ] = useState(false);
    const [ delPlayer, setDelPlayer ] = useState(false);

    const [ showDeleteConfirm, setShowDeleteConfirm ] = useState(false);
    const [ emailToDelete, setEmailToDelete ] = useState('');
    const [ npcId, setNpcId ] = useState('')

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

    async function removePlayer() {
        if (delPlayer) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/dm/remove`, {
                headers: { authorization: `JOJO ${process.env.REACT_APP_DM_TOKEN}` },
                params: { email: emailToDelete }
            })
        }
        if (delNpc) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/npc`, {
                headers: { authorization: `JOJO ${process.env.REACT_APP_DM_TOKEN}` },
                params: { id: npcId }
            })
        }

        navigate(0);
    }

    return (
        <>
            <SubContainer>
                <div>
                    <h2>Players</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(playersState?.map(
                            players => <Card
                                to={'/player'}
                                onClick={() => setCookie('playerid', players._id)}
                                title={players.email}
                                onTrashClick={() => {
                                    setShowDeleteConfirm(true)
                                    setDelPlayer(true)
                                    setDelNpc(false)
                                    setEmailToDelete(players.email)
                                }}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>FENS</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(npcState?.map(
                            npcs => npcs.npcType === 'fens' && <Card
                                to='/npc'
                                onClick={() => setCookie('npcchar', npcs)}
                                title={npcs.basic.name}
                                onTrashClick={() => {
                                    setShowDeleteConfirm(true)
                                    setDelPlayer(false)
                                    setDelNpc(true)
                                    setNpcId(npcs._id)
                                }}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>MÁFIA</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(npcState?.map(
                            npcs => npcs.npcType === 'mafia' && <Card
                                to='/npc'
                                onClick={() => setCookie('npcchar', npcs)}
                                title={npcs.basic.name}
                                onTrashClick={() => {
                                    setShowDeleteConfirm(true)
                                    setDelPlayer(false)
                                    setDelNpc(true)
                                    setNpcId(npcs._id)
                                }}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>BOSS</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(npcState?.map(
                            npcs => npcs.npcType === 'boss' && <Card
                                to='/npc'
                                onClick={() => setCookie('npcchar', npcs)}
                                title={npcs.basic.name}
                                onTrashClick={() => {
                                    setShowDeleteConfirm(true)
                                    setDelPlayer(false)
                                    setDelNpc(true)
                                    setNpcId(npcs._id)
                                }}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>GENÉRICO</h2>
                    <ul className='generic-list chars-list'>
                        {React.Children.toArray(npcState?.map(
                            npcs => npcs.npcType === 'generic' && <Card
                                to='/npc'
                                onClick={() => setCookie('npcchar', npcs)}
                                title={npcs.basic.name}
                                onTrashClick={() => {
                                    setShowDeleteConfirm(true)
                                    setDelPlayer(false)
                                    setDelNpc(true)
                                    setNpcId(npcs._id)
                                }}
                            />
                        ))}
                    </ul>
                </div>
                <Link to='/creation/npc'>
                    <li className='card-container plus-container'>
                        <BsFillPersonPlusFill className='plus-icon'/>
                    </li>
                </Link>
            </SubContainer>
            {showDeleteConfirm && <DelContainer>
                <h1>TEM CERTEZA DISSO?</h1>
                <ButtonsContainer>
                    <Choice confirm onClick={() => {
                        removePlayer()
                        setShowDeleteConfirm(false)
                    }}>SIM</Choice>
                    <Choice deny onClick={() => setShowDeleteConfirm(false)}>NÃO</Choice>
                </ButtonsContainer>
            </DelContainer>}
        </>
    );
}

export default Choose;
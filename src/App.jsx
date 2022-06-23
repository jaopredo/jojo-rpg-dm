import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import { useCookies } from 'react-cookie';

/* CSS */
import './sass/register.scss';

/* PAGES */
import Choose from './pages/Choose';
import Logged from './pages/Logged';
import Npc from './pages/Npc';
import CharForm from './components/CharForm';
import StandForm from './components/StandForm';
import Registering from './pages/Registering';

const Container = styled.div`
    border: 3px solid #272727;
    width: 90%;
    padding: 10px;
    min-height: 89vh;
    margin-bottom: 20px;
    position: relative;
    margin-top: 45px;

    box-shadow:  25px 25px 51px #828282,
                -25px -25px 51px #ffffff;
`;

function App() {
    const [ cookies, setCookie ] = useCookies([
        "playerid",

        "character",
        "stand",
        "substand",

        "npcchar",
        "npcsubstand"
    ]);

    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose setCookie={setCookie}/>}/>
            <Route path='/player' element={<Logged playerId={cookies.playerid}/>}/>
            <Route path='/npc' element={<Npc cookies={cookies} />} />
            <Route path='/creation/npc' element={<CharForm charCookies={cookies} setCharCookie={setCookie}/>} />
            <Route path='/creation/stand' element={<StandForm standCookies={cookies} setStandCookie={setCookie} />} />
            <Route path='/registering' element={<Registering cookies={cookies}/>} />
        </Routes>
    </Container>;
}

export default App;

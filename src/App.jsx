import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import { useCookies } from 'react-cookie';

/* CSS */
import './sass/register.scss';

/* PAGES */
import Choose from './pages/Choose';
import Logged from './pages/Logged';
import Npc from './pages/Npc';

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
        "npcchar",
        "npcstand",
        "npcsubstand"
    ]);

    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose setCookie={setCookie}/>}/>
            <Route path='/player' element={<Logged playerId={cookies.playerid}/>}/>
            <Route path='/npc' element={<Npc cookies={cookies} />} />
        </Routes>
    </Container>;
}

export default App;

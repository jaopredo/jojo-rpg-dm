import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

import './style.scss'

function Card({ title, ...rest }) {
    return <li className='card-container' {...rest}>
        <figure>
            <BsFillPersonFill className='profile-icon'/>
            <figcaption>{title}</figcaption>
        </figure>
    </li>;
}

export default Card;
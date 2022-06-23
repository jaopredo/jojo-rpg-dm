import React from 'react';
import { BsFillPersonFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './style.scss'

function Card({ title, to, onTrashClick, ...rest }) {
    return <li className='card-container'>
        <BsFillTrashFill className='trash-can' onClick={onTrashClick} />
        <Link to={to}>
            <figure {...rest}>
                <div className='svg-container'>
                    <BsFillPersonFill className='profile-icon'/>
                </div>
                <figcaption>{title}</figcaption>
            </figure>
        </Link>
    </li>;
}

export default Card;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* CSS */
import './style.scss';

function CharForm({ charCookies, setCharCookie }) {
    const navigate = useNavigate();
    const [ haveStand, setHaveStand ] = useState(false)
    const attrMaxInfos = {
        human: 10,
        rockman: 10,
        alien: 12,
        vampire: 14,
    }
    const [attrMax, setAttrMax] = useState(10);

    // Texto vantagens das raças
    const raceAdvs = {
        'human': '+2 Charisma; Sedução, Suborno e Charme',
        'vampire': '+1 Força, +1 Constituição; Vigor, Resistência à Dor, Intimidação, Enganação',
        'rockman': '+1 Vigilância, +1 Educação; Resistência à Dor, Sobrevivência, Atuação',
        'alien': '+2 Vigilância; Percepção, Medicina, Enganação',
    }
    const [ raceAdvantages, setRaceAdvantages ] = useState(raceAdvs.human);

    // True ou falso para animação do erro
    const { register, handleSubmit } = useForm({ defaultValues: charCookies });

    /* FUNÇÃO QUE LIDA COM OS DADOS */
    const onSubmit = data => {
        setCharCookie('character', data)
        if (haveStand) {
            navigate('/creation/stand');
            return;
        }

        navigate('/registering')
    };

    const handleRaceChange = function(e) {
        setRaceAdvantages(raceAdvs[e.target.value])
        setAttrMax(attrMaxInfos[e.target.value])
    }

    /* INFORMAÇÕES DOS INPUTS */
    const attrInputInfos = [
        { label: 'Força', id: 'strengh' },
        { label: 'Destreza', id: 'dexterity' },
        { label: 'Constituição', id: 'constituition' },
        { label: 'Educação', id: 'education' },
        { label: 'Senso Comum', id: 'commonSense' },
        { label: 'Vigilância', id: 'vigillance' },
        { label: 'Carisma', id: 'charisma' },
    ]
    const specsInputInfos = {
        strengh: [
            { id: 'athletics', label: 'Atletismo', area: 'strengh' },
            { id: 'mindResistence', label: 'Resistência Psicológica', area: 'strengh' },
            { id: 'jump', label: 'Salto', area: 'strengh' },
            { id: 'fight', label: 'Briga', area: 'strengh' },
            { id: 'climb', label: 'Escalar', area: 'strengh' },
        ],

        dexterity: [
            { id: 'acrobacy', label: 'Acrobacia', area: 'dexterity' },
            { id: 'stealth', label: 'Furtividade', area: 'dexterity' },
            { id: 'aim', label: 'Mira', area: 'dexterity' },
            { id: 'dodge', label: 'Esquiva', area: 'dexterity' },
        ],

        constituition: [
            { id: 'force', label: 'Vigor', area: 'constituition' },
            { id: 'imunity', label: 'Imunidade', area: 'constituition' },
            { id: 'painResistence', label: 'Resistência a Dor', area: 'constituition' },
        ],

        education: [
            { id: 'history', label: 'História', area: 'education' },
            { id: 'geography', label: 'Geografia', area: 'education' },
            { id: 'math', label: 'Matemática', area: 'education' },
            { id: 'investigation', label: 'Investigação', area: 'education' },
            { id: 'forensic', label: 'Forense', area: 'education' },
            { id: 'sociology', label: 'Sociologia', area: 'education' },
            { id: 'tecnology', label: 'T.I', area: 'education' },
            { id: 'art', label: 'Arte', area: 'education' },
            { id: 'physics', label: 'Física', area: 'education' },
            { id: 'chemistry', label: 'Química', area: 'education' },
            { id: 'foreignLanguage', label: 'Língua Estrangeira', area: 'education' },
            { id: 'programming', label: 'Programação', area: 'education' },
            { id: 'policy', label: 'Política', area: 'education' },
            { id: 'religion', label: 'Religião', area: 'education' },
            { id: 'mechanic', label: 'Mecânico', area: 'education' },
            { id: 'biology', label: 'Biologia', area: 'education' },
        ],

        vigillance: [
            { id: 'reflex', label: 'Reflexo', area: 'vigillance' },
            { id: 'perception', label: 'Percepção', area: 'vigillance' },
            { id: 'insight', label: 'Intuição', area: 'vigillance' },
        ],

        commonSense: [
            { id: 'computer', label: 'Usar Computador', area: 'commonSense' },
            { id: 'medicine', label: 'Medicina', area: 'commonSense' },
            { id: 'bribery', label: 'Suborno', area: 'commonSense' },
            { id: 'survival', label: 'Sobrevivência', area: 'commonSense' },
            { id: 'break', label: 'Arrombar', area: 'commonSense' },
            { id: 'cooking', label: 'Cozinhar', area: 'commonSense' },
            { id: 'firstAid', label: 'Primeiros-socorros', area: 'commonSense' },
            { id: 'drive', label: 'Dirigir', area: 'commonSense' },
        ],

        charisma: [
            { id: 'intimidation', label: 'Intimidação', area: 'charisma' },
            { id: 'cheating', label: 'Enganação', area: 'charisma' },
            { id: 'acting', label: 'Atuação', area: 'charisma' },
            { id: 'charm', label: 'Charme', area: 'charisma' },
            { id: 'sexy', label: 'Seduzir', area: 'charisma' },
            { id: 'persuasion', label: 'Persuasão', area: 'charisma' },
        ]
    }

    return <form className='char-register' onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' className='name' {...register('basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='race'>Raça: </label>
                    <select id='race' {...register('basic.race', { 
                        required: true,
                        onChange: handleRaceChange,
                    })}>
                        <option defaultChecked value="human">HUMANO</option>
                        <option value="vampire">VAMPÍRO</option>
                        <option value="rockman">HOMEM-PEDRA</option>
                        <option value="alien">ALIENÍGENA</option>
                    </select>
                    <p className='beneficts'>Benefícios: {raceAdvantages}</p>
                    <p className='warning'>
                        Esses benefícios vão ser calculados automaticamente quando o formulário for enviado!
                    </p>
                </li>
                <li>
                    <label htmlFor='age'>Idade: </label>
                    <input id='age' type='number' min={20} {...register('basic.age', {
                        required: true,
                        valueAsNumber: true,
                        min: 20,
                    })} />
                </li>
                <li>
                    <label htmlFor='occupation'>Profissão: </label>
                    <input id='occupation' type="text" {...register('basic.occupation', { required: true })}/>
                </li>
            </ul>
        </fieldset>
        <fieldset id='attr-fieldset'>
            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(attrInputInfos.map(props => <li>
                        <label htmlFor={props.id}>{props.label}</label>
                        <input
                            type='number'
                            className='attribute'
                            min={1}
                            max={attrMax}
                            defaultValue={1}
                            id={props.id}
                            {...register(`attributes.${props.id}`, {
                                required: true,
                                valueAsNumber: true,
                                min: 1,
                            })}
                        />
                    </li>
                    ))}
                </ul>
            </div>
        </fieldset>
        <fieldset id='specs-fieldset'>
            <h3>Especialidades</h3>
            <table>
                <thead>
                    <tr><th>Nome</th><th>Check</th></tr>
                </thead>
                {React.Children.toArray(Object.keys(specsInputInfos).map(
                    area => <tbody className={`${area}-container`}>
                        {React.Children.toArray(specsInputInfos[area].map(props => <tr className={props.area}>
                            <td><label htmlFor={props.id}>{props.label}</label></td>
                            <td><input type='checkbox' id={props.id} {...register(`specialitys.${props.area}.${props.id}`,)}/></td>
                        </tr>))}
                    </tbody>
                ))}
            </table>
        </fieldset>
        <fieldset id='history-field'>
            <h3>História</h3>
            <textarea id='history' {...register('basic.history', {
                required: true,
            })}></textarea>
        </fieldset>
        <div className='button-container'>
            <div>
                <label htmlFor="havestand">Possui stand?: </label>
                <input type="checkbox" id="havestand" onClick={() => setHaveStand(!haveStand)} />
            </div>
            <button className='submit-button' type='submit'>ENVIAR</button>
        </div>
    </form>;
}

export default CharForm;
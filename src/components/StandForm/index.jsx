import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* CSS */
import './style.scss';

/* COMPONENTS */
import { Habilidade } from '../Habilidade';
import SubStandForm from '../SubStandForm';


function StandForm({ standCookies, setStandCookie }) {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            stand: standCookies.stand,
            substand: standCookies.substand
        }
    });

    const attrInputInfos = [
        { label: 'Força', id: 'strengh' },
        { label: 'Velocidade', id: 'speed' },
        { label: 'Resistência', id: 'durability' },
        { label: 'Precisão', id: 'precision' },
        { label: 'Alcance', id: 'range' },
    ]

    const pdAbilitys = [
        {},
        { passive: true },
        { firstMain: true },
        { firstMain: true, secondMain: true },
        { firstMain: true, secondMain: true, passive: true },
        { firstMain: true, secondMain: true, passive: true, substand: true },
    ];
    const [ abilitys, setAbilitys ] = useState(
        pdAbilitys[standCookies.stand?.attributes.development || 0]
    );
    
    // Alterando as habilidades
    const handlePDChange = e => {
        const { value } = e.target;
        setAbilitys(pdAbilitys[value]);
    }

    const onSubmit = data => {
        const { stand, substand } = data;

        for (let abilityName in stand.abilitys) {  // Removendo habilidades não presentes
            if (!Object.keys(abilitys).includes(abilityName)) stand.abilitys[abilityName] = undefined;
        }
        
        // Se tudo deu certo
        setStandCookie('stand', stand);
        if (substand) setStandCookie('substand', substand);

        navigate('/registering');
    }

    return <form className='stand-register' onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' className='name' {...register('stand.basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='standType'>Tipo: </label>
                    <select id='standType' {...register('stand.basic.standType', { required: true })}>
                        <option defaultChecked value="short-range">Curto Alcance</option>
                        <option value="long-range">Longo Alcance</option>
                        <option value="automatic">Automático</option>
                        <option value="independent">Independente</option>
                        <option value="colony">Colônia</option>
                        <option value="act">Atos</option>
                        <option value="object">Objeto</option>
                        <option value="union">União</option>
                        <option value="ability">Habilidade</option>
                        <option value="sharing">Compartilhado</option>
                    </select>
                </li>
                <li>
                    <label htmlFor='weakPoint'>Ponto fraco: </label>
                    <input id='weakPoint' type="text" {...register('stand.basic.weakPoint')}/>
                    <p className='warning'>5: A, 4: B, 3: C, 2: D, 1: E, 0: Nulo</p>
                </li>
            </ul>
        </fieldset>
        <fieldset id='attr-fieldset' className='stand-attr'>
            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(attrInputInfos.map(props => <li>
                        <label htmlFor={props.id}>{props.label}</label>
                        <input
                            type='number'
                            className='attribute'
                            min={0}
                            max={5}
                            defaultValue={0}
                            id={props.id}
                            {...register(`stand.attributes.${props.id}`, {
                                required: true,
                                valueAsNumber: true,
                                max: 5,
                                min: 0,
                            })}
                        />
                    </li>
                    ))}
                    <li>
                        <label htmlFor="pd">P.D</label>
                        <input
                            type="number"
                            className='attribute'
                            min={0}
                            max={5}
                            defaultValue={0}
                            id='development'
                            {...register('stand.attributes.development', {
                                required: true,
                                valueAsNumber: true,
                                max: 5,
                                min: 0,
                                onChange: e => handlePDChange(e)
                            })}
                        />
                    </li>
                </ul>
            </div>
        </fieldset>
        <fieldset id='substand-fieldset'>
            { abilitys.substand && <SubStandForm register={register} /> }
        </fieldset>
        <fieldset id='abilitys-fieldset'>
            {
                abilitys.firstMain && <Habilidade
                    title='Principal'
                    register={register}
                    abName='stand.abilitys.firstMain'
                />
            }
            {
                abilitys.secondMain && <Habilidade
                    title='Secundário'
                    register={register}
                    abName='stand.abilitys.secondMain'
                />
            }
            {
                abilitys.passive && <Habilidade
                    title='Passiva'
                    register={register}
                    abName='stand.abilitys.passive'
                />
            }
        </fieldset>
        <div className='button-container'>
            <button className='submit-button' type='submit'>ENVIAR</button>
        </div>
    </form>;
}

export default StandForm;
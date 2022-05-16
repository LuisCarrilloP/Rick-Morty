import React, { useState } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import axios from 'axios';

const ResidenInfo = ({resident}) => {
    
    const [ character, setCharacter ] = useState({})

    useEffectOnce(() => {
        axios
             .get(resident)
             .then(res => setCharacter(res.data))
    }, [])
    
   /*  console.log(character); */

    return (
        <div className='characterCard'>
            <ul>
                <li key={character.image}><img src={character.image} alt="" /* style={{width:("250px")}} *//></li>
                <li key={character.name} className="character-name"> {character.name}</li>
                <li key={character.status} className="character-info"><b>Status:</b> <span style={{color:  character.status === "Dead" ? "red" : character.status === "Alive" ? "lightgreen" : "gray"}}>{character.status}</span>{/* <div className='character-status' style={{background: character.status === "Dead" ? "red" : character.status === "Alive" ? "green" : "gray"}}></div> */}</li>
                <li key={character.origing?.name} className="character-info"><b>Origin:</b> {character.origin?.name}</li>
                <li key={character.episode?.length} className="character-info"><b>Episodios:</b> {character.episode?.length}</li>
            </ul>
        </div>
    );
};

export default ResidenInfo;
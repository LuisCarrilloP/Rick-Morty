import axios from 'axios';
import React, { useState } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import ResidentInfo from './ResidentInfo';
import image from "../assets/image3.png"


const RickAndMortyType = () => {
    
    const [ location, setLocation ] = useState({})

    const [ id, setId ]  = useState("Search for one of the 126 dimensions")

    const [ isLoading, setIsLoading ] = useState(true)

    useEffectOnce(() => {
        const random = Math.floor( Math.random() * 126) +1;
        axios
            .get(`https://rickandmortyapi.com/api/location/${random}/`)
            .then(res => setLocation(res.data))
            .finally(() => setIsLoading(false))
    }, [])

    console.log(location);

    const searchType = () => {
        /* console.log(id); */
        axios
          .get(`https://rickandmortyapi.com/api/location/${id}/`)
          .then(res => setLocation(res.data))
    }

    const removeText = () => setId("")

    /* const changeId = () => {
        const randomIndex = Math.floor(Math.random() * 126) +1
        setId( randomIndex )
    } */

    return (
        <div className='Location'>
            {
                isLoading ? (
                    <h2>Loading..</h2>
                ) : (
                <>
                    <img src={image} alt="" className='topImage'/>
                    
                    <div className='search'>
                        <input 
                            type="text" 
                            onChange={e => setId(e.target.value)} 
                            value={id}
                            onFocus={removeText}
                            className="input"
                        />
                        <button onClick={searchType} className="search-btn">Search</button>
                        {/* <button onClick={changeId}>Random</button> */}
                    </div>
                    
                    <div className='title-card'>
                    <h1 className='location-name'>{location.name}</h1>
                    <ul className='type-list'>
                        <li><b>Type:</b> {location.type}</li>
                        <li><b>Dimension:</b> {location.dimension}</li>
                        <li><b>Population:</b> {location.residents?.length}</li>
                    </ul>
                    </div>

                    <h2 className='residents'>Residents</h2>

                    <div className='character-map'>
                        <ul className='residents-list'>
                            {location.residents?.map(resident=>(
                                //<li>{resident}</li>
                                <ResidentInfo resident={resident} key={resident.id}/>
                            ))}
                        </ul>
                    </div>

                    
                </>
                )
            }
            
        </div>
    );
};

export default RickAndMortyType;
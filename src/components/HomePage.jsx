import React, {useEffect, useState} from 'react';
import {useAnimals} from "../api/useAnimals.js";
import {Link} from "react-router-dom";

export const HomePage = () => {
    const {animals, isLoading} = useAnimals('https://freetestapi.com/api/v1/animals')
    

    return (
        <div className={"container"}>
            <div>
                <div className={"loader"}>
                    <div className={"animals"}>
                        {animals?.map(animal => (
                            <div className={'animal'} key={animal.id}>
                                <Link to={`/encyclopedia/animal/${animal.id}`}>{animal.name}</Link>
                                <span><b>Species: </b>{animal.species}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};


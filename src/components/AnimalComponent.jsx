import React from 'react';
import {useParams} from "react-router-dom";
import {useAnimals} from "../api/useAnimals.js";
import {Loader} from "./Loader.jsx";

export const AnimalComponent = () => {
    const animalId = useParams()
    const {animals, isLoading} = useAnimals(`https://freetestapi.com/api/v1/animals/${animalId.name}`)
    return (
            <div className={"animal_container"}>
                {isLoading ?
                    <div className={"home_page"}>
                        <Loader/>
                    </div>
                :
                <div className={"animal_info"}>
                    <h2>{animals?.name}</h2>
                    <span>Species </span>
                    <p>{animals?.species}</p>
                    <span>Family </span>
                    <p>{animals?.family}</p>
                    <span>Habitat </span>
                    <p>{animals?.habitat}</p>
                    <span>Place of Found </span>
                    <p>{animals?.place_of_found}</p>
                    <span>Diet </span>
                    <p>{animals?.diet}</p>
                    <span>Weight </span>
                    <p>~{animals?.weight_kg} kg</p>
                    <span>Height </span>
                    <p>~{animals?.height_cm} cm</p>
                </div>}
            </div>
    );
};


// AnimalComponent.jsx
import React from 'react';
import { useParams } from "react-router-dom";
import { useAnimals } from "../api/useAnimals.js";
import { Loader } from "./Loader.jsx";

export const AnimalComponent = () => {
    const { name } = useParams();
    const { animals, isLoading } = useAnimals(`http://localhost:8000/api/animals/${name}`);

    return (
        <div className={"animal_container"}>
            {isLoading ? (
                <div className={"home_page"}>
                    <Loader />
                </div>
            ) : (
                <div className={"animal_info"}>
                    <h2>{animals?.name}</h2>
                    <span>Species </span>
                    <p>{animals?.species}</p>
                    <span>Family </span>
                    <p>{animals?.family}</p>
                    <span>Habitat </span>
                    <p>{animals?.habitat}</p>
                    <span>Location </span>
                    <p>{animals?.location}</p>
                    <span>Diet </span>
                    <p>{animals?.diet}</p>
                    <span>Weight </span>
                    <p>~{animals?.weight} kg</p>
                    <span>Height </span>
                    <p>~{animals?.height} cm</p>
                </div>
            )}
        </div>
    );
};

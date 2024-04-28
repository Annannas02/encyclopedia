import React, {useEffect, useState} from 'react';
import {useAnimals} from "../api/useAnimals.js";
import {Link} from "react-router-dom";
import SearchComponent from "./SearchComponent.jsx";

export const HomePage = () => {
    const {animals, isLoading} = useAnimals('https://freetestapi.com/api/v1/animals')
    const [filteredAnimals, setFilteredAnimals] = useState( null)
    const [diet, setDiet] = useState(new Set())
    const [places, setPlaces] = useState(new Set());

    const handleDiet = (diet) => {
        setDiet(prevDiets => {
            const newDiets = new Set(prevDiets)
            if (newDiets.has(diet)) {
                newDiets.delete(diet)
            } else {
                newDiets.add(diet)
            }
            return newDiets
        })
    }

    const handlePlace = (place) => {
        setPlaces(prevPlaces => {
            const newPlaces = new Set(prevPlaces);
            if (newPlaces.has(place)) {
                newPlaces.delete(place)
            } else {
                newPlaces.add(place)
            }
            return newPlaces
        });
    };


    useEffect(() => {
        if (!isLoading) {
            if (diet.size === 0 && places.size === 0) {
                setFilteredAnimals(animals)
            } else {
                setFilteredAnimals(animals?.filter(animal => (diet.size === 0 || diet.has(animal.diet)) &&
                    (places.size === 0 || places.has(animal.place_of_found))))
            }
        }
    }, [diet,places, animals, isLoading])

    return (
        <div className={"container"}>
            <SearchComponent handleDiet={handleDiet} handlePlace={handlePlace}/>
            <div>
                <div className={"loader"}>
                    <div className={"animals"}>
                        {filteredAnimals?.map(animal => (
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


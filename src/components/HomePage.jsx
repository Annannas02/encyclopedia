// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useAnimals } from "../api/useAnimals.js";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent.jsx";

export const HomePage = () => {
    const { animals, isLoading } = useAnimals('http://localhost:8000/api/animals/');
    const [filteredAnimals, setFilteredAnimals] = useState([]);

    const [diet, setDiet] = useState(new Set());
    const [places, setPlaces] = useState(new Set());

    const handleDiet = (diet) => {
        setDiet(prevDiets => {
            const newDiets = new Set(prevDiets);
            if (newDiets.has(diet)) {
                newDiets.delete(diet);
            } else {
                newDiets.add(diet);
            }
            return newDiets;
        });
    };

    const handlePlace = (place) => {
        setPlaces(prevPlaces => {
            const newPlaces = new Set(prevPlaces);
            if (newPlaces.has(place)) {
                newPlaces.delete(place);
            } else {
                newPlaces.add(place);
            }
            return newPlaces;
        });
    };

    useEffect(() => {
        if (!isLoading && animals) {
            const animalList = animals.results || animals; // Ensure we get the array of animals
            console.log("Animal List:", animalList);
            console.log("Selected Diets:", diet);
            console.log("Selected Places:", places);

            const normalizedPlaces = new Set([...places].map(place => place.toLowerCase().trim()));
            const normalizedDiets = new Set([...diet].map(d => d.toLowerCase().trim()));

            if (diet.size === 0 && places.size === 0) {
                setFilteredAnimals(animalList);
            } else {
                const filtered = animalList.filter(animal => {
                    console.log("Animal:", animal);  // Log entire animal object
                    const dietMatch = diet.size === 0 || (animal.diet && normalizedDiets.has(animal.diet.toLowerCase().trim()));
                    const placeMatch = places.size === 0 || (animal.location && normalizedPlaces.has(animal.location.toLowerCase().trim()));
                    console.log(`Animal: ${animal.name}, Diet: ${animal.diet}, Location: ${animal.location}, Diet Match: ${dietMatch}, Place Match: ${placeMatch}`);
                    return dietMatch && placeMatch;
                });
                setFilteredAnimals(filtered);
            }
        }
    }, [diet, places, animals, isLoading]);

    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filteredAnimals));
    }, [filteredAnimals]);

    useEffect(() => {
        console.log("Filtered Animals:", filteredAnimals);
    }, [filteredAnimals]);

    return (
        <div className={"container"}>
            <SearchComponent handleDiet={handleDiet} handlePlace={handlePlace} />
            <div>
                <div className={"loader"}>
                    <div className={"animals"}>
                        {Array.isArray(filteredAnimals) && filteredAnimals.map(animal => (
                            <div className={'animal'} key={animal.id}>
                                <Link to={`/encyclopedia/animal/${animal.id}`}>{animal.name}</Link>
                                <span><b>Species: </b>{animal.species}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

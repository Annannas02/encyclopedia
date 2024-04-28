import React, {useEffect, useState} from 'react';
import {useAnimals} from "../api/useAnimals.js";

const SearchComponent = ({handleDiet,handlePlace}) => {


    return (
        <div className={"search_container"}>
            <h3>Filter</h3>
            <p>By Diet</p>
            <div>
                <input type={"checkbox"} name={"herbivore"} onChange={() => handleDiet("Herbivore")}/>
                <label htmlFor={"herbivore"}>Herbivore</label>
            </div>
            <div>
                <input type={"checkbox"} name={"carnivore"} onChange={() => handleDiet("Carnivore")}/>
                <label htmlFor={"carnivore"}>Carnivore</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Insectivore"} onChange={() => handleDiet("Insectivore")}/>
                <label htmlFor={"Insectivore"}>Insectivore</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Omnivore"} onChange={() => handleDiet("Omnivore")}/>
                <label htmlFor={"Omnivore"}>Omnivore</label>
            </div>

            <p>By Place of found</p>
            <div>
                <input type={"checkbox"} name={"Africa"} onChange={() => handlePlace("Africa")}/>
                <label htmlFor={"herbivore"}>Africa</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Asia"} onChange={() => handlePlace("Asia")}/>
                <label htmlFor={"Asia"}>Asia</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Australia"} onChange={() => handlePlace("Australia")}/>
                <label htmlFor={"Australia"}>Australia</label>
            </div>
            <div>
                <input type={"checkbox"} name={"America"} onChange={() => handlePlace("America")}/>
                <label htmlFor={"America"}>America</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Europe"} onChange={() => handlePlace("Europe")}/>
                <label htmlFor={"Europe"}>Europe</label>
            </div>
            <div>
                <input type={"checkbox"} name={"Arctic"} onChange={() => handlePlace("Arctic")}/>
                <label htmlFor={"Arctic"}>Arctic</label>
            </div>
        </div>
    )
}

export default SearchComponent;
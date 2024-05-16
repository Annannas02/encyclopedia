// useAnimals.js
import { useEffect, useState } from "react";

export const useAnimals = (url) => {
    const [animals, setAnimals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                setAnimals(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    return { isLoading, animals };
};

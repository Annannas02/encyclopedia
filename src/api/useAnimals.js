// useAnimals.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from './utils';  // Adjust the path as necessary

export const useAnimals = (url) => {
    const [animals, setAnimals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let token = localStorage.getItem('accessToken');
                let response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 401) {
                    const refreshed = await refreshToken();
                    if (refreshed) {
                        token = localStorage.getItem('accessToken');
                        response = await fetch(url, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                    } else {
                        navigate('/login');
                    }
                }
                if (response.ok) {
                    const data = await response.json();
                    setAnimals(data);
                } else {
                    console.error('Failed to fetch animals:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url, navigate]);

    return { isLoading, animals };
};

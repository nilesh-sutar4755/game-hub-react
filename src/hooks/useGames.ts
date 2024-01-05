import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { AxiosError, CanceledError } from 'axios';

export interface Game {
    id: number;
    name: string;
    background_image: string;
}

interface FetchGameResponse {
    count: number;
    results: Game[];
}
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const fetchGames = async () => {
            try {
                const res = await apiClient.get<FetchGameResponse>("/games", {
                    signal: controller.signal
                });
                setGames(res.data.results);
            } catch (error) {
                if (error instanceof CanceledError) return;
                setError((error as AxiosError).message);
            };
        };
        fetchGames();
        return () => controller.abort()
    }, []);
    return { error, games }
}

export default useGames;
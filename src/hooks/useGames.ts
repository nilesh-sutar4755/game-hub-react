import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { AxiosError, CanceledError } from 'axios';

export interface Platform {
    id: number;
    name: string;
    slug: string;
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
}

interface FetchGameResponse {
    count: number;
    results: Game[];
}
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        const fetchGames = async () => {
            try {
                const res = await apiClient.get<FetchGameResponse>("/games", {
                    signal: controller.signal
                });
                setGames(res.data.results);
                setLoading(false);
            } catch (error) {
                if (error instanceof CanceledError) return;
                setError((error as AxiosError).message);
                setLoading(false);
            } finally {
            }
        };
        fetchGames();
        return () => controller.abort()
    }, []);
    return { error, games, isLoading }
}

export default useGames;
import React, { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { AxiosError, CanceledError } from 'axios';

export interface Genre {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
}

interface FetchGameResponse {
    count: number;
    results: Genre[]
}

const userGenres = () => {
    const [genres, setGenres] = useState<Genre[]>();
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        const getGenres = async () => {
            try {
                const res = await apiClient.get<FetchGameResponse>("/genres", {
                    signal: controller.signal
                });
                setGenres(res.data.results);
                setLoading(false);
            } catch (error) {
                if (error instanceof CanceledError) return;
                setError((error as AxiosError).message);
                setLoading(false);
            }
        }
        getGenres();
        return () => controller.abort()
    }, [])
    return { genres, error, isLoading }
}

export default userGenres
import { useState, useEffect, useMemo } from "react";
import {usePokemonStore} from "../stores/usePokemonStore.ts";

export const usePokemon = () => {
    const {
        list,
        loading,
        error,
        lastFetched,
        // getPokemonList,
        getMultiplePokemon,
        clearError,
        clearPokemon
    } = usePokemonStore();

    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => {
            setNow(Date.now());
        }, 60_000);

        return () => clearInterval(id);
    }, []);

    const computedValues = useMemo(() => {
        const isStale =
            lastFetched != null
                ? now - lastFetched > 5 * 60 * 1000
                : true;

        return {
            hasPokemon: list.length > 0,
            pokemonCount: list.length,
            isStale,
            // getPokemonById: (id: number) => list.find(p => p.id === id),
        };
    }, [now, list, lastFetched]);

    return {
        pokemon: list,
        isLoading: loading,
        error,
        lastFetched,
        // fetchPokemon: getPokemonList,
        fetchMultiplePokemon: getMultiplePokemon,
        clearError,
        clearPokemon,
        ...computedValues
    };
};

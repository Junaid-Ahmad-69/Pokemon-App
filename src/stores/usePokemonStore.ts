import {create} from "zustand";
import type {IPokemon} from "../utils/types";
import {fetchMultiplePokemon, getPokemon} from "../api/pokemon.service.ts";

interface PokemonState {
    list: IPokemon[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;

    // getPokemonList: () => Promise<void>;
    clearError: () => void;
    getMultiplePokemon: (ids: number[]) => Promise<void>;
    clearPokemon: () => void;
}

export const usePokemonStore = create<PokemonState>()(
        (set, get) => ({
            list: [],
            loading: false,
            error: null,
            lastFetched: null,

            getPokemonList: async () => {
                if (get().loading) return;

                set({loading: true, error: null});

                try {
                    const response = await getPokemon();
                    const singlePokemon = response.data;

                    set((state) => ({
                        ...state,
                        list: [...state.list, singlePokemon],
                        loading: false,
                        lastFetched: Date.now(),
                        error: null,
                    }));
                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Failed to fetch Pokémon';

                    set((state) => ({
                        ...state,
                        error: errorMessage,
                        loading: false,
                    }));
                }
            },

            getMultiplePokemon: async (ids: number[]) => {
                if (get().loading) return;
                set({loading: true, error: null});
                try {
                    const pokemonList = await fetchMultiplePokemon(ids);
                    set((state) => {
                        const existingIds = new Set(state.list.map((p) => p.id));
                        const newPokemon = pokemonList.filter((p) => !existingIds.has(p.id));

                        return {
                            list: [...state.list, ...newPokemon],
                            loading: false,
                            lastFetched: Date.now(),
                            error: null,
                        };
                    });
                } catch (err) {
                    const errorMessage = err instanceof Error
                        ? err.message : "Failed to fetch multiple Pokémon";
                    set({
                        error: errorMessage,
                        loading: false,
                    });
                }
            },

            clearError: () => set((state) => ({
                ...state,
                error: null,
            })),

            clearPokemon: () => set((state) => ({
                ...state,
                list: [],
                lastFetched: null,
            })),
        }),

);
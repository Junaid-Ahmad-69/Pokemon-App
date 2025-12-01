import type {ApiResponse, IPokemon} from "../utils/types.ts";
import {apiClient} from "../hooks/axios-interceptor.ts";


export const getPokemon = async (id: number = 1): Promise<ApiResponse<IPokemon>> => {
    const response = await apiClient.get(`/pokemon/${id}`);
    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
    };
};

export const fetchMultiplePokemon = async (ids: number[]): Promise<IPokemon[]> => {
    const promises = ids.map(id => getPokemon(id));
    const results = await Promise.allSettled(promises)

    return results
        .filter((result): result is PromiseFulfilledResult<ApiResponse<IPokemon>> =>
            result.status === 'fulfilled'
        )
        .map(result => result.value.data);
};
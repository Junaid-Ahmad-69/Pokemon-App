import {useEffect, useState} from "react";
import {usePokemon} from "./hooks/usePokemon.ts";
import GCard from "./components/GCard";

function App() {
    const {
        pokemon,
        isLoading,
        error,
        fetchMultiplePokemon,
        hasPokemon
    } = usePokemon();

    const [multiplePokemon, setMultiplePokemon] = useState<number[]>(Array.from({length: 20}, (_, i) => i + 1));

    const handleLoadMore = () => {
        const nextIds = Array.from(
            {length: 20},
            (_, i) => multiplePokemon.length + i + 1
        );
        setMultiplePokemon(prev => [...prev, ...nextIds]);
        fetchMultiplePokemon(nextIds);

    };

    useEffect(() => {
        if (!hasPokemon) {
            fetchMultiplePokemon(multiplePokemon);
        }
    }, []);

    if (error) return <div>Error: {error}</div>;
    return (
        <>
            <h1 className='font-bold text-yellow-600 text-3xl text-center my-8 '>Pokemon </h1>
            <div className="container mx-auto">
                <div className='grid grid-cols-4 gap-10 '>
                    {pokemon.map(item => <div key={item.id}><GCard pokemon={item}/></div>)}
                </div>
                <div className='flex items-center justify-center'>
                    <button type="submit"
                            disabled={isLoading}
                            className="cursor-pointer border text-yellow-600 py-2 px-8 hover:bg-yellow-400 hover:text-white transition-all ease-in-out duration-300 rounded-md text-xl  border-yellow-400 my-8"
                            onClick={handleLoadMore}>{`${isLoading ? 'Loading...' : 'Load more'} `}
                    </button>
                </div>
            </div>
        </>
    )
}

export default App

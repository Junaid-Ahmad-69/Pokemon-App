import type {IPokemon} from "../../utils/types.ts";
import {Capitalize} from "../../utils/helpers.ts";

interface GCardProps {
    pokemon: IPokemon;
}

const GCard = ({ pokemon }: GCardProps) => {
    return (
        <article
            role="button"
            key={pokemon.id}
            className="max-w-sm w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
        >
            <header className="flex items-center gap-4">
                <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
                    {pokemon.sprites?.front_default ? (
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                        />
                    ) : (
                        <div className="text-xs text-gray-400">No image</div>
                    )}
                </div>


                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{Capitalize(pokemon.name)}</h3>
                    <p className="text-sm text-gray-500">#{String(pokemon.id).padStart(3, "0")}</p>


                    <div className="mt-2 flex flex-wrap gap-2">
                        {pokemon.types?.map((t) => (
                            <span
                                key={t.slot}
                                className="text-xs px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-800"
                            >
                            {Capitalize(t.type.name)}
                            </span>
                        ))}
                    </div>
                </div>
            </header>


            <section className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                    <div className="text-xs text-gray-400">Height</div>
                    <div className="font-medium">{pokemon.height ?? "-"}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-xs text-gray-400">Weight</div>
                    <div className="font-medium">{pokemon.weight ?? "-"}</div>
                </div>


                <div className="col-span-2">
                    <div className="text-xs text-gray-400">Abilities</div>
                    <div className="mt-1 flex gap-2 flex-wrap">
                        {pokemon.abilities?.map((a) => (
                            <span key={a.ability.name} className="text-xs px-2 py-1 rounded bg-gray-100 border">
                                {Capitalize(a.ability.name)}
                            </span>
                        ))}
                    </div>
                </div>
            </section>


            {pokemon.stats && (
                <footer className="mt-4 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-2">Base Stats</div>
                    <div className="flex flex-col gap-2">
                        {pokemon.stats.map((s) => (
                            <div key={s.stat.name} className="flex items-center gap-3">
                                <div className="flex-1 text-sm">{(s.stat.name)}</div>
                                <div className="w-24 relative bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="absolute bg-purple-300 left-0 top-0 h-full rounded-full"
                                        style={{width: `${Math.min(100, (s.base_stat / 255) * 100)}%`}}
                                        aria-hidden
                                    />
                                </div>
                                <div className="w-8 text-right text-xs">{s.base_stat}</div>
                            </div>
                        ))}
                    </div>
                </footer>
            )}
        </article>
    )
}
export default GCard;
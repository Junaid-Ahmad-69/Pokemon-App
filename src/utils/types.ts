export interface IPokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number | null;
    weight: number | null;

    abilities: AbilitySlot[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;

    moves: MoveSlot[];

    past_abilities: never[];
    past_types: never[];

    species: NamedAPIResource;

    sprites: PokemonSprites;

    cries: {
        latest: string;
        legacy: string;
    };
    types: type[];
    stats: stat[]

}

export interface AbilitySlot {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface HeldItem {
    item: NamedAPIResource;
    version_details: HeldItemVersion[];
}

export interface HeldItemVersion {
    rarity: number;
    version: NamedAPIResource;
}

export interface MoveSlot {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
}


export interface type {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface PokemonSprites {
    front_default?: string;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;

    other?: {
        dream_world?: SpriteResource;
        home?: SpriteResource;
        "official-artwork"?: SpriteResource;
    };

    versions?: never;
}

export interface SpriteResource {
    front_default?: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}
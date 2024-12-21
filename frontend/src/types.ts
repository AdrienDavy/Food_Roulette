export type AdType = {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    picture: string;
    owner: string;
    category: SeasonType | CategoryHeaderType;
    createdAt: string;
    tags?: TagType[];
};

export type SeasonType = {
    id: number;
    seasonName: string;

};

export type CategoryHeaderType = {
    id: number;
    name: string;
};


export type TagType = {
    id: number;
    name: string;
};


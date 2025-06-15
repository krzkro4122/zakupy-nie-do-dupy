export type Id = string;

export interface Identifiable {
    id: Id;
}

export interface TimeTracked {
    created: string;
    updated: string;
}

export interface UserTracked {
    user: Id;
}

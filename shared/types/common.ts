import { UUID } from "crypto";

export interface Identifiable {
    id: UUID;
}

export interface TimeTracked {
    created: string;
    updated: string;
}

export interface UserTracked {
    userId: UUID;
}

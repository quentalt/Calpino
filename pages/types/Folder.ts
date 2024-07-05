import {Note} from "@/pages/types/note";

export interface Folder {
    id: string;
    name: string;
    notes: Note[];
}

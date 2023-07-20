import {OkeiDto} from "../dtos/OkeiDto";

export interface IOkeiState {
    allOkeis: Array<OkeiDto>;
    getAllOkeisStatus: 'idle' | 'loading' | 'failed';
}
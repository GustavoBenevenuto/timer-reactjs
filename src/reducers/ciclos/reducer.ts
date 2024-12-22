import { produce } from "immer";
import { ActionTypesEnum } from "./actions";

export interface ICiclo {
    id: string;
    task: string;
    minutes: number;
    dataInicial: Date;
    dataInterrompida?: Date;
    dataConcluida?: Date;
}

interface ICiclosState {
    ciclos: ICiclo[];
    idCicloAtivo: string | null;
}

export function ciclosReducer(state: ICiclosState, action: any) {
    switch (action.type) {
        case ActionTypesEnum.ADD_NOVO_CICLO: {
            // return {
            //     ...state,
            //     idCicloAtivo: action.payload.novoCiclo.id,
            //     ciclos: [...state.ciclos, action.payload.novoCiclo]
            // }
            return produce(state, draft => {
                draft.ciclos.push(action.payload.novoCiclo)
                draft.idCicloAtivo = action.payload.novoCiclo.id
            })
        }
        case ActionTypesEnum.PARAR_CICLO: {
            // return {
            //     ...state,
            //     idCicloAtivo: null,
            //     ciclos: state.ciclos.map((ciclo) => {
            //         if (ciclo.id === state.idCicloAtivo) {
            //             return { ...ciclo, dataInterrompida: new Date() }
            //         } else {
            //             return ciclo
            //         }
            //     }),
            // }
            return produce(state, draft => {
                draft.idCicloAtivo = null
                const indexCiclo = draft.ciclos.findIndex(cicloItem => cicloItem.id == state.idCicloAtivo)
                if(indexCiclo < 0) {
                    return state
                }
                draft.ciclos[indexCiclo].dataInterrompida = new Date()
            })
        }
        case ActionTypesEnum.FINALIZA_CICLO_ATUAL: {
            // return {
            //     ...state,
            //     idCicloAtivo: null,
            //     ciclos: state.ciclos.map((ciclo) => {
            //         if (ciclo.id === state.idCicloAtivo) {
            //             return { ...ciclo, dataConcluida: new Date() }
            //         } else {
            //             return ciclo
            //         }
            //     }),
            // }
            return produce(state, draft => {
                draft.idCicloAtivo = null
                const indexCiclo = draft.ciclos.findIndex(cicloItem => cicloItem.id == state.idCicloAtivo)
                if(indexCiclo < 0) {
                    return state
                }
                draft.ciclos[indexCiclo].dataConcluida = new Date()
            })
        }
        default: {
            return state
        }
    }

    return state
}
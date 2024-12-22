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

export enum ActionTypesEnum {
    ADD_NOVO_CICLO = 'ADD_NOVO_CICLO',
    PARAR_CICLO = 'PARAR_CICLO',
    FINALIZA_CICLO_ATUAL = 'FINALIZA_CICLO_ATUAL',
}

export function ciclosReducer(state: ICiclosState, action: any) {
    switch (action.type) {
        case ActionTypesEnum.ADD_NOVO_CICLO: {
            return {
                ...state,
                idCicloAtivo: action.payload.novoCiclo.id,
                ciclos: [...state.ciclos, action.payload.novoCiclo]
            }
        }
        case ActionTypesEnum.PARAR_CICLO: {
            return {
                ...state,
                idCicloAtivo: null,
                ciclos: state.ciclos.map((ciclo) => {
                    if (ciclo.id === state.idCicloAtivo) {
                        return { ...ciclo, dataInterrompida: new Date() }
                    } else {
                        return ciclo
                    }
                }),
            }
        }
        case ActionTypesEnum.FINALIZA_CICLO_ATUAL: {
            return {
                ...state,
                idCicloAtivo: null,
                ciclos: state.ciclos.map((ciclo) => {
                    if (ciclo.id === state.idCicloAtivo) {
                        return { ...ciclo, dataConcluida: new Date() }
                    } else {
                        return ciclo
                    }
                }),
            }
        }
        default: {
            return state
        }
    }

    return state
}
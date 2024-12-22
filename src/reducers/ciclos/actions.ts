import { ICiclo } from "./reducer";

export enum ActionTypesEnum {
    ADD_NOVO_CICLO = 'ADD_NOVO_CICLO',
    PARAR_CICLO = 'PARAR_CICLO',
    FINALIZA_CICLO_ATUAL = 'FINALIZA_CICLO_ATUAL',
}

export function addNovoCicloAction(novoCiclo: ICiclo) {
    return {
        type: ActionTypesEnum.ADD_NOVO_CICLO,
        payload: {
            novoCiclo
        }
    }
}

export function pararCicloAction() {
    return {
        type: ActionTypesEnum.PARAR_CICLO,
    }
}

export function finalizaCicloAction() {
    return {
        type: ActionTypesEnum.FINALIZA_CICLO_ATUAL,
    }
}
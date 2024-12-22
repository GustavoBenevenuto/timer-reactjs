import React, { createContext, useReducer, useState } from "react";
import { ciclosReducer, ICiclo } from "../reducers/ciclos/reducer";
import { ActionTypesEnum, addNovoCicloAction, finalizaCicloAction, pararCicloAction } from "../reducers/ciclos/actions";

interface ICriaCiclo {
    task: string;
    minutes: number;
}

interface ICicloContext {
    ciclos: ICiclo[]
    cicloAtivo: ICiclo | undefined
    idCicloAtivo: string | null
    segundosPassados: number
    finalizaCicloAtual: () => void
    setSegPassados: (segundo: number) => void
    criarNovoCiclo: (form: any) => void
    pararCiclo: () => void
}

interface ICicloContextProviderProps {
    children: React.ReactNode
}

export const CicloContext = createContext<ICicloContext>({} as ICicloContext)

export function CicloContextProvider({ children }: ICicloContextProviderProps) {

    const [ciclosState, dispatch] = useReducer( ciclosReducer, {
        ciclos: [],
        idCicloAtivo: null
    })

    const [segundosPassados, setSegundosPassados] = useState<number>(0)

    const { ciclos, idCicloAtivo } = ciclosState

    const cicloAtivo = ciclos.find(ciclo => ciclo.id == idCicloAtivo)

    function setSegPassados(segundo: number) {
        setSegundosPassados(segundo)
    }

    function criarNovoCiclo(form: ICriaCiclo) {
        const novoCiclo: ICiclo = {
            id: String(new Date().getTime()),
            minutes: form.minutes,
            task: form.task,
            dataInicial: new Date(),
        }
        dispatch(addNovoCicloAction(novoCiclo))
        setSegundosPassados(0)
    }

    function pararCiclo() {
        dispatch(pararCicloAction())
    }

    function finalizaCicloAtual() {
        dispatch(finalizaCicloAction())
    }

    return (
        <CicloContext.Provider value={{
            ciclos,
            cicloAtivo,
            idCicloAtivo,
            segundosPassados,
            finalizaCicloAtual,
            setSegPassados,
            criarNovoCiclo,
            pararCiclo
        }}>
            {children}
        </CicloContext.Provider>
    )
}
import React, { createContext, useReducer, useState } from "react";

interface ICiclo {
    id: string;
    task: string;
    minutes: number;
    dataInicial: Date;
    dataInterrompida?: Date;
    dataConcluida?: Date;
}

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

interface ICiclosState {
    ciclos: ICiclo[];
    idCicloAtivo: string | null;
}

export const CicloContext = createContext<ICicloContext>({} as ICicloContext)

export function CicloContextProvider({ children }: ICicloContextProviderProps) {

    const [ciclosState, dispatch] = useReducer((state: ICiclosState, action: any) => {
        switch (action.type) {
            case 'ADD_NOVO_CICLO': {
                return {
                    ...state,
                    idCicloAtivo: action.payload.novoCiclo.id,
                    ciclos: [...state.ciclos, action.payload.novoCiclo]
                }
            }
            case 'PARAR_CICLO': {
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
            case 'FINALIZA_CICLO_ATUAL': {
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
    }, {
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
        dispatch({
            type: 'ADD_NOVO_CICLO',
            payload: {
                novoCiclo
            }
        })
        setSegundosPassados(0)
    }

    function pararCiclo() {
        dispatch({
            type: 'PARAR_CICLO',
            payload: {
                idCicloAtivo
            }
        })
    }

    function finalizaCicloAtual() {
        dispatch({
            type: 'FINALIZA_CICLO_ATUAL',
            payload: {
                idCicloAtivo
            }
        })
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
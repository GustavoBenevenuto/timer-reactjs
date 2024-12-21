import React, { createContext, useState } from "react";

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

export const CicloContext = createContext<ICicloContext>({} as ICicloContext)

export function CicloContextProvider({children}: ICicloContextProviderProps) {

    const [ciclos, setCiclos] = useState<ICiclo[]>([])
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null)
    const [segundosPassados, setSegundosPassados] = useState<number>(0)

    const cicloAtivo = ciclos.find(ciclo => ciclo.id == idCicloAtivo)

    function setSegPassados(segundo: number) {
        setSegundosPassados(segundo)
    }

    function finalizaCicloAtual() {
        setCiclos((state) =>
            state.map((ciclo) => {
                if (ciclo.id === idCicloAtivo) {
                    return { ...ciclo, dataConcluida: new Date() }
                } else {
                    return ciclo
                }
            }),
        )
    }

    function criarNovoCiclo(form: ICriaCiclo) {
        const novoCiclo: ICiclo = {
            id: String(new Date().getTime()),
            minutes: form.minutes,
            task: form.task,
            dataInicial: new Date(),
        }
        setCiclos(prev => [...prev, novoCiclo])
        setIdCicloAtivo(novoCiclo.id)
        setSegundosPassados(0)
    }

    function pararCiclo() {
        setCiclos(
            ciclos.map((ciclo) => {
                if (ciclo.id === idCicloAtivo) {
                    return { ...ciclo, dataInterrompida: new Date() }
                } else {
                    return ciclo
                }
            }),
        )
        setIdCicloAtivo(null)
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
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NovoCicloForm } from "./components/NovoCicloForm";
import { Countdown } from "./components/Countdown";

interface ICiclo {
    id: string;
    task: string;
    minutes: number;
    dataInicial: Date;
    dataInterrompida?: Date;
    dataConcluida?: Date;
}

const validacaoSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type TypeValidacaoSchema = zod.infer<typeof validacaoSchema>

interface ICicloContext {
    cicloAtivo: ICiclo | undefined
    idCicloAtivo: string | null
    finalizaCicloAtual: () => void
    segundosPassados: number
    setSegPassados: (segundo: number) => void
}

export const CicloContext = createContext<ICicloContext>({} as ICicloContext)

export function Home() {
    const [ciclos, setCiclos] = useState<ICiclo[]>([])
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null)
    const [segundosPassados, setSegundosPassados] = useState<number>(0)

    function setSegPassados(segundo: number){
        setSegundosPassados(segundo)
    }

    const cicloForm = useForm<TypeValidacaoSchema>({
        resolver: zodResolver(validacaoSchema),
        defaultValues: {
            minutes: 0,
            task: ''
        }
    })

    const { reset, watch, handleSubmit } = cicloForm

    const cicloAtivo = ciclos.find(ciclo => ciclo.id == idCicloAtivo)

    function finalizaCicloAtual(){
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

    function salvar(form: TypeValidacaoSchema) {
        const novoCiclo: ICiclo = {
            id: String(new Date().getTime()),
            minutes: form.minutes,
            task: form.task,
            dataInicial: new Date(),
        }
        reset()

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
        <HomeContainer>
            <form onSubmit={handleSubmit(salvar)}>
                <CicloContext.Provider value={{ cicloAtivo, idCicloAtivo, finalizaCicloAtual, segundosPassados, setSegPassados }}>
                    <FormProvider {...cicloForm}>
                        <NovoCicloForm />
                    </FormProvider>
                    <Countdown />
                </CicloContext.Provider>

                {cicloAtivo ?
                    <StopButton type="button" onClick={pararCiclo}>
                        <HandPalm size={24} />
                        Parar
                    </StopButton>
                    :
                    <StartButton type="submit" disabled={!watch('task')}>
                        <Play size={24} />
                        Começar
                    </StartButton>
                }
            </form>
        </HomeContainer>
    )
}
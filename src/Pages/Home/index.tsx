import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartButton, StopButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const validacaoSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type TypeValidacaoSchema = zod.infer<typeof validacaoSchema>

interface ICiclo {
    id: string;
    task: string;
    minutes: number;
    dataInicial: Date;
    dataInterrompida?: Date;
    dataConcluida?: Date;
}

export function Home() {
    const [ciclos, setCiclos] = useState<ICiclo[]>([])
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null)
    const [segundosPassados, setSegundosPassados] = useState<number>(0)

    const { register, handleSubmit, watch, formState, reset } = useForm<TypeValidacaoSchema>({
        resolver: zodResolver(validacaoSchema),
        defaultValues: {
            minutes: 0,
            task: ''
        }
    })

    const cicloAtivo = ciclos.find(ciclo => ciclo.id == idCicloAtivo)
    const totalSegundos = cicloAtivo ? cicloAtivo.minutes * 60 : 0

    useEffect(() => {
        let intervalo: number
        if (cicloAtivo) {
            intervalo = setInterval(() => {
                const diferencaSegundos = differenceInSeconds(
                    new Date(),
                    cicloAtivo.dataInicial,
                )
                if (diferencaSegundos >= totalSegundos) {
                    setCiclos((state) =>
                        state.map((ciclo) => {
                            if (ciclo.id === idCicloAtivo) {
                                return { ...ciclo, dataConcluida: new Date() }
                            } else {
                                return ciclo
                            }
                        }),
                    )
                    setSegundosPassados(totalSegundos)
                    clearInterval(intervalo)
                } else {
                    setSegundosPassados(diferencaSegundos)
                }
            }, 1000)
        }

        return () => {
            clearInterval(intervalo)
        }
    }, [cicloAtivo, totalSegundos, idCicloAtivo])

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

    const segundosAtuais = cicloAtivo ? totalSegundos - segundosPassados : 0
    const qtdMinutos = Math.floor(segundosAtuais / 60)
    const qtdSegundos = segundosAtuais % 60
    const minutos = String(qtdMinutos).padStart(2, '0')
    const segundos = String(qtdSegundos).padStart(2, '0')

    useEffect(() => {
        if (cicloAtivo) {
            document.title = `${minutos}:${segundos}`
        }
    }, [minutos, segundos, cicloAtivo])

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(salvar)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="sugestao-task"
                        disabled={!!cicloAtivo}
                        {...register('task')}
                    />
                    <datalist id="sugestao-task">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Corrida" />
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step="5"
                        min="5"
                        max="60"
                        disabled={!!cicloAtivo}
                        {...register('minutes', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutos[0]}</span>
                    <span>{minutos[1]}</span>
                    <Separator>:</Separator>
                    <span>{segundos[0]}</span>
                    <span>{segundos[1]}</span>
                </CountdownContainer>
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
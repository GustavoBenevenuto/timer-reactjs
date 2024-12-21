import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const validacaoSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export function Home() {
    const { register, handleSubmit, watch, formState } = useForm({
        resolver: zodResolver(validacaoSchema),
    })

    function salvar(form: any) {
        console.log({ form })
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(salvar)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="sugestao-task"
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
                        {...register('minutes', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartButton type="submit" disabled={!watch('task')}>
                    <Play size={24} />
                    Começar
                </StartButton>
            </form>
        </HomeContainer>
    )
}
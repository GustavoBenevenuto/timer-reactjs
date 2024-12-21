import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NovoCicloForm } from "./components/NovoCicloForm";
import { Countdown } from "./components/Countdown";
import { CicloContext } from "../../context/CicloContext";

const validacaoSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type TypeValidacaoSchema = zod.infer<typeof validacaoSchema>

export function Home() {
    const { cicloAtivo, pararCiclo, criarNovoCiclo } = useContext(CicloContext)

    const cicloForm = useForm<TypeValidacaoSchema>({
        resolver: zodResolver(validacaoSchema),
        defaultValues: {
            minutes: 0,
            task: ''
        }
    })

    const { reset, watch, handleSubmit } = cicloForm

    function criarCiclo(form: TypeValidacaoSchema) {
        criarNovoCiclo(form)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(criarCiclo)}>
                <FormProvider {...cicloForm}>
                    <NovoCicloForm />
                </FormProvider>
                <Countdown />

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
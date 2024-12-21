import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="sugestao-task"
                    />
                    <datalist id="sugestao-task">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Corrida"/>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step="5"
                        min="5"
                        max="60"
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
                <StartButton type="submit">
                    <Play size={24} />
                    Começar
                </StartButton>
            </form>
        </HomeContainer>
    )
}
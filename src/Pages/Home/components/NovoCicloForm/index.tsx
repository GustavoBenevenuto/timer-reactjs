import { FormContainer, MinutesInput, TaskInput } from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CicloContext } from '../../../../context/CicloContext';


export function NovoCicloForm() {
    const { cicloAtivo } = useContext(CicloContext)
    const { register } = useFormContext()
    
    return (
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
    );
}
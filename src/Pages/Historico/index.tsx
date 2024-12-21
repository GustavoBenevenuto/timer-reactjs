import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CicloContext } from '../../context/CicloContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function Historico() {
    const { ciclos } = useContext(CicloContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ciclos.map(ciclo => {
                            return (
                                <tr key={ciclo.id}>
                                    <td>{ciclo.task}</td>
                                    <td>{ciclo.minutes} minutos</td>
                                    <td>
                                        {formatDistanceToNow(ciclo.dataInicial, {
                                            addSuffix: true,
                                            locale: ptBR,
                                        })}
                                    </td>
                                    <td>
                                        {ciclo.dataConcluida && (
                                            <Status statusColor="verde">Concluído</Status>
                                        )}

                                        {ciclo.dataInterrompida && (
                                            <Status statusColor="vermelho">Interrompido</Status>
                                        )}

                                        {!ciclo.dataConcluida && !ciclo.dataInterrompida && (
                                            <Status statusColor="amarelo">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
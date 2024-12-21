import { useContext, useEffect, useState } from 'react';
import { CountdownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { CicloContext } from '../..';

interface ICountdownProps {}

export function Countdown({}: ICountdownProps) {
    const { cicloAtivo, idCicloAtivo, finalizaCicloAtual, segundosPassados, setSegPassados } = useContext(CicloContext)

    const totalSegundos = cicloAtivo ? cicloAtivo.minutes * 60 : 0

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

    useEffect(() => {
        let intervalo: number
        if (cicloAtivo) {
            intervalo = setInterval(() => {
                const diferencaSegundos = differenceInSeconds(
                    new Date(),
                    cicloAtivo.dataInicial,
                )
                if (diferencaSegundos >= totalSegundos) {
                    finalizaCicloAtual()
                    setSegPassados(totalSegundos)
                    clearInterval(intervalo)
                } else {
                    setSegPassados(diferencaSegundos)
                }
            }, 1000)
        }

        return () => {
            clearInterval(intervalo)
        }
    }, [cicloAtivo, totalSegundos, idCicloAtivo])

    return (
        <CountdownContainer>
            <span>{minutos[0]}</span>
            <span>{minutos[1]}</span>
            <Separator>:</Separator>
            <span>{segundos[0]}</span>
            <span>{segundos[1]}</span>
        </CountdownContainer>
    );
}
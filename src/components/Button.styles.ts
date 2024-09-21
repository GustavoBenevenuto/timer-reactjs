import styled, { css } from "styled-components";

export type ButtonVariant = 'primaria' | 'secundaria' | 'perigo' | 'sucesso';

interface ButtonContainerProps {
    variant: ButtonVariant;
}

const buttonVariants = {
    primaria: 'purple',
    secundaria: 'orange',
    perigo: 'red',
    sucesso: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background-color: ${props => props.theme.verde_500};
    color: ${props => props.theme.branco_01};
`;
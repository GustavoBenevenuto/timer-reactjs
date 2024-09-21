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
    ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]}
        `
    }}
`;
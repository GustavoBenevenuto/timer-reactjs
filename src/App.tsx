import { ThemeProvider } from "styled-components"
import { Button } from "./components/Button"
import { defaultTheme } from "./styles/themes/default"

function App() {

    return (
        <ThemeProvider theme={defaultTheme}>
            <h1>Hello World</h1>
            <>
                <Button variant="primaria" />
                <Button variant="secundaria" />
                <Button variant="sucesso" />
                <Button variant="perigo" />
                <Button />
            </>
        </ThemeProvider>
    )
}

export default App

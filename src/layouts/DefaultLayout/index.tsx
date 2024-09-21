import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout(){
    return (
        <LayoutContainer>
            <Header/>
            <Outlet/> {/* Insere o conteúdo no local */}
        </LayoutContainer>
    )
}
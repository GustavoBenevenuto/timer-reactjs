import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Historico } from "./Pages/Historico";
import { Erro } from "./Pages/Erro";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="" Component={Home} />
                <Route path="/historico" Component={Historico} />
                <Route path="*" Component={Erro} />
            </Route>
        </Routes>
    )
}
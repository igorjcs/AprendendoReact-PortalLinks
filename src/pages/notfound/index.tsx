import { Link } from "react-router-dom";

export function NotFound () {
    return (
        <div>
            <h1>Página não encontrada - 404</h1>
            <p>Você caiu em uma página que não existe!</p>

            <Link to="/">Voltar para a página inicial</Link>
        </div>
    )
}
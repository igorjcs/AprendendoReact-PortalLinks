// Página testando construção do copilot
import { Link, useNavigate } from 'react-router-dom';

export function NotFound1() {
    const navigate = useNavigate();

    return (
        <main
            className="min-h-screen flex items-center justify-center p-8 bg-[#0b1020] text-[#e6edf3]"
            aria-labelledby="notfound-title"
        >
            <section className="w-full max-w-xl text-center">
                <div className="text-6xl font-extrabold tracking-widest text-blue-400">404</div>
                <h1 id="notfound-title" className="mt-2 text-2xl font-bold">
                    Página não encontrada
                </h1>
                <p className="mt-1 mb-6 text-slate-400">
                    O caminho acessado não existe. Verifique o endereço ou volte para a página inicial.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 font-semibold text-[#e6edf3] hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Voltar
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Ir para a Home
                    </Link>
                </div>
            </section>
        </main>
    );
}
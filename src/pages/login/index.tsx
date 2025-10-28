import { Link, useNavigate } from "react-router-dom";
import { Input } from '../../components/input'
import { useState, type FormEvent } from "react";

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";


export function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (email === '' || password === '') {
            alert('Preencha todos os campos')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('Usuário logado com sucesso')
            navigate ('/admin', {replace: true})
        })
        .catch((error) => {
            console.log('Erro ao logar usuário', error)
        })

    }

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Link to='/'>
                <h1 className="mt-11 mb-7 text-white font-bold text-5xl">Dev
                    <span className="bg-linear-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
                        Link
                    </span>
                </h1>
            </Link>

            <form
             action=""
             className="w-full max-w-xl flex flex-col px-2"
             onSubmit={handleSubmit}
             >
                <Input
                    placeholder="Digite o seu email"
                    type="email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="**********"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                className="h-9 bg-yellow-600 rounded border-0 text-lg font-medium text-black"
                type='submit'>
                    Entrar
                </button>

            </form>
        </div>
    )
}
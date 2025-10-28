import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { auth } from '../../services/firebaseConnection';
import { signOut } from "firebase/auth";

export function Header() {

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="bg-white w-full h-12 flex items-center justify-between px-4 border border-gray-200 rounded-md">
                <div className="flex gap-4 font-bold">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/admin/social">Redes sociais</Link>
                </div>
                <button onClick={handleLogout}><BiLogOut size={28} color="red"/></button>
            </nav>
        </header>
    )
}
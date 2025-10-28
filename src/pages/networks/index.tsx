import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { useEffect, useState, type FormEvent } from "react";

import { db } from "../../services/firebaseConnection";
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

export function Networks() {
    const [facebookLink, setFacebookLink] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "socialLinks", "userLinks")
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setFacebookLink(snapshot.data()?.facebook);
                    setInstagramLink(snapshot.data()?.instagram);
                    setYoutubeLink(snapshot.data()?.youtube);
                }
            })
        }

        loadLinks();
    }, []);

    function handleRegister (e : FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "socialLinks", "userLinks"), {
            facebook: facebookLink,
            instagram: instagramLink,
            youtube: youtubeLink
        })
        .then(() => {
            alert("Links salvos com sucesso!");
            setFacebookLink("");
            setInstagramLink("");
            setYoutubeLink("");
        })
        .catch((error) => {
            alert("Erro ao salvar os links." + error);
            console.log("Erro ao salvar os links: ", error);
        });
    }

    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header />
            
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form 
            className="flex flex-col max-w-xl w-full"
            onSubmit={handleRegister}
            >            
                <label
                className="text-white font-medium mt-2 mb-2"
                >Link do Facebook</label>
                <Input
                placeholder="Digite a URL do Facebook"
                type="url"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                />

                <label
                className="text-white font-medium mt-2 mb-2"
                >Link do Instagram</label>
                <Input
                placeholder="Digite a URL do Instagram"
                type="url"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                />

                <label
                className="text-white font-medium mt-2 mb-2"
                >Link do Youtube</label>
                <Input
                placeholder="Digite a URL do Youtube"
                type="url"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                />

                <button
                type="submit"
                className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-bold"
                >
                Salvar
                </button>

            </form>

        </div>
    )
}
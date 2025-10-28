import { useState, type FormEvent, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { db } from '../../services/firebaseConnection';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc,
} from 'firebase/firestore';


import { Header } from "../../components/header";
import { Input } from "../../components/input";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    background: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect( () => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach( (doc) => {
                lista.push ( {
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    background: doc.data().background,
                    color: doc.data().color,
                })
            })
            setLinks(lista);
        })

        return ( () => {
            unsub();
        })

    }, [])
    
    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if(nameInput === "" || urlInput === ""){
            alert("Preencha todos os campos!");
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            background: backgroundColor,
            color: textColor,
            created: new Date(),
        })
        .then ( () => {
            setNameInput("");
            setUrlInput("");
            setBackgroundColor("#ffffff");
            setTextColor("#000000");
            console.log("Link cadastrado com sucesso!");
        })
        .catch ( (error) => {
            console.log("Erro ao cadastrar link: ", error);
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef)
        .then( () => {
            console.log("Link deletado com sucesso!");
        })
        .catch( (error) => {
            console.log("Erro ao deletar link: ", error);
        })
    }
    
    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl"
            onSubmit={handleRegister}
            >
                <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
                <Input
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={ (e) => setNameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">URL do link</label>
                <Input
                    type="url"
                    placeholder="Digite a URL do link..."
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                        <input 
                        type="color" 
                        value={backgroundColor}
                        onChange={ (e) => setBackgroundColor(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Texto do link</label>
                        <input 
                        type="color" 
                        value={textColor}
                        onChange={ (e) => setTextColor(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== "" && 
                <div className="flex flex-col items-center justify-start mb-7 p-1 border border-gray-100/25 rounded-md">
                    <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
                    <article 
                    className=" w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-2 hover:scale-105 transition-all"
                    style={ { marginBottom: 8, marginTop: 8, backgroundColor: backgroundColor} }
                    >
                        <p className="font-medium" style={{color:textColor}}>{nameInput}</p>
                    </article>
                </div>
                }

                <button 
                className="mb-7 bg-blue-500 h-9 rounded-md text-white font-bold hover:bg-blue-600 transition-colors gap-4 flex items-center justify-center"
                type="submit"
                >
                    Cadastrar
                </button>

            </form>

                <h2 className="font-bold text-white mb-4 text-2xl">
                    Meus links
                </h2>

                {links.map( (link) => (
                    <article 
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none font-bold"
                style={{ backgroundColor: link.background, color: link.color }}
                >
                    <p>{link.name}</p>
                    <button
                    className="border border-dashed p-1 rounded bg-black/20 hover:bg-red-500/80 transition-colors"
                    onClick={() => handleDeleteLink(link.id)}
                    >
                        <FiTrash size={18} color="#FF0000"/>
                    </button>
                </article>))}

        </div>
    )
}
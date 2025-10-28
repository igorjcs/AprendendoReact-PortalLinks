import {useState, useEffect} from 'react'
import { Social } from '../../components/social'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string;
    name: string;
    url: string;
    background: string;
    color: string;
}

interface SocialProps {
    facebook: string;
    instagram: string;
    youtube: string;
}

export function Home() {

    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialProps>()

    useEffect( () => {
        function loadLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queryRef)
            .then( (snapshot) => {
                let lista = [] as LinkProps[];

                snapshot.forEach( (doc) => {
                    lista.push( {
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        background: doc.data().background,
                        color: doc.data().color,
                    })
                })

                setLinks(lista);
            } )
            .catch( (error) => {
                console.log("Erro ao carregar links: ", error);
            } )
        }
        loadLinks();
    }, [])

    useEffect (() => {
        function loadSocialLinks() {
            const docRef = doc(db, "socialLinks", "userLinks")
            getDoc(docRef)
            .then ( (snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLinks( {
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                    } )
                }
        })
        }
        loadSocialLinks();
    }, [])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Igor Santana</h1>
            <span className="text-gray-400 mt-10 mb-10">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map ( (link) => (
                    <section 
                    style={{backgroundColor : link.background}}
                    key={link.id}
                    className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                    >
                    <a href={link.url} target="_blank">
                        <p 
                        className="md:text-lg text-base"
                        style={{color : link.color}}
                        >
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}


                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className='flex justify-center gap-3 my-4 '>
                    <Social url= {socialLinks?.youtube}>
                        <FaYoutube size={25} color='#FFF'/>
                    </Social>
                    <Social url= {socialLinks?.instagram}>
                        <FaInstagram size={25} color='#FFF'/>
                    </Social>
                    <Social url= {socialLinks?.facebook}>
                        <FaFacebook size={25} color='#FFF'/>
                    </Social>
                </footer>
                )}
            </main>

        </div>
    )
}
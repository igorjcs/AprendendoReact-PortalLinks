import type { ReactNode } from "react"


interface SocialProps{
    url: string,
    children: ReactNode
}

export function Social({ url, children } : SocialProps) {
    return (
        <a className="text-white transition-transform hover:scale-125 cursor-pointer" 
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        >
            {children}
        </a>
    )
}
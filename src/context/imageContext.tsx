import { ReactNode, createContext, useState } from "react";
import { createClient } from 'pexels'

interface ImagePrividerProps{
    children: ReactNode;
}

interface ImageContextData {
    getImage: (query: string) => Promise<string>
}

export const ImageContext = createContext({} as ImageContextData)

export function ImageProvider({ children }: ImagePrividerProps) {
    const client = createClient("MWNyFzuN6792T7OlDKAhITLNuuxjSSPcXKPdet1esrNGjaAFWocgUbKF")

    async function getImage(query: string){
        const image = await client.photos.search({ query });
        if (image.photos.length > 0) {
            return image.photos[0].src.original
        } else {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Floor-stone_02.JPG/1200px-Floor-stone_02.JPG"
        }
    }

    return(
        <ImageContext.Provider value={{ getImage }}>
            {children}
        </ImageContext.Provider>
    )
}
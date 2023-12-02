import './Home.css'
import{obtenerTokenSpotify} from '../services/serviciosSpotify.js'
import { obtenerCancionesTop } from '../services/servicioCanciones.js'
import { useEffect, useState } from 'react'


export function Home(){
    const[carga,setCarga] = useState(true)
    const[canciones, setCanciones] = useState(null)

    useEffect(function(){
        obtenerTokenSpotify()
        .then(function(respuestaToken){
            obtenerCancionesTop(respuestaToken)
            .then(function(respuestaCanciones){
                console.log(respuestaCanciones)
                setCarga(false)
                setCanciones(respuestaCanciones.tracks)
            })
        })
    },[])

    if(carga){
        return(
            <h2>Cargando...</h2>
        )
    }else{
        return(
            <>
                <section className="banner">

                </section>
                <section className='container'>
                    <div className="row row-cols-1 row-cols-md-5">
                        {
                            canciones.map(function(cancion){
                                return(
                                    <div className="col">
                                        <div className="card h-100 shadow">
                                            <h3>{cancion.name}</h3>
                                            <audio src={cancion.preview_url} controls class ></audio>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </section>
            </>
        )
    }


}
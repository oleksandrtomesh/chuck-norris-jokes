import { useEffect, useState } from 'react'

export const Joke = ({icon_url, value}) => {
    const [isLoad, setIsLoad] = useState(false)
    
    //effect to add class 'show-joke' after element was render
    useEffect(() => {
        const timeout = () => {
            setIsLoad(true)
        }
        setTimeout(timeout, 0)
        
        return () => clearTimeout(timeout)
    },[])

    return <section className={`joke ${isLoad && 'show-joke'}`} >
        <div className='joke__icon'>
            <img src={icon_url} alt='joke icon'></img>
        </div>
        <div className='joke__value'>
            <p>{value}</p>
        </div>
    </section>
}
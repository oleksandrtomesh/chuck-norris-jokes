import axios from 'axios'

export const getJokes = async () => {
    let jokes = []
    for(let i = 0; i < 10; i++){
        try{
            const joke = await axios.get('https://api.chucknorris.io/jokes/random')
            jokes.push(joke.data)
        } catch (e) {
            throw new Error(e)
        }
    }
    return jokes
}
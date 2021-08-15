import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Joke } from './components/Joke';
import Loader from 'react-loader-spinner';
import { getJokes } from './api/api';

function App() {
  
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(false)
  const [makeRequest, setMakeRequest] = useState(false)

  //ref to the last array element
  const observer = useRef()
  //add observer to the last el of array
  const lastJokeRef = useCallback(joke => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && !loading){
        setMakeRequest(m => !m)
      }
    })
    if(joke) observer.current.observe(joke)
  }, [loading])

  useEffect(() => {
      //get 10 random jokes()
      setLoading(true)
      getJokes().then(data => setJokes(prevJokes => {
        setLoading(false)
        return [...prevJokes, ...data]
      }))
  }, [makeRequest])


  return (
    <main className='container'>
        <div className='App'>
          <header className='title'>
            <h1>Chuck Norris Jokes</h1>
          </header>
          {jokes.map((joke, index) =>{
            if(jokes.length === index + 1){
              return <div key={joke.id} ref={lastJokeRef}>
                <Joke  {...joke}/>
              </div>
            } else{
              return <div key={joke.id}>
              <Joke  {...joke}/>
            </div>
            }
          } 
          )}
        </div>
        {loading && <Loader
            className='loader'
            type='ThreeDots'
            color='#808080'
            height={100}
            width={100}
          />
        }
      </main>
    
  );
}

export default App;

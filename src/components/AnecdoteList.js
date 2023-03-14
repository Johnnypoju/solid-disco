
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"




const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      console.log(state.filter)
      if (state.filter === ""){
        console.log("Filter empty")
        
        return state.anecdotes
      }
      else {
        const filteredAnecdotes = state.anecdotes.filter(anecdote => {
          return anecdote.content.toLowerCase().includes(state.filter)
        })
        return filteredAnecdotes  
      }
    })
    
    
    const vote = (content, id, votes) => {
        console.log('vote', id)
        dispatch(voteAnecdote(content, id, votes))
        dispatch(setNotification(`You voted for '${content}'`, 5000))
      }

    return (
    
    <div>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.content, anecdote.id, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList
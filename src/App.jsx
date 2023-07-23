import { useEffect, useRef, useState } from 'react'
import { ListUsers } from './components/ListUsers'
const API = 'https://randomuser.me/api/?results=100'

function App() {
  const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)
  const [sortCountry, setSortCountry] = useState(false)
  const orginalUsers = useRef([])

 useEffect(() => {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      setUsers(data.results)
      orginalUsers.current = data.results
    })
    .catch((error) => console.log(error))
 }, [])

  const toogleColors = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    setSortCountry(prevState => !prevState)
  }

  const sortedUsers = sortCountry
    ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : users

  const handleDelete = (uuid) => {
    const filteredUsers = users.filter((user, userUuid) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleResetUsers = () => {
    setUsers(orginalUsers.current)
  }
  
  return (
    <div className="App">
      <h1>User Table</h1>
      <header style={{display: 'flex', gap: '0.7rem', justifyContent: 'center'}}>
        <button onClick={toogleColors}>
          Pintar filas
        </button>
        <button onClick={toogleSortByCountry}>
          {
            sortCountry ? 'Orden Original' : 'Ordenar por Pais' 
          }
        </button>
        <button onClick={handleResetUsers}>
          Reset Users
        </button>
      </header>
      <main>
        <ListUsers deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App

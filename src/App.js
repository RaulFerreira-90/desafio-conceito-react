import React, { useState, useEffect } from 'react'
import api from './services/api'

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
}, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio ${Date.now()}`,
      url: `https://github.com/RaulFerreira-90/Repositorio-${Date.now()}`,
      techs: [ 'NodeJS', 'ReactJS']
    });

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
        
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <span>
        <h1>Repositories</h1>

        <button onClick={handleAddRepository}>Adicionar</button>
      </span>
  
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>
          {repository.title}<br/><button 
          onClick={() => handleRemoveRepository(repository.id)}>
          Remover
        </button></li>)}
      </ul>
    </div>
  )
}

export default App
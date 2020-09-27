import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repoCounter, setRepoCounter] = useState(0)
  const [repositories, setRepositories] = useState([])
  
  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepositories(res.data)
    })
  },[])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: "repo " + repoCounter,
      url: "github.com/" + repoCounter,
      techs: ["React", "Node"]
    })
    setRepoCounter(repoCounter + 1)
    const repo = res.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`)

    if(res.status === 204){
      const repoIndex = repositories.findIndex(repositorie => repositorie.id === id)
      let repositorie = repositories
      
      repositorie.splice(repoIndex, 1)
      
      setRepositories([...repositorie])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo=>(
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

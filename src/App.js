import React from "react";
import { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepos() {
      try {
        const {data} = await api.get("/repositories");
        setRepositories(data);
        
      } catch (error) {
        alert("Ocorreu um erro ao buscar os repos");
      }
    }
    getRepos();
  }, [])

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: "trellooo",
	    url: "github.com/brendammelo",
	    techs: "react",
	    likes: 0
    });
    
    

   const repositorie = response.data

   setRepositories([...repositories, repositorie])


  }

  async function handleRemoveRepository(id) {
   

   await api.delete(`/repositories/${id}`) 
   
   const newRepos = repositories.filter(item => item.id !== id)

   setRepositories(newRepos);
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(({title, id}, i) => ( 
       <li key={String(i)}>
         {title}

         <button onClick={() => handleRemoveRepository(id)}>
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

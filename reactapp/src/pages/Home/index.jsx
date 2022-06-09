import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card'
import './style.css'

export function Home() {

  const [studantName, setStudantName] = useState('')
  const [studants, setStudants] = useState([])
  const [user, setUser] = useState({name: "", avatar: ""})

  function handleAddStudant() {
    const newStudant = {
      name: studantName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudants(prevState => [...prevState, newStudant])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/fabinhoflauzino')
    .then(response => response.json())
    .then(data => setUser({
      name: data.name,
      avatar: data.avatar_url
    }))
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar}/>
        </div>
      </header>
      <input type="text" placeholder="Digite o nome" onChange={e => setStudantName(e.target.value)} />
      <button type='button' onClick={handleAddStudant}>Adicionar</button>

      {
        studants.map((studant, index) => <Card key={index} name={studant.name} time={studant.time} />)
      }

    </div>
  )
}

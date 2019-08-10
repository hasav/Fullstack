
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/numbers'

const Person = ({ name, number, delFunction }) => {
  return (
    <div>
    {name} {number}
    <button onClick={delFunction}>delete</button>
    </div>
  )
}


const Filter = ( {newFilter, setNewFilter} ) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }
  return (
    <form>
        <div>
          filter shown with
          <input
          value={newFilter}
          onChange={handleFilterChange}
          />
        </div>
      </form>
  )
}

const delFunctionOf = (id, persons, setPersons, setMessage) => {
  const person = (persons.find(p=> p.id === id))
  const result = window.confirm(
    `Delete '${person.name}'?`
  )
  if (result) {
    numberService
    .deleteObject(id)
    .then(response => {
      setPersons(persons.filter(n => n.id !== id))
      setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
    })
  }
}

const PersonForm = ( {newName, setNewName, newNumber, setNewNumber, persons, setPersons, setMessage} ) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName && newNumber === "") ) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(person => person.name === newName) ) {
      const person = (persons.find(p=> p.name === newName))
      const idOfPerson = person.id
      numberService
        .update(idOfPerson, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== idOfPerson ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Changed number to ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
    }
    else {
      numberService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
    }

  }
  return (
    <form onSubmit={addEntry}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}

const Notification = ({ message }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null || message === '') {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}
const Rows = ( {newFilter, persons, setPersons, setMessage} ) => {
  if (newFilter === '') {
    return (
      persons.map(person =>
        <Person
        key={person.name}
        name={person.name}
        number={person.number}
        delFunction={() => delFunctionOf(person.id, persons, setPersons, setMessage)}
        />)
    )
  }
  else {
    console.log(newFilter)
    let filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter))
    console.log(filtered)
    return (
      filtered.map(person =>
        <Person 
        key={person.name}
        name={person.name}
        number={person.number}
        />)
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ message, setMessage ] = useState('')
  

  useEffect(() => {
    numberService
      .getAll('http://localhost:3001/persons')
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm newName={newName} setNewName={setNewName} 
      newNumber={newNumber} setNewNumber={setNewNumber}
      persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <ul>
        <Rows newFilter={newFilter} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      </ul>
    </div>
  )

}

export default App

import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
    {name} {number}
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

const PersonForm = ( {newName, setNewName, newNumber, setNewNumber, persons, setPersons} ) => {
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
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

const Rows = ( {newFilter, persons} ) => {
  if (newFilter === '') {
    return (
      persons.map(person =>
        <Person
        key={person.name}
        name={person.name}
        number={person.number}
        />)
    )
  }
  else {
    console.log(newFilter)
    let filtered = persons.filter(person => person.name.toLowerCase().startsWith(newFilter))
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm newName={newName} setNewName={setNewName} 
      newNumber={newNumber} setNewNumber={setNewNumber}
      persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ul>
        <Rows newFilter={newFilter} persons={persons}/>
      </ul>
    </div>
  )

}

export default App
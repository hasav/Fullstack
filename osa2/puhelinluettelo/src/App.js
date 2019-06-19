
import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
    {name} {number}
    </div>
  )
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
  const rows = () => {
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
      }

    }
    const handleFilterChange = (event) => {
      setNewFilter(event.target.value.toLowerCase())
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with
          <input
          value={newFilter}
          onChange={handleFilterChange}
          />
        </div>
      </form>
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
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )

}

export default App
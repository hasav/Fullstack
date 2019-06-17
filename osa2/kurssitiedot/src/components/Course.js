import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    const rows = () => props.parts.map(part => 
    <Part key={part.name}
    part={part.name} exercises={part.exercises}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}


const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )

}

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Total = ( {parts} ) => {
    console.log(parts)
    const total = parts.reduce( (s, p) => {
        if ( s.exercises !== undefined) {
            s = s.exercises
        }
        if (p.exercises !== undefined) {
            p = p.exercises
        }
        return s + p
      })
    return (
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )
}

export default Course
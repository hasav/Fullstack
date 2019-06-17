import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'


const Courses = ( { courses }) => {
    const rows = () => courses.map(course =>
        <Course key={course.name}
        name = {course.name}
        parts = {course.parts}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        },
        {
            name: 'Redux',
            exercises: 11
        }
      ]
    }
    const course2 = {
        name: 'Node.js',
        parts: [
            {
                name: 'Routing',
                exercises: 3
            },
            {
                name: 'Middlewares',
                exercises: 7
            }
        ]
    }

    const courses = [course, course2]
  
    return (
      <div>
        <Courses courses={courses} />
      </div>
    )
  }

  ReactDOM.render(<App  />, document.getElementById('root'))
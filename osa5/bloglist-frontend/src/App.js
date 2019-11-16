import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { useField } from './hooks'


const  App = () => {

  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  const blogFormRef = React.createRef()

  const removeReset = (hook) => {
    let { reset, ...rest } = hook
    return rest
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      const user = await loginService.login(
        credentials
      )

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setColor('green')
      setMessage('Login successful!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      username.reset()
      password.reset()
      setColor('red')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }


  const handleNewPost = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value
    }
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      title.reset()
      author.reset()
      url.reset()
      setColor('green')
      setMessage(`a new blog ${title.value} by ${author.value} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setColor('red')
      setMessage('adding new blog failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <form onSubmit={handleNewPost}>
          title:
          <input {...removeReset(title)} />
          <br />
          author:
          <input {...removeReset(author)} />
          <br />
          url:
          <input {...removeReset(url)} />
          <br />
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )


  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        username:
        <input  {...removeReset(username)} />
        <br/>
        password:
        <input {...removeReset(password)} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )

  const Notification = ({ message }) => {

    var style = {
      color: color,
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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON =  window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
        setBlogs(initialBlogs)
      })
  }, [])


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
          {loginForm()}

      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )
}
export default App

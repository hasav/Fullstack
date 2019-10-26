import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'



const  App = () => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setColor('green')
      setMessage(`Login successful!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
    } catch (exception) {
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
      'title': title,
      'author':author,
      'url':url
    }
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setColor('green')
      setMessage(`a new blog ${title} by ${author} added`)
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
      <BlogForm
      title={title}
      author={author}
      url={url}
      handleTitleChange={({ target }) => setTitle(target.value)}
      handleAuthorChange={({ target }) => setAuthor(target.value)}
      handleURLChange={({ target }) => setUrl(target.value)}
      handleSubmit={handleNewPost}
      />
    </Togglable>
  )


  const loginForm = () => (     
    <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />  
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
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  useEffect(() => {
    
    const loggedUserJSON =  window.localStorage.getItem('loggedBlogappUser')
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
export default App;

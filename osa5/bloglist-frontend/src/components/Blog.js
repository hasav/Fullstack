import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const returnInfo = () => {
    if (moreInfo) {
      return (
      <div>
        <div onClick={toggleInfo}>
          <p>{blog.title}</p>
        </div>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes
          <button onClick={likePost}>like</button>
          </p>
          <p>added by {blog.author}</p>
          {renderRemove()}

      </div>
      )
    }
    return (
      <div onClick={toggleInfo}>
        {blog.title} {blog.author}
      </div>
    )
  }

  const toggleInfo = () => {
    setMoreInfo(!moreInfo)
  }

  const likePost = async () => {
    const blogId = blog.id
    const newBlog = {
      'user': blog.user ? blog.user.id : null,
      'likes': blog.likes +1,
      'author': blog.author,
      'title': blog.title,
      'url': blog.url
    }
    try {
      const returnedBlog = await blogService.update(newBlog, blogId)
      const removedList = blogs.filter(b => b.id !== blog.id)
      const index = blogs.findIndex(b => b.id === blog.id)
      removedList.splice(index, 0, returnedBlog)
      setBlogs(removedList)
      
    }
    catch {
      console.log('something went wrong')
    }
    
  }

  const removePost = async () => {
    const blogId = blog.id
    try {
      const ret = await blogService.remove(blogId)
      const removedList = blogs.filter(b => b.id !== blog.id)
      setBlogs(removedList)
    }
    catch {
      console.log('something went wrong')
    }
  }

  const renderRemove = () => {
    if (blog.user && blog.user.username === user.username) {
      return (
        <div>
          <button onClick={removePost}>remove</button>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}> 
      {returnInfo()}
  </div>
)}

export default Blog
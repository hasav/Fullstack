import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
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
          <p>{likes} likes
          <button onClick={likePost}>like</button>
          </p>
          <p>added by {blog.author}</p>

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
      'likes': likes +1,
      'author': blog.author,
      'title': blog.title,
      'url': blog.url
    }
    try {
      const returnedBlog = await blogService.update(newBlog, blogId)
      blog.likes = returnedBlog.likes
      setLikes(returnedBlog.likes)
    }
    catch {
      console.log('something went wrong')
    }
  }

  return (
    <div style={blogStyle}> 
      {returnInfo()}
  </div>
)}

export default Blog
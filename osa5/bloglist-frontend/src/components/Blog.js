import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
          <p>{blog.title}</p>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes
          <button onClick={console.log("click")}>like</button>
          </p>
          <p>added by {blog.author}</p>

      </div>
      )
    }
    return (
      <div>
        {blog.title} {blog.author}
      </div>
    )
  }

  const toggleInfo = () => {
    setMoreInfo(!moreInfo)
  }
  return (
    <div style={blogStyle}> 
      <div onClick={toggleInfo}>
        {returnInfo()}
      </div>
  </div>
)}

export default Blog
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
        <div onClick={toggleInfo}>
          <p>{blog.title}</p>
        </div>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes
          <button onClick={() => console.log("click")}>like</button>
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
  return (
    <div style={blogStyle}> 
      {returnInfo()}
  </div>
)}

export default Blog
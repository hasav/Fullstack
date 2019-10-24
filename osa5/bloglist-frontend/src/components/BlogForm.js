import React from 'react'



const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleURLChange,
    title,
    author,
    url
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                    type="text"
                    value={author}
                    onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                    type="text"
                    value={url}
                    onChange={handleURLChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
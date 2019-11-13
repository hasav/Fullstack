import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)


test('renders content', () => {
    const blog = {
        title: 'Testing title',
        author: 'Testing author',
        likes: 5
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const titleAndAuthor = component.container.querySelector('.titleAndAuthor')
    expect(titleAndAuthor).toHaveTextContent(
        'Testing title Testing author'
    )

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(
        'blog has 5 likes'
    )
})

test('clicking the button twice calls event handler twice', async () => {
    const blog = {
        title: 'Testing title 2',
        author: 'Testing author 2',
        likes: 9
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})

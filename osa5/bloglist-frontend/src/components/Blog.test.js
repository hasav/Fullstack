import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

afterEach(cleanup)


test('only title and author visible before click', () => {
    const blog = {
        title: 'Testing title for blog',
        author: 'Testing author for blog',
        likes: 12,
        url: 'www.testisivu.fi',
        user: 'Test user for blog'
    }

    const component = render(
        <Blog blog={blog} user={'abc'} />
    )
    expect(component.container).toHaveTextContent(
        'Testing title for blog Testing author for blog'
    )
    expect(component.container).not.toHaveTextContent(
        'www.testisivu.fi'
    )
    const element = component.getByText(
        'Testing title for blog Testing author for blog'
    )
    element.click()

    expect(component.container).toHaveTextContent(
        'Testing title for blogwww.testisivu.fi12 likeslikeadded by Testing author for blog'
    )
})

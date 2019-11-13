import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')


describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.getByText('login')
      )

      expect(component.container).toHaveTextContent(
        'username'
      )

      expect(component.container).toHaveTextContent(
        'password'
      )

    })

    test('if user is logged in, blogs are rendered', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
          }
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        const component = render(
          <App />
        )
        component.rerender(<App />)

        await waitForElement(
          () => component.getByText('author:')
        )

        expect(component.container).toHaveTextContent(
          'First mock blog'
        )

        expect(component.container).toHaveTextContent(
          'Second mock blog'
        )
      })

})

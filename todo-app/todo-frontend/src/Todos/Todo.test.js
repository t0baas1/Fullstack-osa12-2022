import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('New component is correct', () => {
    const todo = {
        text: "Test todo",
        done: "false"
    }

    const component = render(<Todo todo={todo}/>)

    expect(component.container).toHaveTextContent(todo.text)
})
import { useState } from 'react'

import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const handleAddItem = event => {
    event.preventDefault()
    if (!newItem) return
    const item = {
      id: Date.now(),
      name: newItem,
      completed: false,
    }
    setItems([...items, item])
    setNewItem('')
  }

  const handleToggleCompleted = id => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    setItems(updatedItems)
  }

  const handleRemoveItem = id => {
    const filteredItems = items.filter(item => item.id !== id)
    setItems(filteredItems)
  }

  const handleClearCompleted = () => {
    const filteredItems = items.filter(item => !item.completed)
    setItems(filteredItems)
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleCompleted(item.id)}
            />
            {item.name}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {items.some(item => item.completed) && (
        <button onClick={handleClearCompleted}>Clear Completed</button>
      )}
    </div>
  )
}

export default App

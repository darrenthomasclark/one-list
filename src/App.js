import React, { Component } from 'react'
import List from './List'
import Input from './Input'

class App extends Component {

  constructor () {
    super()
    this.state = {
      listItems: []
    }
  }

// add the new list text from Input to the state listItems
  addToList = (newListText) => {
    const newListItems = this.state.listItems
    newListItems.push(newListText)
    this.setState({
      listItems: newListItems
    })
  }

  render () {
    return (
      <div className='App'>
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <List />
          <Input onAddToList={this.addToList}/>
        </main>
        <footer>
          &copy; 2016 Pickles of Awesome.
        </footer>
      </div>
    )
  }
}

export default App

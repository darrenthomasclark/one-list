import React, { Component } from 'react'
import List from './List'
import Input from './Input'
import logo from './logo.svg'

const TOKEN = 'mikes'

class App extends Component {

  constructor () {
    super()
    this.state = {
      listItems: [
      ]
    }
  }

  componentDidMount() {
    fetch(`https://one-list-api.herokuapp.com/items?access_token=${TOKEN}`)
    .then((response) => { return response.json() })
    .then((data) => {
      const apiListItems = data
      this.setState({
        listItems: apiListItems
      })
    })
  }

  // add the new list text from Input to the state listItems
  addToList = (newListText) => {
    const newListItems = this.state.listItems
    // REPLACE this:
    //   newListItems.push({ text: newListText, complete: false })
    //   this.setState({ listItems: newListItems })
    //
    // WITH this:
    fetch(`https://one-list-api.herokuapp.com/items?access_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          text: newListText
        }
      })
    })
    .then((response) => { return response.json() })
    .then((data) => {
      newListItems.push(data)
      this.setState({
        listItems: newListItems
      })
    })
  }

  completeItem = (index) => {
    const newListItems = this.state.listItems
    newListItems[index].complete = !newListItems[index].complete
    const itemId = newListItems[index].id
    fetch(`https://one-list-api.herokuapp.com/items/${itemId}?access_token=${TOKEN}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          complete: newListItems[index].complete
        }
      })
    })
    .then(() => {
      this.setState({
        listItems: newListItems
      })
    })
  }

  removeItem = (index) => {
    const newListItems = this.state.listItems
    const itemId = newListItems[index].id
    fetch(`https://one-list-api.herokuapp.com/items/${itemId}?access_token=${TOKEN}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      newListItems.splice(index, 1)
      this.setState({
        listItems: newListItems
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <header>
          <h1>Postit<sup>®</sup> Poster</h1>
        </header>
        <main>
          <List
            items={this.state.listItems}
            completeItem={this.completeItem}
            removeItem={this.removeItem} />
          <Input onAddToList={this.addToList}/>
          <div className="instructions">Single Click: Mark as Complete</div>
          <div className="instructions">Double Click: Remove Post</div>
        </main>
        <footer>
          <p><img src={logo} height="42" alt="React"/></p>
          <p><mark>&copy; 2016 OneList.io. All Rights Reserved.</mark></p>
        </footer>
      </div>
    )
  }
}

export default App

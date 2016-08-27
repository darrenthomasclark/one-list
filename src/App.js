import React, { Component } from 'react'
import List from './List'
import Input from './Input'
import logo from './logo.svg'
let TOKEN = 'DarrenToken'


class App extends Component {

  constructor () {
    super()
    this.state = {
      listItems: [
      ]
    }
  }
// This is the API Pull using the fetch command. My token is being pulled from the top of this document. I defined it as DarrenToken. Every instance of TOKEN in the code is refencing that deinition. It is being told to return jason information (line 20).
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
  addToList = (newListText) => {
    const newListItems = this.state.listItems
  // This is the api config items pulled from heroku. Stringify seems to be turning the json into JS or vice versa. Seems to be maybe checking api for current data to diplay.
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
//Function adds item has been added to list.
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
//Function removes item upon doubleclick.
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
// Begin standard JSX content to be displayed.
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
          <div className="instructions">Enter a list item above.</div>
          <div className="instructions2"><strong>Single Click:</strong> Mark as Complete </div>  <div className="instructions2"><strong>Double Click:</strong> Remove Post</div>
        </main>
        <footer>
          <p><img src={logo} height="21" alt="React"/></p>
          <p><mark>&copy; 2016 OneList.io. All Rights Reserved.</mark></p>
        </footer>
      </div>
    )
  }
}

export default App

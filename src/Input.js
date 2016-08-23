import React, { Component } from 'react'

class Input extends Component {
 // text is null for input field to begin
  constructor () {
    super()
    this.state = {
      text: ''
    }
  }
 // when characters are typed, update input field setstate and render
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }
 // when enter is used on input field, set prop add to list, send field
 // and clear input field before render
  submitHandler = (event) => {
    this.props.onAddToList(this.state.text)
    this.setState({ text: '' })
    event.preventDefault()
  }
 // set the input field to capture changes to the field and do setstate on
 //   enter (submit)
  render () {
    return <form onSubmit={this.submitHandler}>
      <input type='text' value={this.state.text}
       onChange={this.handleChange} />
    </form>
  }
}
export default Input

import React, { Component } from 'react'

class Item extends Component {

  doubleClicking = false
 // if clicked wait to see if double else complete or uncomplete item
  clickHandler = () => {
    setTimeout(() => {
      if (!this.doubleClicking) {
        this.props.completeItem(this.props.index)
      }
    }, 200)
  }
 // if double click remove item by index in App state
  doubleClickHandler = () => {
    this.doubleClicking = true
    this.props.removeItem(this.props.index)
  }
 // create items in list (ul) and set handlers for complete/undo (click)
 // and remove (doubleclick)
  render () {
    const cx = this.props.complete ? 'completed' : ''
    return <li
      className={cx}
      onClick={this.clickHandler}
      onDoubleClick={this.doubleClickHandler}>
      {this.props.text}
    </li>
  }
}

export default Item

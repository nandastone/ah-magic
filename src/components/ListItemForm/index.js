import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class ListItemForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      price: props.defaultPrice || 0,
      duration: 48
    }
  }

  // Lifecycle

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultPrice !== nextProps.defaultPrice) {
      this.setState({ price: nextProps.defaultPrice })
    }
  }

  // Event handling

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.onComplete({
      price: _.toNumber(this.state.price),
      duration: _.toNumber(this.state.duration)
    })
  }

  handleClickCancel = (event) => {
    event.preventDefault()
    this.props.onCancel()
  }

  // Rendering

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='number'
          name='price'
          value={this.state.price}
          placeholder='Price'
          onChange={this.handleInputChange}
        />
        <select name='duration' value={this.state.duration} onChange={this.handleInputChange}>
          <option value='12'>12 Hours</option>
          <option value='24'>24 Hours</option>
          <option selected value='48'>48 Hours</option>
        </select>
        <button type='submit'>Save</button>
        <button onClick={this.handleClickCancel}>Cancel</button>
      </form>
    )
  }
}

ListItemForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

ListItemForm.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default ListItemForm

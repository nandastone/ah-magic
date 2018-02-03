import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class SoldItemForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      price: props.defaultPrice || 0,
      isVendored: false
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
      isVendored: this.state.isVendored
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
        <label>
          <input
            type='checkbox'
            name='isVendored'
            checked={this.state.isVendored}
            onChange={this.handleInputChange}
          />
          Was Vendored?
        </label>
        <button type='submit'>Save</button>
        <button onClick={this.handleClickCancel}>Cancel</button>
      </form>
    )
  }
}

SoldItemForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

SoldItemForm.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default SoldItemForm

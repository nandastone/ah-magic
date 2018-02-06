import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class CreateItemForm extends PureComponent {
  state = {
    name: '',
    cost: '',
    vendorValue: ''
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
      name: this.state.name,
      cost: _.toNumber(this.state.cost),
      vendorValue: _.toNumber(this.state.vendorValue)
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
          type='text'
          name='name'
          value={this.state.name}
          placeholder='Name'
          onChange={this.handleInputChange}
        />
        <input
          type='number'
          name='cost'
          value={this.state.cost}
          placeholder='Cost'
          onChange={this.handleInputChange}
        />
        <input
          type='number'
          name='vendorValue'
          value={this.state.vendorValue}
          placeholder='Vendor Value'
          onChange={this.handleInputChange}
        />
        <button type='submit'>Save</button>
        <button onClick={this.handleClickCancel}>Cancel</button>
      </form>
    )
  }
}

CreateItemForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

CreateItemForm.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default CreateItemForm

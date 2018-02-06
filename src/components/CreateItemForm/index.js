import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class CreateItemForm extends PureComponent {
  state = {
    name: '',
    cost: 0,
    vendorValue: 0
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
        <div className='form-group'>
          <label for='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={this.state.name}
            placeholder='Item Name'
            required
            className='form-control'
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form-row'>
          <div className='form-group col'>
            <label for='cost'>Cost</label>
            <input
              type='number'
              id='cost'
              name='cost'
              value={this.state.cost}
              placeholder='Cost Price'
              min='0'
              required
              className='form-control'
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group col'>
            <label for='cost'>Vendor Price</label>
            <input
              type='number'
              id='vendorValue'
              name='vendorValue'
              value={this.state.vendorValue}
              placeholder='Vendor Price'
              min='0'
              required
              className='form-control'
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <button type='submit' className='btn btn-primary'>Save</button>
        <button className='btn btn-secondary' onClick={this.handleClickCancel}>Cancel</button>
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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class ListItemForm extends PureComponent {
  state = {
    bid: this.props.defaultBid || '',
    price: this.props.defaultPrice || '',
    duration: 24
  }

  // Lifecycle

  componentDidMount () {
    window.setTimeout(() => this.bidInput.focus(), 0)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultBid !== nextProps.defaultBid) {
      this.setState({ price: nextProps.defaultBid })
    }

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
    this.submit()
  }

  handleClickCancel = (event) => {
    event.preventDefault()
    this.props.onCancel()
  }

  // Public

  submit () {
    this.props.onComplete({
      bid: _.toNumber(this.state.bid),
      price: _.toNumber(this.state.price),
      duration: _.toNumber(this.state.duration)
    })
  }

  // Rendering

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
          <div className='form-group col'>
            <label htmlFor='price'>Bid</label>
            <input
              ref={(input) => this.bidInput = input}
              type='number'
              id='bid'
              name='bid'
              value={this.state.bid}
              placeholder='Bid'
              min='0'
              required
              className='form-control'
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group col'>
            <label htmlFor='price'>Buyout</label>
            <input
              type='number'
              id='price'
              name='price'
              value={this.state.price}
              placeholder='Buyout'
              min='0'
              required
              className='form-control'
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='duration'>Listing Duration</label>
          <select
            id='duration'
            name='duration'
            value={this.state.duration}
            required
            className='custom-select'
            onChange={this.handleInputChange}
          >
            <option value='2'>2 Hours</option>
            <option value='8'>8 Hours</option>
            <option value='24'>24 Hours</option>
          </select>
        </div>

        {/* Invisible button to allow submitting form with enter key */}
        <button type='submit' className='d-none' />
      </form>
    )
  }
}

ListItemForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

ListItemForm.propTypes = {
  defaultBid: PropTypes.number,
  defaultPrice: PropTypes.number,
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default ListItemForm

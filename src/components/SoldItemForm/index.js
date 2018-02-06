import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class SoldItemForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      price: props.defaultPrice || '',
      isVendored: props.defaultVendored || false
    }
  }

  // Lifecycle

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultPrice !== nextProps.defaultPrice) {
      this.setState({ price: nextProps.defaultPrice })
    }

    if (this.props.defaultVendored !== nextProps.defaultVendored) {
      this.setState({ isVendored: nextProps.defaultVendored })
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

  handleClickBid = (event) => {
    event.preventDefault()
    this.setState({ price: this.props.defaultBid })
  }

  handleClickBuyout = (event) => {
    event.preventDefault()
    this.setState({ price: this.props.defaultPrice })
  }

  // Rendering

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='price'>Sold Price</label>
          <input
            type='number'
            id='price'
            name='price'
            value={this.state.price}
            placeholder='Sold Price'
            min='0'
            required
            className='form-control'
            onChange={this.handleInputChange}
          />
          <nav className='nav'>
            <a className='nav-link' href='' onClick={this.handleClickBid}>Bid</a>
            <a className='nav-link' href='' onClick={this.handleClickBuyout}>Buyout</a>
          </nav>
        </div>
        <div className='form-group'>
          <input
            id='isVendored'
            name='isVendored'
            type='checkbox'
            checked={this.state.isVendored}
            className='form-check-input'
            onChange={this.handleInputChange}
          />
          <label htmlFor='isVendored' className='form-check-label'>
            Sold to vendor?
          </label>
        </div>

        <button type='submit' className='btn btn-primary'>Save</button>
        <button className='btn btn-secondary' onClick={this.handleClickCancel}>Cancel</button>
      </form>
    )
  }
}

SoldItemForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

SoldItemForm.propTypes = {
  defaultBid: PropTypes.number,
  defaultPrice: PropTypes.number,
  defaultVendored: PropTypes.bool,
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default SoldItemForm

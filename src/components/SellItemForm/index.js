import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components

import { Nav, NavItem, NavLink } from 'reactstrap'

// Assets

import './SellItemForm.css'

class SellItemForm extends PureComponent {
  state = {
    price: this.props.defaultPrice || '',
    saleType: this.props.defaultSaleType || 'ah'
  }

  // Lifecycle

  componentDidMount () {
    window.setTimeout(() => this.priceInput.focus(), 0)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultPrice !== nextProps.defaultPrice) {
      this.setState({ price: nextProps.defaultPrice })
    }

    if (this.props.defaultSaleType !== nextProps.defaultSaleType) {
      this.setState({ saleType: nextProps.defaultSaleType })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // If the user selects the "vendor" sale type, update the price to the vendor value.
    if (prevState.saleType !== this.state.saleType && this.state.saleType === 'vendor') {
      this.setState({ price: this.props.defaultVendorValue })
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

  handleClickBidPreset = (event) => {
    event.preventDefault()
    this.setState({ price: this.props.defaultBid })
  }

  handleClickBuyoutPreset = (event) => {
    event.preventDefault()
    this.setState({ price: this.props.defaultPrice })
  }

  // Public

  submit () {
    this.props.onComplete({
      price: _.toNumber(this.state.price),
      saleType: this.state.saleType
    })
  }

  // Rendering

  render () {
    return (
      <form onSubmit={this.handleSubmit} className='c-SellItemForm'>
        <div className='form-group'>
          <label htmlFor='price'>Sold Price</label>
          <input
            ref={(input) => this.priceInput = input}
            type='number'
            id='price'
            name='price'
            value={this.state.price}
            placeholder='Sold Price'
            min='0'
            required
            disabled={this.state.saleType === 'vendor'}
            className='form-control'
            onChange={this.handleInputChange}
          />
          {
            this.props.defaultBid || this.props.defaultPrice
            ? <Nav>
                <NavItem active={this.props.defaultBid === this.state.price}>
                  <NavLink
                    href=''
                    onClick={this.handleClickBidPreset}
                  >
                    Bid
                  </NavLink>
                </NavItem>
                <NavItem active={this.props.defaultPrice === this.state.price}>
                  <NavLink
                    href=''
                    onClick={this.handleClickBuyoutPreset}
                  >
                    Buyout
                  </NavLink>
                </NavItem>
              </Nav>
            : null
          }
        </div>
        <div className='form-group'>
          <label htmlFor='saleTypeAhOption'>Sale Type</label>
          <div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                id='saleTypeAhOption'
                name='saleType'
                value='ah'
                checked={this.state.saleType === 'ah'}
                onChange={this.handleInputChange}
                className='form-check-input'
              />
              <label className='form-check-label' htmlFor='saleTypeAhOption'>Auction House</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                id='saleTypePrivateOption'
                name='saleType'
                value='private'
                checked={this.state.saleType === 'private'}
                onChange={this.handleInputChange}
                className='form-check-input'
              />
              <label className='form-check-label' htmlFor='saleTypePrivateOption'>Private</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                id='saleTypeVendorOption'
                name='saleType'
                value='vendor'
                checked={this.state.saleType === 'vendor'}
                onChange={this.handleInputChange}
                className='form-check-input'
              />
              <label className='form-check-label' htmlFor='saleTypeVendorOption'>Vendor</label>
            </div>
          </div>
        </div>

        {/* Invisible button to allow submitting form with enter key */}
        <button type='submit' className='d-none' />
      </form>
    )
  }
}

SellItemForm.defaultProps = {
  defaultBid: 0,
  defaultPrice: 0,
  onComplete: () => {},
  onCancel: () => {}
}

SellItemForm.propTypes = {
  defaultBid: PropTypes.number,
  defaultPrice: PropTypes.number,
  defaultVendorValue: PropTypes.number,
  defaultSaleType: PropTypes.oneOf(['vendor', 'private', 'ah']),
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default SellItemForm

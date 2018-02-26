import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

class SoldItemForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      price: props.defaultPrice || '',
      saleType: props.defaultSaleType || 'ah'
    }
  }

  // Lifecycle

  componentDidMount () {
    this.priceInput.focus()
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

    this.props.onComplete({
      price: _.toNumber(this.state.price),
      saleType: this.state.saleType
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
          <nav className='nav nav-pills'>
            {
              this.props.defaultBid
              ? <a
                  href=''
                  className={classNames(
                    'nav-link',
                    { active: this.props.defaultBid === this.state.price }
                  )}
                  onClick={this.handleClickBid}
                >
                  Bid
                </a>
              : null
            }
            {
              this.props.defaultPrice
              ? <a
                  href=''
                  className={classNames(
                    'nav-link',
                    { active: this.props.defaultPrice === this.state.price }
                  )}
                  onClick={this.handleClickBuyout}
                >
                  Buyout
                </a>
              : null
            }
          </nav>
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
  defaultVendorValue: PropTypes.number,
  defaultSaleType: PropTypes.oneOf(['vendor', 'private', 'ah']),
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default SoldItemForm

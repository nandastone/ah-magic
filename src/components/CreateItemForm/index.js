import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components

import Autocomplete from '../Autocomplete'

// Assets

import './CreateItemForm.css'

class CreateItemForm extends PureComponent {
  state = {
    // Form values
    name: '',
    suffix: '',
    cost: '',
    vendorValue: '',
    stackable: 1,

    // Other
    dbItem: null
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

    const name = `${this.state.name} ${this.state.suffix}`.trim()

    this.props.onComplete({
      name,
      cost: _.toNumber(this.state.cost),
      vendorValue: _.toNumber(this.state.vendorValue),
      stackable: _.toNumber(this.state.stackable)
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
          <label htmlFor='name'>Name</label>
          <Autocomplete
            name='name'
            onChange={(item) => {
              this.setState({
                dbItem: item,
                name: item.name,
                vendorValue: item.SellPrice,
                stackable: item.stackable
              })
            }}
          />
        </div>

        {
          // Check if the WowDB item can have a random suffix.
          this.state.dbItem && this.state.dbItem.RandomProperty !== 0
          ? <div className='form-group'>
              <label htmlFor='suffix'>Suffix</label>
              <select
                id='suffix'
                name='suffix'
                value={this.state.suffix}
                required
                className='custom-select'
                onChange={this.handleInputChange}
              >
                <option value=''>Select a suffix</option>
                <optgroup label='Single statistic'>
                  <option>of Strength</option>
                  <option>of Agility</option>
                  <option>of Stamina</option>
                  <option>of Intellect</option>
                  <option>of Spirit</option>
                </optgroup>
                <optgroup label='Two statistics'>
                  <option>of the Tiger</option>
                  <option>of the Bear</option>
                  <option>of the Gorilla</option>
                  <option>of the Boar</option>
                  <option>of the Monkey</option>
                  <option>of the Falcon</option>
                  <option>of the Wolf</option>
                  <option>of the Eagle</option>
                  <option>of the Whale</option>
                  <option>of the Owl</option>
                </optgroup>
                <optgroup label='Resistances'>
                  <option>of Fire Resistance</option>
                  <option>of Nature Resistance</option>
                  <option>of Arcane Resistance</option>
                  <option>of Frost Resistance</option>
                  <option>of Shadow Resistance</option>
                </optgroup>
                <optgroup label='Abyssal'>
                  <option>of Striking</option>
                  <option>of Sorcery</option>
                  <option>of Regeneration</option>
                </optgroup>
                <optgroup label='Misc'>
                  <option>of Defense</option>
                  <option>of Healing</option>
                  <option>of Power</option>
                  <option>of Blocking</option>
                  <option>of Marksmanship</option>
                  <option>of Eluding</option>
                </optgroup>
              </select>
            </div>
          : null
        }

        {
          // Check if the WowDB item is stackable.
          this.state.dbItem && this.state.dbItem.stackable > 1
          ? <div className='form-group'>
              <label htmlFor='Stackable'>Stack Size</label>
              <input
                type='number'
                id='stackable'
                name='stackable'
                value={this.state.stackable}
                placeholder='Stack Size'
                min={1}
                max={this.state.dbItem.stackable}
                className='form-control'
                onChange={this.handleInputChange}
              />
            </div>
          : null
        }

        <div className='form-row'>
          <div className='form-group col'>
            <label htmlFor='cost'>Cost</label>
            <input
              type='number'
              id='cost'
              name='cost'
              value={this.state.cost}
              placeholder='Cost Price'
              min='0'
              className='form-control'
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group col'>
            <label htmlFor='cost'>Vendor Price</label>
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

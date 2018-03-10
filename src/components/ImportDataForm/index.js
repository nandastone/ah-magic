import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import { Form, FormGroup, Label, Input } from 'reactstrap'

class ImportDataForm extends PureComponent {
  state = {
    // Form values
    data: ''
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
    if (window.confirm('Are you sure you want to replace your inventory with the imported data?')) {
      this.props.onComplete({ data: this.state.data })
    }
  }

  // Rendering

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for='data'>Data</Label>
          <Input
            name='data'
            value={this.state.data}
            type='textarea'
            id='data'
            onChange ={this.handleInputChange}
          />
        </FormGroup>

        {/* Invisible button to allow submitting form with enter key */}
        <button type='submit' className='d-none' />
      </Form>
    )
  }
}

ImportDataForm.defaultProps = {
  onComplete: () => {},
  onCancel: () => {}
}

ImportDataForm.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func
}

export default ImportDataForm

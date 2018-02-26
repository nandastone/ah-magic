import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import AgAutocomplete from 'react-algoliasearch'

// Assets

import './Autocomplete.css'

class Autocomplete extends PureComponent {
  // Lifecycle

  componentDidMount () {
    if (this.props.autoFocus) {
      this.autocompleteComponent.search.focus()
    }
  }

  // Rendering

  render () {
    return (
      <div className='c-Autocomplete'>
        <AgAutocomplete
          ref={(component) => this.autocompleteComponent = component}
          inputId={this.props.name}
          placeholder='Search...'
          apiKey='4b719864410b0dcb35f2e7992c263d69'
          appId='UN9ROLCS9L'
          displayKey={this.props.name}
          indices={[{ index: 'dev_WOWDB' }]}
          hitsPerPage={this.props.hitsPerPage}
          selected={(event, item) => this.props.onChange(item)}
          options={{
            cssClasses: {
              input: 'input form-control'
            },
            autoselect: true,
            autoselectOnBlur: true
          }}
        />
      </div>
    )
  }
}

Autocomplete.defaultProps = {
  hitsPerPage: 5,
  onChange: () => {}
}

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  hitsPerPage: PropTypes.number,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func
}

export default Autocomplete

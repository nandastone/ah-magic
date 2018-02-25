import React from 'react'
import PropTypes from 'prop-types'

// Components

import AgAutocomplete from 'react-algoliasearch'

// Assets

import './Autocomplete.css'

const Autocomplete = ({ name, hitsPerPage, onChange }) => {
  return (
    <div className='c-Autocomplete'>
      <AgAutocomplete
        inputId={name}
        placeholder='Search...'
        apiKey='4b719864410b0dcb35f2e7992c263d69'
        appId='UN9ROLCS9L'
        displayKey={name}
        indices={[{ index: 'dev_WOWDB' }]}
        hitsPerPage={hitsPerPage}
        selected={(event, item) => onChange(item)}
        options={{
          cssClasses: {
            input: 'input form-control'
          }
        }}
      />
    </div>
  )
}

Autocomplete.defaultProps = {
  hitsPerPage: 5,
  onChange: () => {}
}

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  hitsPerPage: PropTypes.number,
  onChange: PropTypes.func
}

export default Autocomplete

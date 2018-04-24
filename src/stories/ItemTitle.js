import React from 'react'
import { storiesOf } from '@storybook/react'

// Components

import ItemTitle from '../components/ItemTitle'

storiesOf('ItemTitle', module)
  .add('should display the item title', () => (
    <ItemTitle
      name='My Bazooka'
    />
  ))
  .add('should not display the item count if there\'s only one', () => (
    <ItemTitle
      name='My Bazooka'
      count={1}
    />
  ))
  .add('should display the item count when there\'s more than one', () => (
    <ItemTitle
      name='My Bazooka'
      count={10}
    />
  ))

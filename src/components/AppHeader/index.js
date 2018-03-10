import React from 'react'

// Components

import { Container, Jumbotron } from 'reactstrap'

// Assets

import './AppHeader.css'

const AppHeader = (props) => {
  return (
    <div className='c-AppHeader'>
      <Jumbotron fluid className='mb-0'>
        <Container>
          <h1 className='display-4'>Auction House Magic</h1>
          <p className='lead'>
            Track your AH purchases, sales, history and profits.
          </p>
        </Container>
      </Jumbotron>
    </div>
  )
}

export default AppHeader

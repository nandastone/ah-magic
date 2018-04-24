import React, { PureComponent } from 'react'

class RestoreFocus extends PureComponent {
  // Lifecycle

  componentDidMount () {
    if (this.wrapperEl) {
      this.wrapperEl.focus()
    }
  }

  // Rendering

  render () {
    return (
      <div ref={el => this.wrapperEl = el} tabIndex='-1' />
    )
  }
}

export default RestoreFocus

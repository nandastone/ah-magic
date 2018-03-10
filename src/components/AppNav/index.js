import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import uuid from 'uuid/v4'

// Components

import {
  Button,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import AddItemModal from '../AddItemModal'
import ExportModal from '../ExportModal'
import ImportModal from '../ImportModal'

// Assets

import './AppNav.css'

class AppHeader extends PureComponent {
  state = {
    isCreateExpanded: false,
    isExportExpanded: false,
    isImportExpanded: false
  }

  // Event handling

  handleClickAdd = (event) => {
    event.preventDefault()
    this.setState({ isCreateExpanded: true })
  }

  handleClickExport = (event) => {
    event.preventDefault()
    this.setState({ isExportExpanded: true })
  }

  handleClickImport = (event) => {
    event.preventDefault()
    this.setState({ isImportExpanded: true })
  }

  handleClickReset = () => {
    if (window.confirm('Are you sure want to reset item data?')) {
      this.props.onResetItems()
    }
  }

  handleCompleteCreate = ({ name, cost, stackable, vendorValue }) => {
    const newItem = {
      key: uuid(),
      name,
      vendorValue,
      stackable,
      history: [
        {
          key: uuid(),
          type: 'purchase',
          cost,
          createdAt: moment().format()
        }
      ]
    }
    this.props.onCreateItem(newItem)
  }

  handleCompleteImport = ({ data }) => {
    try {
      const state = JSON.parse(data)
      this.props.setAppState(state)
    } catch (error) {
      console.error(error)
      window.alert('Could not import data, invalid format.')
    }
  }

  handleCloseModal = () => {
    this.setState({
      isCreateExpanded: false,
      isExportExpanded: false,
      isImportExpanded: false
    })
  }

  // Rendering

  render () {
    return (
      <div className='c-AppNav'>
        <Navbar color='faded' light expand='md'>
          <Nav navbar>
            <NavItem>
              <Button
                color='primary'
                onClick={this.handleClickAdd}
              >
                Add Item
              </Button>
            </NavItem>
          </Nav>
          <Nav className='ml-auto' navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleClickExport}>
                  Export Data
                </DropdownItem>
                <DropdownItem onClick={this.handleClickImport}>
                  Import Data
                </DropdownItem>
                <DropdownItem onClick={this.handleClickReset}>
                  Reset Data
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <AddItemModal
          open={this.state.isCreateExpanded}
          onComplete={this.handleCompleteCreate}
          onClose={this.handleCloseModal}
        />
        <ExportModal
          open={this.state.isExportExpanded}
          appState={this.props.appState}
          onClose={this.handleCloseModal}
        />
        <ImportModal
          open={this.state.isImportExpanded}
          onComplete={this.handleCompleteImport}
          onClose={this.handleCloseModal}
        />
      </div>
    )
  }
}

AppHeader.defaultProps = {
  onCreateItem: () => {},
  onResetItems: () => {}
}

AppHeader.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  onCreateItem: PropTypes.func,
  onResetItems: PropTypes.func
}

export default AppHeader

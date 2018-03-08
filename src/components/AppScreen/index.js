import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components

import AppHeader from '../AppHeader'
import SaleItemList from '../SaleItemList'
import SoldItemList from '../SoldItemList'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

class AppScreen extends PureComponent {
  state = { activeTab: 1 }

  // Rendering

  render () {
    return (
      <div className='c-AppScreen'>
        <AppHeader
          onCreateItem={this.props.onCreateItem}
          onResetItems={this.props.onResetItems}
        />

        <div className='container'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === 1 })}
                onClick={() => this.setState({ activeTab: 1 })}
              >
                Inventory
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === 2 })}
                onClick={() => this.setState({ activeTab: 2 })}
              >
                Sold
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={1} className='pt-3'>
              <SaleItemList
                items={this.props.saleInventory}
                onChangeItem={this.props.onChangeItem}
                onDeleteItem={this.props.onDeleteItem}
              />
            </TabPane>
            <TabPane tabId={2} className='pt-3'>
              <SoldItemList
                items={this.props.soldInventory}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}

AppScreen.defaultProps = {
  onCreateItem: () => {},
  onChangeItem: () => {},
  onDeleteItem: () => {},
  onResetItems: () => {}
}

AppScreen.propTypes = {
  saleInventory: PropTypes.array.isRequired,
  soldInventory: PropTypes.array.isRequired,
  onCreateItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onResetItems: PropTypes.func
}

export default AppScreen

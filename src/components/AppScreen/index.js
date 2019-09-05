import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components

import { Container } from 'reactstrap'
import AppHeader from '../AppHeader'
import AppNav from '../AppNav'
import SaleList from '../SaleList'
import SoldList from '../SoldList'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

class AppScreen extends PureComponent {
  state = { activeTab: 1 }

  // Rendering

  render() {
    return (
      <div className="c-AppScreen">
        {/* <AppHeader /> */}

        {/* <AppNav
          appState={this.props.appState}
          setAppState={this.props.setAppState}
          onCreateItem={this.props.onCreateItem}
          onResetItems={this.props.onResetItems}
        /> */}

        <Container fluid>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === 1 })}
                onClick={() => this.setState({ activeTab: 1 })}
              >
                Stock
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
            <TabPane tabId={1} className="pt-3">
              <SaleList />
            </TabPane>
            <TabPane tabId={2} className="pt-3">
              {/* <SoldList
                items={this.props.soldInventory}
                onDeleteItem={this.props.onDeleteItem}
              /> */}
            </TabPane>
          </TabContent>
        </Container>
      </div>
    )
  }
}

export default AppScreen

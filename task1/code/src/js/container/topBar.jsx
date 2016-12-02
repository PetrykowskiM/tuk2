import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {addTimer} from '../actions'

import Queries from './queryOverview'

const TopBar = React.createClass({
  propTypes: {
  },

  componentWillMount() {
    this.state = {
      showQueries: true
    }
  },

  render() {
    return (
      <div className="top-bar">
        <a className="top-btn" onClick={ _ => this.props.setState( {showQueries: !this.state.showQueries } ) }>
          Show Queries
        </a>
        { this.state.showQueries ? <Queries></Queries> : null }
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)


import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadQuery } from '../actions'

import Queries from './queryOverview'

const TopBar = React.createClass({
  propTypes: {
  },

  componentWillMount() {
    this.state = {
      showQueries: false
    }
  },

  renderQuery() {
    this.setState({
      showQueries: false
    })
  },

  render() {
    let toogleQuery = () => {
      console.log("Toggle"); 
      this.setState( {showQueries: true} )
    }

    return (
      <div className="top-bar">
        <a className="top-btn" onClick={ toogleQuery }>
          Show Queries
        </a>
        { this.state.showQueries ? <Queries select={this.renderQuery}></Queries> : null }
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({

})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  load: (resource) => {
    dispatch(load(resource))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)


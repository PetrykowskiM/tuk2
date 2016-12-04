import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadQuery, showQueries, hideQueries } from '../actions'

import Queries from './queryOverview'

const TopBar = React.createClass({
  propTypes: {
  },

  componentWillMount() {
  },

  selectQuery(resource) {
    console.log("load ", resource)
    this.props.hide()
    this.props.load(resource)
  },

  toogleQuery(){
    console.log("Toggle"); 
    this.props.show()
  },

  render() {
    

    return (
      <div className="top-bar">
        <a className="top-btn" onClick={ this.toogleQuery }>
          Show Queries
        </a>
        { this.props.showDialog ? <Queries select={(resource)=>{ this.selectQuery(resource) }}></Queries> : null }
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  showDialog: state.queries.show
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  load: (resource) => {
    dispatch(loadQuery(resource))
  },
  show: (resource) => {
    dispatch(showQueries())
  },
  hide: (resource) => {
    dispatch(hideQueries())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)


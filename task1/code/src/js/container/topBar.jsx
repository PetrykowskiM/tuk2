import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadQuery, showQueries, hideQueries, loadQueryDiversity, showMap, showPyramid, showDiversity } from '../actions'

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
    if(resource == 'DIVERSITY'){
      dispatch(loadQueryDiversity(1991))
      dispatch(showDiversity())
    }else{
      dispatch(loadQuery(resource))
      if(resource == 'PYRAMID'){
          dispatch(showPyramid())
      }else{
        dispatch(showMap())
      }
    }


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

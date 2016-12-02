import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadQuery } from '../actions'

const QueryOverview = React.createClass({
  propTypes: {
    load: PropTypes.func.isRequired,
  },

  componentWillMount() {
  },

  render() {
    return (
      <div className="query-overview">
        
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
)(QueryOverview)


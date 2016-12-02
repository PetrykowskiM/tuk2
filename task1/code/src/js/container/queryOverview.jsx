import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadQuery } from '../actions'

const QueryOverview = React.createClass({
  propTypes: {
  },

  componentWillMount() {
  },

  render() {
    return (
      <div className="query-overview">
        { this.props.queries.map( (query) => (
          <div onClick={ this.props.select } key={query.name}>
            <div className="query-name">{query.name}</div>
          </div>
        ))}
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  queries: state.queries
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryOverview)


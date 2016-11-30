import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Map from './map'

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },

  componentWillMount() {
  },

  render() {
    return (
      <div className="content">
        <Map google={window.google}/>
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  timer: state.timer
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)


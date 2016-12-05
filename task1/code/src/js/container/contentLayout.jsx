import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

//import Map from './map'
import Pyramid from './pyramid'

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },

  componentWillMount() {
  },
//<Map google={window.google} />
  render() {
    return (
      <div className="content">
        <Pyramid />

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

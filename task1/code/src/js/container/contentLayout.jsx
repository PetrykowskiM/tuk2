import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Map from './map'
import Pyramid from './pyramid'
import Diversity from './diversity'

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },


    getInitialState: function()
      {
          return {
              page: 'MAP'
            }
      },

        componentWillReceiveProps(nextProps) {
          // this.map.data.loadGeoJson('https://dl.dropboxusercontent.com/u/47938947/plz3.geojson');
        //   const {google} = this.props;
        //   const maps = google.maps;
        //   google.maps.event.trigger(this.map, 'resize');
        console.log("component received props", nextProps);

        },

  componentWillMount() {
  },
//
  render() {
    console.log(this.props)
    return (
      <div className="content" id="content">
          { this.props.showMap ? <Map google={window.google} /> : '' }
          { this.props.showDiversity ? <Diversity ></Diversity> : '' }
          { this.props.showPyramid ? <Pyramid ></Pyramid> : '' }
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  showMap: state.queries.page == 'MAP',
  showDiversity: state.queries.page == 'DIVERSITY',
  showPyramid: state.queries.page == 'PYRAMID'
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

const apiKey = 'AIzaSyBf52VrfeXt9RozJJt06QViJAfYEK-0W7o'

// let geojson = require('json-loader!../../assets/plz3.geojson')

var styleArray = [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

const areaDict = {}
let map = null

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },


  componentWillReceiveProps(nextProps) {
    // this.map.data.loadGeoJson('https://dl.dropboxusercontent.com/u/47938947/plz3.geojson');
  //   const {google} = this.props;
  //   const maps = google.maps;
  //   google.maps.event.trigger(this.map, 'resize');
  console.log("component received props")
    Object.keys(areaDict).forEach( (plz) => {
      // areaDict[plz].setProperty('isColorful', true);
      var color = this.heatMapColorforValue(this.getValue(plz))
      map.data.overrideStyle(areaDict[plz], {strokeColor: color})
    })
  },

  getValue(plz) {
    // console.log("looking for plz", plz)
    if( plz in this.props.data){
      let value = (this.props.data[plz].VALUE-this.props.data[plz].MIN) / (this.props.data[plz].MAX-this.props.data[plz].MIN)
      // console.log("Value for PLZ ", plz, value)
      return value
    }
    return 0
  },
	
  componentDidMount() {
      const {google} = this.props;
      const maps = google.maps;

      // const mapRef = this.refs.map;
      const mapRef = this.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 6;
      let lat = 51.426111;
      let lng = 10.288578
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        styles: styleArray
      })
      this.map = new maps.Map(node, mapConfig);
      map = this.map
      this.map.data.loadGeoJson('/static/plz2.geojson');
      // this.map.data.loadGeoJson(geojson);

      this.map.data.setStyle( (feature) => {
        var plz = feature.getProperty('plz')
        var color = this.heatMapColorforValue(this.getValue(plz))
        areaDict[plz] = feature
        if (feature.getProperty('isColorful')) {
          color = 'gray'
        }
        if (feature.getProperty('rerender')) {
          color = 'gray'
        }

        return /** @type {google.maps.Data.StyleOptions} */({
          fillColor: color,
          strokeColor: color,
          strokeWeight: 2
        });
      });

      this.map.data.addListener('mouseover', (event) => {
        // this.map.data.overrideStyle(event.feature, {strokeWeight: 8});
        

      });

      var infowindow = new google.maps.InfoWindow({
        });

      this.map.data.addListener('click', (event) => {
        // event.feature.setProperty('isColorful', true);
        infowindow.close()
        infowindow.setPosition(event.latLng)
        infowindow.setContent( 'Value: ' + this.props.data[event.feature.getProperty('plz')].VALUE )
        // console.log(event.latLng)
        infowindow.open(map)
      })
  },

  heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)"
  },

  render() {
    return (
      <div ref={(map) => this.map = map}>
        Loading map...
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  data: state.data
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)


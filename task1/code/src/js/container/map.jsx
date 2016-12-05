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
let infoText = ""

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
    if (!(plz in this.props.data)){
      // if this is the case, the plz might be '010', but we only have '10' in the dataset -> remove the 0
      plz = plz.substr(1, 2);
    }
    // console.log("looking for plz", plz)
    if( plz in this.props.data){
      let value = (this.props.data[plz].VALUE-this.props.data[plz].MIN) / (this.props.data[plz].MAX-this.props.data[plz].MIN)
      // console.log("Value for PLZ ", plz, value)
      return value
    }
    return 0
  },

  attachPolygonInfoWindow(polygon, html)
{
	polygon.infoWindow = new google.maps.InfoWindow({
		content: html,
	});
	this.maps.event.addListener(polygon, 'mouseover', function(e) {
		var latLng = e.latLng;
		this.setOptions({fillOpacity:0.1});
		polygon.infoWindow.setPosition(latLng);
		polygon.infoWindow.open(map);
	});
this.maps.event.addListener(polygon, 'mouseout', function() {
		this.setOptions({fillOpacity:0.35});
		polygon.infoWindow.close();
	});
},

  componentDidMount() {
      const {google} = this.props;
      const maps = google.maps;

      // const mapRef = this.refs.map;
      const mapRef = this.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 7;
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
          strokeWeight: 0
        });
      });

      this.map.data.addListener('mouseover', (event) => {
        // this.map.data.overrideStyle(event.feature, {strokeWeight: 8});
        console.log(event.feature.f.plz)
        infoText = event.feature.f.plz;
        const element = (
            <center>{event.feature.f.plz}</center>
          );
        ReactDOM.render(
            element,
            document.getElementById('infobar')
          );
      });

      this.map.data.addListener('click', function(event) {
        event.feature.setProperty('isColorful', !event.feature.getProperty('isColorful'));
      })
  },

  heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)"
  },

  render() {
    return (
      <div>
        <div id="infobar" className="infobar">{infoText}</div>
          <div ref={(map) => this.map = map}>
            Loading map...
          </div>
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

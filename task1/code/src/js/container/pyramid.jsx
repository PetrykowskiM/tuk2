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
let male = [];
let female = [];
let cats = [];

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },


  componentWillReceiveProps(nextProps) {
    // this.map.data.loadGeoJson('https://dl.dropboxusercontent.com/u/47938947/plz3.geojson');
  //   const {google} = this.props;
  //   const maps = google.maps;
  //   google.maps.event.trigger(this.map, 'resize');
  console.log("component received props", nextProps)
    if(nextProps.data.length == 100 && male.length != 100){
      male = this.getMaleData(nextProps.data);
      female = this.getFemaleData(nextProps.data);
      this.renderHighCharts()
    }

  },



  componentDidMount() {
      cats = this.getCategories();
      male = this.getMaleData([]);
      this.renderHighCharts();
  },

  renderHighCharts() {
    Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Population pyramid'
            },
            xAxis: [{
                categories: cats,
                reversed: false
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: cats,
                linkedTo: 0
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Male',
                data: male
            }, {
                name: 'Female',
                data: female
            }]
        });
  },

  getCategories(){
      var cat = [];
      for(var i = 0; i < 100; i++){
        cat.push(i);
      }
      return cat;
  },

  getMaleData(propData){
    var mdata = [];
    if(propData.length == 100){
      for(var i = 0; i < 100; i++){
        mdata.push(-propData[i].M);
      }
    }
    console.log("Male:", mdata);
    return mdata;
  },

  getFemaleData(propData){
    var mdata = [];
    if(propData.length == 100){
      for(var i = 0; i < 100; i++){
        mdata.push(propData[i].F);
      }
    }
    console.log("Male:", mdata);
    return mdata;
  },

  render() {
    return (
      <div id="container">
        Loading pyramid...
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

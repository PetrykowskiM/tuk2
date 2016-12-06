import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { loadQueryDiversity } from '../actions'

let male = [];
let female = [];
let cats = [];

const divStyle = {
  height: '100%'
};

let year = 1991

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },
  getInitialState: function()
    {
        return {
            year: 1991
          }
    },

  componentWillReceiveProps(nextProps) {
    // this.map.data.loadGeoJson('https://dl.dropboxusercontent.com/u/47938947/plz3.geojson');
  //   const {google} = this.props;
  //   const maps = google.maps;
  //   google.maps.event.trigger(this.map, 'resize');
  console.log("component received props", nextProps)
    if(nextProps.data.length > 10){
      male = this.getMaleData(nextProps.data);
      female = this.getFemaleData(nextProps.data);
      this.renderHighCharts()
    }

  },



  componentDidMount() {

      male = this.getMaleData([]);
      this.renderHighCharts();
  },

  renderHighCharts() {

    Highcharts.chart('container', {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: 'Highcharts bubbles with radial gradient fill'
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: 'Height (cm)'
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Weight (kg)'
            }
        },
        legend: {
           layout: 'vertical',
           align: 'left',
           verticalAlign: 'top',
           x: 100,
           y: 70,
           floating: true,
           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
           borderWidth: 1
       },
        series: [{
            data: male,
            color: 'rgba(119, 152, 191, .5)',
            name: "Male"
        }, {
            data: female,
            color: 'rgba(223, 83, 83, .5)',
            name: "Female"
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
    if(propData.length > 10){
      for(var p in propData){
        if(propData[p].GENDER == 'm'){
          mdata.push([propData[p].HEIGHT, propData[p].WEIGHT, propData[p].COUNT]);
        }
      }
    }
    console.log("Male:", mdata);
    return mdata;
  },

  getFemaleData(propData){
    var mdata = [];
    if(propData.length > 10){
      for(var p in propData){
        if(propData[p].GENDER == 'f'){
          mdata.push([propData[p].HEIGHT, propData[p].WEIGHT, propData[p].COUNT]);
        }
      }
    }
    console.log("Female:", mdata);
    return mdata;
  },
  handleChange(event) {
    this.setState({year: event.target.value});
  },


  render() {
    return (
        <div>
          <div id="infobar" className="infobar">
            <center><b>Pick a Birthyear:</b>&nbsp;&nbsp;
              <input type="number" value={this.state.year} onChange={this.handleChange} onKeyPress={this._handleKeyPress}></input>
            </center>
          </div>
        <div id="container">

        </div>
        </div>
    )
  },
  _handleKeyPress: function(e) {
   if (e.key === 'Enter') {
     console.log('load new data for '+this.state.year);
     this.props.load(this.state.year)
   }
 },
})

const mapStateToProps = (state, _ownProps) => ({
  data: state.data
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  load: (year) => {
    dispatch(loadQueryDiversity(year))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)

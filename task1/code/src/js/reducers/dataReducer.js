const enrichData = (data) => {
  if("ZIP" in data[0]){
    console.log("zip data");
    console.log(data)
    let max = Math.max.apply(Math,data.map(function(o){return o.VALUE;}))
    let min = Math.min.apply(Math,data.map(function(o){return o.VALUE;}))
    console.log(max)
    data = data.map( (entry) => {
      return {
        ...entry,
        MAX: max,
        MIN: min,
      }
    })
    console.log(data)
    let dictData = {}
    data.forEach( (entry) => {
      dictData[entry.ZIP] = entry
    })
    return dictData
  }else{
    console.log("no zip data");
    return data;
  }

}

const data = (state=[], action) => {
  switch( action.type ){
    case 'REQUEST_SUCCESS':
      return enrichData(action.payload.data)
    default:
      return [...state]
  }
}

export default data

const contentdiv = document.getElementById("content");

function populateArrays(labels, series, classNames, console){
    labels.push(console.name)
    series.push(console.power)
    classNames.push(console.manufacturer)
}

function makeChart(labels, series, classNames, selector){
    new Chartist.Bar(selector, {
        labels: labels,
        series: [
          series
        ],
        classNames: classNames,
      }, {
        horizontalBars: true,
        axisY: {
            offset: 100
          },
    });
}

function makeGenChart(gen, data){
    const chartelt = document.createElement('div');
    chartelt.innerHTML = `<p>${gen}th Generation</p>`
    chartelt.id = `gen${gen}`
    contentdiv.appendChild(chartelt);

    let labels = []
    let series = []
    let classNames = []

    for(const console of data){
        populateArrays(labels, series, classNames, console)
    }

    makeChart(labels, series, classNames, `#gen${gen}`)
}

// all consoles together
{
    const chartelt = document.createElement('div');
    chartelt.innerHTML = `<p>All Devices</p>`
    chartelt.id = `allChart`
    chartelt.style = "height: 400px"
    contentdiv.appendChild(chartelt);
    let labels = []
    let series = []
    let classNames = []
    for(const console of data){
        populateArrays(labels, series, classNames, console)
    }
    makeChart(labels, series, classNames, `#${chartelt.id}`)
}

// by generation
const dataByGen = {

};
for(const console of data){
  if(dataByGen[console.gen] == undefined){
    dataByGen[console.gen] = []
  }  
  dataByGen[console.gen].push(console)

}

for(const [gen, data] of Object.entries(dataByGen)){
    makeGenChart(gen, data);
}
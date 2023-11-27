const contentdiv = document.getElementById("content");

function populateArrays(labels, series, console){
    labels.push(console.name)
    series.push({
        value: console.power,
        className: console.manufacturer,
        meta: console.manufacturer
    })
}

function makeChart(labels, series, selector){
    new Chartist.Bar(selector, {
        labels: labels,
        series: [
          series
        ],
      }, {
        horizontalBars: true,
        seriesBarDistance: 0,
        axisY: {
            offset: 120,
          },
        axisX: {
          labelInterpolationFnc: value => Math.round(value),
        },
        plugins: [
          Chartist.plugins.ctPointLabels({
            textAnchor: 'middle',
            labelInterpolationFnc: function(value) {return `${value}W`},
            labelOffset: {
              x: 0,
              y: 4
            },
          })
        ]
    });
}

function makeGenChart(gen, data){
    const chartelt = document.createElement('div');
    chartelt.innerHTML = `<p>${gen}th Generation</p>`
    chartelt.id = `gen${gen}`
    contentdiv.appendChild(chartelt);

    let labels = []
    let series = []

    for(const console of data){
        populateArrays(labels, series, console)
    }

    makeChart(labels, series, `#gen${gen}`)

    const axisLabel = document.createElement('span')
    axisLabel.innerHTML = "Power Consumption (Watts)"
    axisLabel.classList = ["axisLabel"]
    contentdiv.appendChild(axisLabel)
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
    for(const console of data){
        populateArrays(labels, series, console)
    }
    makeChart(labels, series, `#${chartelt.id}`)
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

const table = document.getElementById("references")
const rows = []
for(const console of data){
    rows.push(
        `<tr><td>${console.name}</td><td><a href="${console.ref}">${console.ref}</a></td></tr>`
    )
}
table.innerHTML += rows.join('')
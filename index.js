const contentdiv = document.getElementById("content");

function makeGenChart(gen, data){
    const chartelt = document.createElement('div');
    chartelt.id = `gen${gen}`
    contentdiv.appendChild(chartelt);

    let labels = []
    let series = []

    for(const console of data){
        labels.push(console.name)
        series.push(console.power)
    }

    new Chartist.Bar(`#gen${gen}`, {
        labels: labels,
        series: [
          series
        ]
      }, {

    });
}

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
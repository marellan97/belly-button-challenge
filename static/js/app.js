function buildMetadata(sample) {
    // Access the website and use d3 to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

      //Use the list of sample names to populate the select options
      d3.json(url).then((data) => {

      // Filter the data for the object with the desired sample number (the id)
        let metadata = data.metadata;
        let filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = filteredArray[0]

      // Select the panel with id of `#sample-metadata`
        let panel = d3.select("#sample-metadata");
  
      // Clear existing metadata - use `.html("")`
        panel.html("");

      // Append new tags for each key-value in the metadata
        for (key in result){
          panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
  
      // If you want to do the bonus, you can make the gauge chart here
  
  
    });
  }
  
  
  function buildCharts(sample) {
    // Access the website and use .then to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
      
      d3.json(url).then((data) => {
  
      // Filter the data for the object with the desired sample number (the id)
        let sampleData = data.samples;
        let res = sampleData.filter(sample_res => sample_res.id == sample);
        let data_res = res[0]

      // Pull the desired information (ids, labels, values) from your filtered data
        let otu_ids = data_res.otu_ids;
        let otu_labels = data_res.otu_labels;
        let sample_values = data_res.sample_values;
  
      // Build a Bubble Chart
        let bubble_chart = {
          y: sample_values,
          x: otu_ids,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "#FF4F00"
          }
        }

        let layout={
          margin: { t: 55, r: 35, l: 55, b: 65 },
          title:"Bacteria Culture per sample",
          hovermode:"closest",
          xaxis:{title:"OTU ID"},
          yaxis:{title:"Sample Value"},
       };
      var config = {responsive: true}
      Plotly.newPlot("bubble",[bubble_chart],layout,config);
    })
  };
   
      // Slice the data for your bar chart and order it (you can just use reverse)
      
  
      // Build a Horizontal Bar Chart
     
  function init() {
    // Get the reference to the dropdown menu
    let selector = d3.select("#selDataset");
  
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  
    // Use the list of sample names to populate the select options
    d3.json(url).then((data) => {

    // Do this by pulling the array associated with `names` 
      let idNames = data.names;

      // Loop through the names and append to the dropdown menu
      for (let i = 0; i < idNames.length; i++){
        selector.append("option").text(idNames[i]).property("value", idNames[i]);
      };

      // Use the first sample from the list to build the initial plots
      let firstSample = idNames[0]
      
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Change your data and update your plots/metadata when newSample is selected from the dropdown
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();



AWS.config.region = 'us-east-1'; // Region
AWS.config.update({
  accessKeyId: "yourAccessKey",
  secretAccessKey: "yourSecretKey",
  "region": "us-east-1" 
});

var dynamodb = new AWS.DynamoDB();
var params = { TableName: 'VoteAppAggregates' };

/* Create the context for applying the chart to the HTML canvas */
var ctx = $("#graph").get(0).getContext("2d");

/* Set the options for our chart */
var options = { segmentShowStroke : false,
								animateScale: true,
								percentageInnerCutout : 50,
                showToolTips: true,
                tooltipEvents: ["mousemove", "touchstart", "touchmove"],
                tooltipFontColor: "#fff",
								animationEasing : 'easeOutCirc'
              }

/* Set the initial data */
var init = [
  {
      value: 1,
      color: "#e74c3c",
      highlight: "#c0392b",
      label: "Red"
  },
  {
      value: 1,
      color: "#2ecc71",
      highlight: "#27ae60",
      label: "Green"
  },
  {
      value: 1,
      color: "#3498db",
      highlight: "#2980b9",
      label: "Blue"
  }
];

graph = new Chart(ctx).Doughnut(init, options);

$(function() {
  getData();
  $.ajaxSetup({ cache: false });
  setInterval(getData, 3000);
});

/* Makes a scan of the DynamoDB table to set a data object for the chart */
function getData() {
  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err);
      return null;
    } else {
      var redCount = 0;
      var greenCount = 0;
      var blueCount = 0;

      for (var i in data['Items']) {
        if (data['Items'][i]['VotedFor']['S'] == "RED") {
          redCount = parseInt(data['Items'][i]['Vote']['N']);
        }
        if (data['Items'][i]['VotedFor']['S'] == "GREEN") {
          greenCount = parseInt(data['Items'][i]['Vote']['N']);
        }
        if (data['Items'][i]['VotedFor']['S'] == "BLUE") {
          blueCount = parseInt(data['Items'][i]['Vote']['N']);
        }
      }

      var data = [
        {
            value: redCount,
            color:"#e74c3c",
            highlight: "#c0392b",
            label: "Red"
        },
        {
            value: greenCount,
            color: "#2ecc71",
            highlight: "#27ae60",
            label: "Green"
        },
        {
            value: blueCount,
            color: "#3498db",
            highlight: "#2980b9",
            label: "Blue"
        }
      ];

      /* Only update if we have new values (preserves tooltips) */
      if (  graph.segments[0].value != data[0].value ||
            graph.segments[1].value != data[1].value ||
            graph.segments[2].value != data[2].value
         )
      {
        graph.segments[0].value = data[0].value;
        graph.segments[1].value = data[1].value;
        graph.segments[2].value = data[2].value;
        graph.update();
      }

    }
  });
}

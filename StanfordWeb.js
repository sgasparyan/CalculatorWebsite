var newLegendClickHandler = function() {
	return;
    }
    var myChart = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'sans-serif';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.maintainAspectRation = false;

    // This is my Blank Chart which I will update 
    var myPieChart = new Chart(myChart, {
      type:'pie',
      data:{
	labels:['', ''],
	datasets:[{
	  data:[
	      0,
	      0,
	  ],
	   backgroundColor:[
	      
	     'rgba(255, 255, 255, 1.0)',
	     'rgba(255, 255, 255, 1.0)',
	  ],
	}]
      },
      options:{
	responsive: true,
	title:{
	  fontColor: '#FFF',
	  display:true,
	  text:'Predicted risk of pN+ disease',
	  fontSize:25
	},
	legend:{
	  onClick: newLegendClickHandler,
	  display:true,
	  position:'bottom',
	  labels:{
	    fontColor:'#000'
	  }
	},
	plugins:{
	    datalabels: {
		color: '#FFF',
		anchor: 'end',
		align: 'start',
		offset: -10,
		borderWidth: 2,
		borderColor: '#fff',
		borderRadius: 25,
		backgroundColor: (context) => {
			return context.dataset.backgroundColor;
		},
		font: {
			weight: 'bold',
			size: '18'
		},
		formatter: (value) => {
			return value + '%';
		}
	    }
	},
	layout:{
	  padding:{
	    left:20,
	    right:0,
	    bottom:0,
	    top: 0
	  }
	},
	tooltips:{
	  enabled:false
	}
      }
    });
    // This function handles computing the percentage and updating the Chart
    // It uses switch statements to get the user input
function computeResult(){
    let sum = -1.101;                
    switch(document.getElementById("stage").value){
	case 'T2, not otherwise specified (NOS)':
	    break;
	case 'T2a':
	    sum = sum - 0.352;
	    break;
	case 'T2b':
	    sum = sum + 0.330;
	    break;
	case 'T3':
	    sum = sum - 0.094;
	    break;
	case 'T4':
	    sum = sum - 0.082;
	    break;
	default:
	    break;
    }
    switch(document.getElementById("location").value){
	case 'Not specified':
	    break;
	case 'Trigone/ureter/bladder neck':
	    sum  = sum + 0.183;
	    break;
	case 'Lateral wall or dome':
	    sum = sum - 0.113;
	    break;
	case 'Overlapping/multiple sites':
	    sum = sum + 0.185;
	    break;
	default:
	    break;
    }
    switch(document.getElementById("invasion").value){
	case 'Not specified':
	    break;
	case 'No':
	    sum = sum - 0.788;
	    break;
	case 'Yes':
	    sum = sum + 1.083;
	    break;
	default:
	    break;
    }
    switch(document.getElementById("size").value){
	case 'Not specified':
	    break;
	case '<= 2 cm':
	    sum = sum- 0.198;
	    break;
	case '> 2 cm and <= 4 cm':
	    sum = sum + 0.223;
	    break;
	case '> 4 cm and <= 6 cm':
	    sum = sum + 0.362;
	    break;
	case '> 6 cm':
	    sum = sum + 0.564;
	    break;
	default:
	    break;
    }
    // Error Handling for Textbox
    if(document.fifth.five.value.length == 0){
	document.Result.result.value = 'Enter your age';
	return;
    } else if((isNaN(document.fifth.five.value)) || (document.fifth.five.value < 1) || (document.fifth.five.value > 120)){
	document.Result.result.value = 'Not a valid age';
	return;
    }
    sum = sum - (0.008 * document.fifth.five.value);

    switch(document.getElementById("sex").value){
	case 'Male':
	    break;
	case 'Female':
	    sum = sum + 0.142;
	    break;
	default:
	    break;
    }
    sum = sum + (13*0.014);
    sum = Math.pow(Math.E, sum);
    // Result of Calculation
    let sol = Math.round(100*(sum/(1 + sum)));
    // Final Percentage Written to textbox
    document.Result.result.value = sol + " % ";
    // Update Chart
    myPieChart.data.datasets[0].data[0] = sol;
    myPieChart.data.datasets[0].data[1] = 100 - sol;
    myPieChart.data.datasets[0].backgroundColor[0] = 'rgba(255, 0, 0, 1.0)';
    myPieChart.data.datasets[0].backgroundColor[1] = 'rgba(51, 155, 255, 1.0)';
    myPieChart.data.labels[0] = 'predicted probability of involved nodes'; 
    myPieChart.data.labels[1] = 'predicted probability of negative nodes'; 
    myPieChart.options.plugins.datalabels.color = '#000';
    myPieChart.options.title.fontColor = '#000';
    myPieChart.update();
}

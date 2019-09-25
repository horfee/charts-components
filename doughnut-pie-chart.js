import {ChartComponent} from './chart-component.js';

export class PieChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "pie"
    		},

    		_datasetProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ "weight" ]
    		},

    		_datasetIndexableProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ 
	    			"backgroundColor", "borderAlign", "borderColor",
					"borderWidth", "hoverBackgroundColor", "hoverBorderColor",
					"hoverBorderWidth"
    			]
    		}
    	});
	};
}

export class DoughnutChart extends PieChart {

	static get properties() {
    	return Object.assign(PieChart.properties, {
    		_type: {
    			type: String,
    			value: "doughnut"
    		}
    	});
	};
}


window.customElements.define('doughnut-chart', DoughnutChart);
window.customElements.define('pie-chart', PieChart);

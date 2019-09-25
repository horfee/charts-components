import {LineChart} from './line-chart.js';

export class ScatterChart extends LineChart {

	static get properties() {
    	return Object.assign(LineChart.properties, {
    		_type: {
    			type: String,
    			value: "scatter"
    		},

    		_datasetProperties: {
    			type: Array,
    			readOnly: true,
    			value: []
    		},

    		_datasetIndexableProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ 
    				"backgroundColor","borderAlign",
    				"borderColor","borderWidth",
    				"hoverBackgroundColor","hoverBorderColor",
    				"hoverBorderWidth"]
    		}
    	});
	};


}

window.customElements.define('scatter-chart', ScatterChart);

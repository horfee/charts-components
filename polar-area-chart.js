import {ChartComponent} from './chart-component.js';

export class PolarAreaChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "polarArea"
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
    				"backgroundColor",
					"borderAlign",
					"borderColor",
					"borderWidth",
					"hoverBackgroundColor",
					"hoverBorderColor",
					"hoverBorderWidth"
					]
    		}
    	});
	};





}

window.customElements.define('polararea-chart', PolarAreaChart);

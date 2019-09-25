import {ChartComponent} from './chart-component.js';

export class AreaChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "area"
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

window.customElements.define('area-chart', AreaChart);

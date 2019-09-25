import {ChartComponent} from './chart-component.js';

export class BarChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "bar"
    		},

    		_datasetProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ "xAxisID", "yAxisID" ]
    		},

    		_datasetIndexableProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ "borderColor", "backgroundColor", "borderSkipped", 
    			"borderWidth", "hoverBackgroundColor", "hoverBorderColor",
    			"hoverBorderWidth"]
    		}
    	});
	};




}

window.customElements.define('bar-chart', BarChart);

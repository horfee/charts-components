import {ChartComponent} from './chart-component.js';

export class RadarChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "radar"
    		},

    		_datasetProperties: {
    			type: Array,
    			readOnly: true,
    			value: [
					"backgroundColor", "borderCapStyle", "borderColor",
					"borderDash", "borderDashOffset", "borderJoinStyle",
					"borderWidth", "fill", "lineTension"
    			]
    		},

    		_datasetIndexableProperties: {
    			type: Array,
    			readOnly: true,
    			value: [ 
					"pointBackgroundColor", "pointBorderColor", "pointBorderWidth",
					"pointHitRadius", "pointHoverBackgroundColor", "pointHoverBorderColor",
					"pointHoverBorderWidth", "pointHoverRadius", "pointRadius",
					"pointRotation", "pointStyle"
    			]
    		}
    	});
	};

}





window.customElements.define('radar-chart', RadarChart);

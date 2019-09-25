import {ChartComponent} from './chart-component.js';

export class LineChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "line"
    		},

    		_datasetProperties: {
    			type: Array,
    			readOnly: true,
    			value: [
					"backgroundColor", "borderCapStyle", "borderColor",
					"borderDash", "borderDashOffset", "borderJoinStyle",
					"borderWidth", "cubicInterpolationMode", "fill",
					"lineTension", "showLine", "spanGaps",
					"steppedLine", "xAxisID", "yAxisID"]
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








window.customElements.define('line-chart', LineChart);

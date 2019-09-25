import {ChartComponent} from './chart-component.js';

export class BubbleChart extends ChartComponent {

	static get properties() {
    	return Object.assign(ChartComponent.properties, {
    		_type: {
    			type: String,
    			value: "bubble"
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
                    "borderColor",
                    "borderWidth",
                    "hoverBackgroundColor",
                    "hoverBorderColor",
                    "hoverBorderWidth",
                    "hoverRadius",
                    "hitRadius",
                    "pointStyle",
                    "rotation",
                    "radius"
                    ]
    		}
    	});
	};


}



window.customElements.define('bubble-chart', BubbleChart);

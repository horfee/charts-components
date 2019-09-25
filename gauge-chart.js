import {DoughnutChart} from './doughnut-pie-chart.js';

export class GaugeChart extends DoughnutChart {

	static get properties() {
    	return Object.assign(DoughnutChart.properties, {
    		_type: {
    			type: String,
    			value: "doughnut"
    		}
    	});
	};


	__processOptions() {
		var res = super.__processOptions();

		Object.assign(res, {
			circumference: (1 + 1/3) * Math.PI,
            rotation: (1 - (1/3)/2) * Math.PI,
            cutoutPercentage: 75
        });
		return res;
	}


}

window.customElements.define('gauge-chart', GaugeChart);

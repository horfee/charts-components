import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'Chart.js';
import {camelToDashCase, dashToCamelCase} from '@polymer/polymer/lib/utils/case-map.js';



/**
 * `chart-components`
 * Chart.js web component
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class ChartComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div class="chart-container" id="cont" style="position: relative;">
        <canvas id="canvas" width="{{canvas-width}}" height="{{canvas-height}}" aria-label="{{title}}" role="img"></canvas>
      </div>
      <div style="display: none">
        <slot id="slot"></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      _chart: {
        type: Object,
        readOnly: true,
        value : null
      },

      canvasWidth: {
        type: Number,
        notify: true
      },

      canvasHeight: {
        type: Number,
        notify: true
      },

      chartTitle: {
        type: String,
        notify: true,
        value: undefined,
        reflectToAttribute: true,
        observer: "_onTitleChanged"
      },

      titlePosition: {
        type: String,
        notify: true,
        value: "top",
        reflectToAttribute: true,
        observer: "_onTitleChanged"
      },

      displayTitle: {
        type: Boolean,
        notify: true,
        value: true,
        reflectToAttribute: true,
        observer: "_onTitleChanged"
      },


      _datasetProperties: {
        type: Array,
        readOnly: true,
        value:[]
      },

      _datasetIndexableProperties: {
        type: Array,
        readOnly: true,
        value: []
      }
    };
  }


  _resolveAttribute(dataset, attribute) {
    var res = {};
    if ( dataset.hasAttribute(camelToDashCase(attribute)) ) {
      res[attribute] = dataset.attributes[camelToDashCase(attribute)].nodeValue;
    }
    
    return res;
  }

  __processLabels() {
    var labels = Array.from(this.children).filter( lb => lb.tagName === "LABEL");
    return [labels.map( label => label.innerHTML), labels];
  }

  __processData() {
    var data = {
      datasets: [],
      __datasetRefNodes: [],
      labels: []
    };
    data.labels = this.__processLabels();
    data.__labelRefNodes = data.labels[1];
    data.labels = data.labels[0];

    var ds = Array.from(this.children).filter( ds => ds.tagName === "UL");
    ds.forEach( (dataset) => {
      
      data.datasets.push(this.__processDS(dataset));
      data.__datasetRefNodes.push(dataset);
    });

    return data;
  }

  __processDS(dataset) {
    var serieName = Array.from(dataset.childNodes).filter( c => c.nodeName === "#text").map(n => n.textContent).join(" ").trim();  
    var subdata = Array.from(dataset.childNodes).filter( c => c.tagName === "LI").map( d => d.innerHTML);
    var subdataRefNodes = Array.from(dataset.childNodes).filter( c => c.tagName === "LI");
    var res = { label: serieName, data: subdata, __dataRefNodes: subdataRefNodes, __refNode: dataset };

    var props = this._datasetIndexableProperties.concat(this._datasetProperties);
    props.forEach( p => Object.assign(res, this._resolveAttribute(dataset, p)));

    if ( dataset.hasAttribute("dataset-type") ) {
      res.type = dataset.attributes["dataset-type"].nodeValue;
    }
    
    props = this._datasetIndexableProperties;
    props.forEach( (prop) => {
      var propNode = Array.from(dataset.childNodes).filter( 
        c => c.tagName === "UL" && (c.hasAttribute(camelToDashCase(prop))|| c.hasAttribute(dashToCamelCase(prop)))
        );

      if ( propNode && propNode.length > 0 ) {
        res[prop] = Array.from(propNode[0].children).filter( c => c.tagName === "LI").map( li => li.innerHTML);
      }
    });
    Object.assign(res, this.__processDataSet(dataset));
    return res;
  }

  __processDataSet(dataset) {
    return {};
  }

  __processOptions() {
    var options = {};
    Object.assign(options, this.__getTitleOption());
    return options;
  }


  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  __getTitleOption() {
    var options = {
      title: {
        display: this.displayTitle,
        text: this.chartTitle,
        position: this.titlePosition
      }
    };

    if ( options.title.text == undefined ) delete options.title.text;
    return options;
  }

  ready() {
    super.ready();
    
    var ctx = this.$.canvas;

    this._set_chart(new Chart(ctx, {
      type: this._type,
      data: this.__processData(),
      options: this.__processOptions()
    }));

    this._observer = new MutationObserver( (MutationList, observer) => {
      MutationList.forEach( (mutationRecord) => {
        console.log(mutationRecord);
        mutationRecord.addedNodes.forEach( (node) => {
          if ( node.tagName === "LABEL" ) {
            // find the previous label
            var tmp = node.previousElementSibling;
            while ( tmp != null && tmp.tagName !== "LABEL" ) tmp = tmp.previousElementSibling;
            if ( tmp == null ) {
              this._chart.data.labels.splice(0,0, node.innerHTML);
              this._chart.data.__labelRefNodes.splice(0,0, node);
            } else {
              var idx = this._chart.data.__labelRefNodes.indexOf(tmp) + 1;
              this._chart.data.labels.splice(idx,0, node.innerHTML);
              this._chart.data.__labelRefNodes.splice(idx,0, node);
            }
          } else if ( node.tagName === "UL" ) {
            var tmp = mutationRecord.previousSibling;
            while ( tmp != null && (ds.__datasetRefNodes.indexOf(tmp)) == -1) tmp = tmp.previousSibling;
            if ( tmp == null ) {
              this._chart.data.datasets.splice(0,0, this.__processDS(node));
              this._chart.data.__datasetRefNodes.splice(0,0, node);
            }
          } else if ( node.tagName === "LI" ) {
            var datasetIndex = this._chart.data.__datasetRefNodes.indexOf(mutationRecord.target);
            var ds = this._chart.data.datasets[datasetIndex];

            var tmp = mutationRecord.previousSibling;
            while ( tmp != null && (ds.__dataRefNodes.indexOf(tmp)) == -1) tmp = tmp.previousSibling;
            if ( tmp == null ) {
              ds.data.splice(0,0, node.innerHTML);
              ds.data.splice(0,0, node);
            } else {
              var idx = ds.__dataRefNodes.indexOf(tmp) + 1;
              ds.data.splice(idx, 0, node.innerHTML);
              ds.__dataRefNodes.splice(idx, 0, node);
            }
          } else if ( mutationRecord.target.tagName === "LI" ) {
            // here we modified a data value
            var datasetIndex = this._chart.data.__datasetRefNodes.indexOf(mutationRecord.target.parentNode);
            if ( datasetIndex == -1 ) return;

            var ds = this._chart.data.datasets[datasetIndex];
            var idx = ds.__dataRefNodes.indexOf(mutationRecord.target);
            if ( idx == -1 ) return;

            ds.data[idx] = node.nodeValue;
            ds.__dataRefNodes[idx] = mutationRecord.target;
          }
        });

        mutationRecord.removedNodes.forEach( (node) => {
          // here we are modifying a data, so we should not go through remove process
          if ( mutationRecord.addedNodes.length > 0 ) return;

          if ( node.tagName === "LABEL" ) {
            var idx = this._chart.data.__labelRefNodes.indexOf(node);
            if ( idx == -1 ) return;

            this._chart.data.labels.splice(idx, 1);
            this._chart.data.__labelRefNodes.splice(idx, 1);
          } else if ( node.tagName === "UL" ) {
            var idx = this._chart.data.__datasetRefNodes.indexOf(node);
            if ( idx == -1 ) return;

            this._chart.data.__datasetRefNodes.splice(idx, 1);
            this._chart.data.datasets.splice(idx, 1);
          } else if ( node.tagName === "LI" ) {
            var targetNode = mutationRecord.target;
            var datasetIndex = this._chart.data.__datasetRefNodes.indexOf(targetNode);
            if ( datasetIndex == -1 ) return;
            var ds = this._chart.data.datasets[datasetIndex];
            var idx = ds.__dataRefNodes.indexOf(node);

            if ( idx == -1 ) return;
            ds.data.splice(idx, 1);
            ds.__dataRefNodes.splice(idx, 1);
          }
        });
      });
      this._chart.update();
    });
    this._observer.observe(this, {childList: true, subtree: true, attributes: true});


  }

  _onTitleChanged(oldValue, newValue) {
    if ( this._chart && this._chart.options && this.title != undefined) {
      Object.assign(this._chart.options.title, this.__getTitleOption());
    }
  }

}

<template>
    <div id="tSNEplot" weight="100%"></div>
</template>

<script>
  import Plotly from 'plotly.js/dist/plotly'
  import { GET_PLOT_DATA } from '../store/actions'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'vue-plot',
    template: '<div></div>',
    computed: {
      ...mapGetters({plot: 'getPlotData'}),
      ...mapState(['opacity'])
    },
    watch: {
      /**
       * When the opacity variable is changed, call createPlot to create a new plot.
       */
      opacity (value) {
        this.createPlot(value)
      }
    },

    /**
     * Get the plot data, when it is available: call createPlot function with opacity param 1.
     */
    mounted: function () {
      this.$store.dispatch(GET_PLOT_DATA).then(() => {
        this.createPlot(1)
      })
    },
    methods: {
      /**
       * Create a new plot
       * @param opacity
       */
      createPlot (opacity) {
        var dataplot = this.plot.split('V5')[1]
        var count = 0
        var d = dataplot.split(/[ ,\n"]+/)
        var xList = []
        var yList = []
        var colList = []
        var sampleID = []
        var sampleDescription = []
        var alpha = []
        var unique = []
        var uniqueName = []

        if (d[0] === '') {
          count = 1
        }

        // For every line in the data, save every column in a different list.
        var columnCounter = 0
        for (var i = count; i < d.length; i++) {
          if (columnCounter === 6) {
            columnCounter = 0
          } else if (columnCounter === 1) {
            xList.push(parseFloat(d[i]))
          } else if (columnCounter === 2) {
            yList.push(parseFloat(d[i]))
          } else if (columnCounter === 3) {
            if (!colList.includes(parseInt(d[i]))) {
              unique.push(parseInt(d[i]))
            }
            colList.push(parseInt(d[i]))
          } else if (columnCounter === 4) {
            sampleID.push(d[i])
          } else if (columnCounter === 5) {
            if (!sampleDescription.includes(d[i])) {
              uniqueName.push(d[i])
            }
            sampleDescription.push(d[i])
          }
          columnCounter += 1
        }

        // Get opacity values
        for (var j = 0; j < xList.length + 1; j++) {
          alpha.push(opacity[j])
        }

        var aantalClusters = unique.length
        var traces = []
        // For every cluster, get data in right order
        for (var clusterI = 1; clusterI < aantalClusters + 1; clusterI++) {
          var groupID = unique[clusterI - 1]
          var tempListx = []
          var tempListy = []
          var tempListID = []
          var tempListAlpha = []
          var index = -1

          while ((index = colList.indexOf(clusterI, index + 1)) !== -1) {
            tempListx.push(xList[index])
            tempListy.push(yList[index])
            tempListID.push(sampleID[index])
            tempListAlpha.push(alpha[index])
          }

          // Create per cluster a traces value
          traces.push({
            x: tempListx,
            y: tempListy,
            mode: 'markers',
            type: 'scatter',
            name: uniqueName[groupID - 1],
            text: tempListID,
            marker: {
              size: 12,
              colorscale: 'Jet',
              opacity: tempListAlpha,
              hoverinfo: 'x+y+text'
            }
          })
        }

        // Create a layout value
        var layout = {
          title: 'tSNE',
          xaxis: {
            title: 'tSNE dim 1'
          },
          yaxis: {
            title: 'tSNE dim 2'
          },
          hovermode: 'closest',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          autosize: false,
          width: 1100,
          margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
          }
        }

        // Create a plot with traces and layout.
        Plotly.newPlot('tSNEplot', traces, layout)
      }
    }

  }

</script>

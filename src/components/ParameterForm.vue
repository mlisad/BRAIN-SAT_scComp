<template>
  <div id="inputs">
    <typeahead :options="options" v-model="selected"></typeahead>
    <div class="panel-body">
      <div class="col-md-4 col-md-offset-8 input-group pull-right">
        <span class="input-group-btn">
          <button id="searchGenetSne" class="btn btn-default" type="button">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </div>

      <br/>
    </div>
  </div>
</template>

<script>
  import { GET_PLOT_ALPHA, GET_PLOT_GENES } from '../store/actions'
  import { SET_OPACITY } from '../store/mutations'
  import utils from '../utils'
  import { mapState } from 'vuex'
  import Typeahead from './Typeahead.vue'

  /**
   * Create form for the parameter gene.
   */
  export default {
    name: 'parameter-form',
    components: {
      Typeahead
    },
    computed: {
      ...mapState(['genes'])
    },
    /**
     * beforeCreate is used to get all available genes from store.
     */
    beforeCreate: function () {
      this.$store.dispatch(GET_PLOT_GENES).then(() => {
        this.createObject()
      })
    },
    /**
     * Create variables
     */
    data () {
      return {
        selected: null,
        options: [],
        gene: this.selected
      }
    },
    watch: {
      /**
       * If a gene is selected in typeahead, set gene value
       */
      selected (value) {
        if (value !== '') {
          this.gene = this.options[value].text
        }
      },
      /**
       * If the gene param value changes, update ALPHA value
       */
      gene (value) {
        if (value !== '') {
          // Get new alpha values for the selected gene.
          this.$store.dispatch(GET_PLOT_ALPHA, value).then(() => {
            const geneData = this.$store.state.data.alpha || {}
            this.$store.commit(SET_OPACITY, utils.calculateOpacity(geneData))
          })
        } else {
          // Set opacity back to 1
          this.$store.commit(SET_OPACITY, 1)
        }
      }
    },
    /**
     * Get gene names and add it to typeahead.
     */
    methods: {
      createObject () {
        for (var i = 0; i < this.genes.length; i++) {
          var obj = {}
          obj.id = i
          obj.text = this.genes[i]
          this.options.push(obj)
        }
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>

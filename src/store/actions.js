import { get } from '@molgenis/molgenis-api-client'
import { SET_PLOT_DATA, SET_PLOT_ALPHA, SET_PLOT_GENES } from './mutations'

export const GET_PLOT_DATA = '__GET_PLOT_DATA__'
export const GET_PLOT_ALPHA = '__GET_PLOT_ALPHA__'
export const GET_PLOT_GENES = '__GET_PLOT_GENES__'

const INITIAL_STATE = window.__INITIAL_STATE__ || {}
const geneList = []

export default {

  [GET_PLOT_DATA] ({commit}) {
    /**
     * Get the data of selected study
     */
    var options = INITIAL_STATE
    console.log(INITIAL_STATE)
    return get('/scripts/singleCellAnalysis/run?entityName=base_' + options + '&targetFile=base_' + options + 'Targets').then(response => {
      return response.text().then(function (text) {
        commit(SET_PLOT_DATA, text)
      })
    }, error => {
      console.log(error)
    })
  },

  [GET_PLOT_GENES] ({commit}) {
    /**
     * Get a list of available genes for the selected study
     */
    var options = INITIAL_STATE
    return get(`/api/v2/base_${options}?num=10000`).then(function (text2) {
      var it = text2.items
      for (var j = 0; j < it.length; j++) {
        geneList.push(it[j].geneSym)
      }
      commit(SET_PLOT_GENES, geneList)
    }, error => {
      console.log(error)
    })
  },

  [GET_PLOT_ALPHA] ({commit}, gene) {
    /**
     * Get the data of selected study for the selected gene
     */
    var opt2 = INITIAL_STATE
    return get(`/api/v2/base_${opt2}?q=geneSym==${gene}`).then(response => {
      commit(SET_PLOT_ALPHA, response.items[0])
    }, error => {
      console.log(error)
    })
  }

}

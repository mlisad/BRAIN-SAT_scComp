export const SET_OPACITY = '__SET_OPACITY__'
export const SET_PLOT_DATA = '__SET_PLOT_DATA__'
export const SET_PLOT_ALPHA = '__SET_PLOT_ALPHA__'
export const SET_PLOT_GENES = '__SET_PLOT_GENES__'

export default {
  /**
   * Set the data in state
   */
  [SET_OPACITY] (state, opacity) {
    state.opacity = opacity
  },
  [SET_PLOT_DATA] (state, data) {
    state.data.plot = data
  },
  [SET_PLOT_ALPHA] (state, data) {
    state.data.alpha = data
  },
  [SET_PLOT_GENES] (state, data) {
    state.genes = data
  }
}

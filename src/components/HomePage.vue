<template>
  <div class="homepage">
    <div>
      <parameter-form></parameter-form>
    </div>
    <plot></plot>
  </div>
</template>
<script>
  import ParameterForm from './ParameterForm.vue'
  import Plot from './Plot.vue'

  /**
   * Template for the homepage, contains parameterform and plot.
   */
  export default {
    name: 'home-page',
    components: {
      ParameterForm,
      Plot
    }

  }
</script>

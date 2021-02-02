<template>
  <div class="mock">
    <v-stepper v-model="el">
      <v-stepper-header>
        <div v-for="stage in stages" :key="stage.sequence">
          <v-stepper-step :step="stage.sequence">
            Stage {{ stage.name }}
          </v-stepper-step>

          <v-divider v-if="!isLast(stage.sequence)"></v-divider>
        </div>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="stage in stages"
          :key="stage.sequence"
          :step="stage.sequence"
        >
          <v-card class="mb-12" color="lighten-1">
            <stage-builder></stage-builder>
          </v-card>

          <v-btn color="primary" @click="stepElement()"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import StageBuilder from './StageBuilder.vue';

export default {
  components: { StageBuilder },
  props: {
    stages: Array,
  },
  name: "Stages",
  data() {
    return { el: 1 };
  },
  methods: {
    isLast(sequence) {
      return this.stages.length === sequence;
    },
    stepElement() {
      this.el += 1;
    },
  },
  created() {
    this.step = 1;
  },
};
</script>

<style>
    .stage-stepper {
        
    }
    
</style>
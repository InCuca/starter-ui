<template>
  <v-container>
    <v-row class="text-center my-10">

      <h1> Starter Manager </h1>

      <!-- <v-row v-if="!currentStep.answer"> 
           <v-text-field
            v-model="currentStep.answer"
            :label="label"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
      </v-row> -->  

    </v-row>
    <v-row class="mock" align="center" justify="center">
      <stages :stages="stages" style="width: 100%;">
      </stages>
    </v-row>
    
  </v-container>
</template>

<script>
  // const types = ["One", "Two", "Three"];
  import Stages from "./Stages.vue";

  export default {
    name: 'Manager',
    data() {
      return {
        stages:[ 
          { name: 'one', sequence: 1},
          { name: 'two', sequence: 2},
          { name: 'three', sequence: 3},
          ]
      }
    },
    components: {
      Stages
    },
    created() {
    }

  }
</script>

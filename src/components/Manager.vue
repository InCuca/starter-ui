<template>
  <v-container>
    <v-row class="text-center my-10">
      <h1> Starter Manager </h1>
    </v-row>

    <v-row v-if="stages.length === 0" align="center" justify="center">
      <stage-plan :save-handler="saveHandler" style="width: 100%;"></stage-plan>
    </v-row>

    <v-row v-if="stages.length > 0" align="center" justify="center">
      <stages :stages="stages" :finish="finish" :save-stage="saveStage" style="width: 100%;">
      </stages>
    </v-row>
  </v-container>
</template>

<script>
  import StagePlan from './StagePlan.vue';
  import Stages from "./Stages.vue";

  import { mapActions, mapGetters } from "vuex";

  export default {
    name: 'Manager',
    data() {
      return {}
    },
    computed: {
      ...mapGetters('stage', ['stages', 'handler'])
    },
    components: {
      Stages,
        StagePlan
    },
    methods: {
      ...mapActions('stage', ['saveHandler', 'saveStage', 'finish']),
    }
  }
</script>

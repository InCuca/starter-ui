<template>
  <div>
    <v-form ref="plan" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="handler.name"
              label="Handler Name"
              required
              :rules="[(v) => !!v || 'Name is required']"
              placeholder="incuca"
            ></v-text-field>

            <v-text-field
              v-model="handler.version"
              label="Handler Version"
              required
              :rules="[(v) => !!v || 'Version is required']"
              placeholder="1.0.0"
            ></v-text-field>

            <v-divider class="my-6"></v-divider>

            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="stage.name"
                  label="Stage Name"
                  ref="stageName"
                  v-on:keyup.enter="addStage()"
                  placeholder="Frontend"
                ></v-text-field>
                <div class="d-flex justify-end">
                  <v-btn @click="addStage()">ADD STAGE</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-divider class="my-6"></v-divider>

            <div class="d-flex justify-end" v-if="isValidStages">
              <v-btn @click="saveStagePlan()">SAVE PLAN </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-row v-if="isValidStages" class="my-6 mock">
      
      <v-col class="flex justify-center">
        <v-btn
          v-for="(stage, index) in handler.stages"
          :key="index"
          class="ma-2"
          color="red"
          dark
          @click="removeStage(stage)"
        >
          {{ stage.name }}
          <v-icon dark right> mdi-minus-circle </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    saveHandler: Function,
  },
  computed: {
    isValidStages() {
      return this.handler.stages.length > 0;
    },
  },
  data() {
    return {
      valid: true,
      sequence: 0,
      stage: {
        name: "Frontend",
        sequence: 0,
      },
      handler: {
        name: "incuca",
        version: "1.0.0",
        stages: [],
      },
    };
  },
  methods: {
    saveStagePlan() {
      if (!this.validate()) return;
      const stages = this.handler.stages;
      const saveStages = [];

      stages.forEach( (stage, index) => {
        stage.sequence = index + 1;
        saveStages.push(stage);
      });

      const handler = { ...this.handler };
      handler.stages = saveStages;

      this.saveHandler(handler);

      this.reset();
    },
    addStage() {
      if (!this.validate()) return;
      
      const stage = { ...this.stage };

      this.handler.stages.push(stage);
      this.clearStage();
    },
    validate() {
      return this.$refs.plan.validate();
    },
    reset() {
      this.$refs.plan.reset();
    },
    clearStage() {
      this.stage.name = "";
      this.stage.sequence = 0;
    },
    removeStage( st ) {
      this.handler.stages = this.handler.stages.filter(stage => st.name !== stage.name );
    }
  },
};
</script>

<style>
</style>
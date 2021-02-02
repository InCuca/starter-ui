<template>
  <div>
    <div>
      <v-form 
        ref="form" 
        v-model="valid"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="question.propertyName"
                label="Tag"
                required
                :rules="tagRules"
              ></v-text-field>

              <div class="d-flex justify-end">
                <v-switch v-model="question.isMeta" label="Is Meta"></v-switch>
              </div>
              

              <v-row v-if="question.isMeta">
                <v-col cols="12" md="12">
                  <v-select
                    :items="questions.map( ({ propertyName }) => propertyName)"
                    v-model="question.metaParent"
                    label="Tag Parent"
                    :rules="metaRules"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-divider class="my-6"></v-divider>

              <v-select
                :items="types"
                v-model="question.type"
                required
                label="Question Type"
                :rules="questionTypeRules"
              >
              </v-select>

              <v-row v-if="hasOptions">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="option.key"
                    label="Key"
                    ref="okey"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="option.value"
                    label="Value"
                    ref="ovalue"
                    required
                    v-on:keyup.enter="addOption()"
                  ></v-text-field>
                  <div class="d-flex justify-end">
                    <v-btn @click="addOption()">ADD OPTION</v-btn>
                  </div>
                  
                </v-col>
              </v-row>

              <v-text-field
                v-model="question.description"
                label="Question"
                required
                :rules="questionRules"
              ></v-text-field>

              <v-divider class="my-6"></v-divider>

              <div class="d-flex justify-end" v-if="valid">
                <v-btn @click="addQuestion()">SAVE QUESTION </v-btn>
              </div>
            </v-col>
            <v-col>
                <div v-if="questions.length > 0">
                  <div v-for="(q, index) in questions" :key="index">
                    {{ q.propertyName }} <v-btn @click="removeQuestion(q)"> X </v-btn>
                  </div>
                </div>
            </v-col>            
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { TYPES, SELECT, CHECKBOX } from "../helpers/types.js";

export default {
  name: "StageBuilder",
  computed: {
    types() {
      return TYPES;
    },
  },
  watch: {
    "question.type": function (value) {
      const arr = [SELECT, CHECKBOX];
      this.hasOptions = arr.find((option) => option === value);
    },
  },
  data() {
    return {
      tagRules: [
        v => !!v || 'Tag is required',
        v => (v && v.length >= 3) || 'Tag must be less than 3 characters',
      ],
      questionTypeRules: [
        v => (v && v.length <= 20) || 'Question type is required',
      ],
      questionRules: [
        v => !!v || 'Tag is required',
        v => (v && v.length <= 120) || 'Tag must be less than 120 characters',
      ],
      metaRules: [
        v => !!v ||'Meta Parent is required',
      ],
      valid: false,
      questions: [],
      hasOptions: false,
      option: { key: "", value: "" },
      question: {
        propertyName: "",
        description: "",
        type: "",
        isMeta: false,
        metaParent: "",
        options: [],
      },
    };
  },
  methods: {
    addQuestion() {
      const repeat = this.questions.find(
        (q) => this.question.propertyName === q.propertyName
      );

      if (!this.validate()) return;

      

      if (!repeat) {
        let newQuestion = { ...this.question };
        this.questions.push(newQuestion);

        // this.clearQuestion();
        this.reset();
      }
    },
    removeQuestion(question) {
      this.questions = this.questions.filter(
        (q) => question.propertyName !== q.propertyName
      );
    },
    addOption() {
      const repeat = this.question.options.find(
        (q) => this.option.key === q.key
      );

      if (!repeat) {
        let newOption = { ...this.option };

        this.question.options.push(newOption);

        this.clearOption();
      }
    },
    clearOption() {
      this.option.key = "";
      this.option.value = "";
    },
    clearQuestion() {
      this.question.propertyName = "";
      this.question.description = "";
      this.question.type = "";
      this.question.options = [];
      this.isMeta = false;
      this.metaParent = "";
    },
    validate () {
        return this.$refs.form.validate();
    },
    reset () {
        return this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>
<template>
  <v-container fluid class="fill-height grey">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          v-if="!submitted"
          width="460"
        >
          <v-card-text class="text-center px-12 py-16">
            <div class="text-h4 font-weight-black mb-6">
              Add Tutorial
            </div>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="tutorial.title"
                :rules="[(v) => !!v || 'Title is required']"
                label="Title"
                clearable
                required
              ></v-text-field>
              <v-text-field
                v-model="tutorial.description"
                :rules="[(v) => !!v || 'Description is required']"
                label="Description"
                clearable
                required
              ></v-text-field>
              <v-btn color="primary" class="mt-3" @click="saveTutorial" block x-large>Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>
            Submitted successfully!
          </v-card-title>
          <v-card-subtitle>
            Click the button to add new Tutorial.
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="success" @click="newTutorial" block>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TutorialDataService from '../api/index.js'
export default {
  name: "add-tutorial",
  data(){
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods:{
    saveTutorial(){
      const data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };
      TutorialDataService.create(data)
        .then((res) => {
          this.tutorial.id = res.data.id;
          console.log(res.data);
          this.submitted = true;
        })
        .catch(e => console.log(e));
    },
    newTutorial(){
      this.submitted = false;
      this.tutorial = {};
    },
  },
}
</script>

<style>

</style>
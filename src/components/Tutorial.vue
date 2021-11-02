<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card width="300"  v-if="currentTutorial">
          <v-card-text class="text-center px-12 py-16">
            <div class="text-h4 font-weight-black mb-6">
              Edit Tutorial
            </div>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="currentTutorial.title"
                  :rules="[(v) => !!v || 'Title is required']"
                  label="Title"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="currentTutorial.description"
                  :rules="[(v) => !!v || 'Description is required']"
                  label="Description"
                  required
                ></v-text-field>

                <label><strong>Status:</strong></label>
                {{ currentTutorial.published ? "Published" : "Pending" }}

                <v-divider class="my-5"></v-divider>

                <v-btn v-if="currentTutorial.published"
                  @click="updatePublished(false)"
                  color="primary" block class="mr-2 mb-3"
                >
                  UnPublish
                </v-btn>

                <v-btn v-else
                  @click="updatePublished(true)"
                  color="primary" block class="mr-2 mb-3"
                >
                  Publish
                </v-btn>

                <v-btn color="error" block class="mr-2 mb-3" @click="deleteTutorial">
                  Delete
                </v-btn>

                <v-btn color="success" block @click="updateTutorial">
                  Update
                </v-btn>
              </v-form>
              <p class="mt-3">{{ message }}</p>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <p>Please click on a Tutorial...</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TutorialDataService from '../api/index.js'
export default {
  name: 'tutorial',
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id){
      TutorialDataService.get(id)
        .then((res) => {
          this.currentTutorial = res.data;
          console.log(res.data);
        })
        .catch(e => console.log(e));
    },
    updatePublished(status){
      const data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };
      TutorialDataService.update(this.currentTutorial.id, data)
        .then((res) => {
          this.currentTutorial.published = status;
          console.log(res.data);
        })
        .catch(e => console.log(e));
    },
    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted(){
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
}
</script>

<style>

</style>
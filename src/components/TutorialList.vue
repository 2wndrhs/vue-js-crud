<template>
  <v-container>
    <v-row align="center" justify="center" width="750" class="px-3">
      <v-col cols="12" md="10">
        <v-text-field v-model="title" label="Search by Title"></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn block @click="searchTitle">
          Search
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Tutorials</v-card-title>
          <v-data-table
            :headers="headers"
            :items="tutorials"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-card-actions v-if="tutorials.length > 0">
            <v-btn small color="error" @click="removeAllTutorials">
              Remove All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TutorialDataService from '../api/index.js'
export default {
  name: 'tutorials-list',
  data(){
    return {
      tutorials: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    }
  },
  methods: {
    retrieveTutorials(){
      TutorialDataService.getAll()
        .then((res) => {
          this.tutorials = res.data.map(this.getDisplayTutorial);
          console.log(res.data);
        })
        .catch(e => console.log(e));
    },
    refreshList(){
      this.retrieveTutorials();
    },
    removeAllTutorials(){
      TutorialDataService.deleteAll()
        .then((res) => {
          console.log(res.data);
          this.refreshList();
        })
        .catch(e => console.log(e));
    },
    searchTitle(){
      TutorialDataService.findByTitle(this.title)
        .then((res) => {
          this.tutorials = res.data.map(this.getDisplayTutorial);
          console.log(res.data);
        })
        .catch(e => console.log(e));
    },
    editTutorial(id) {
      this.$router.push({name: 'tutorial-details', params: {id: id}});
    },
    deleteTutorial(id) {
      TutorialDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(e => console.log(e));
    },
    getDisplayTutorial(tutorial) {
      return {
        id: tutorial.id,
        title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        status: tutorial.published ? "Published" : "Pending",
      };
    },
  },
  mounted(){
    this.retrieveTutorials();
  }
}
</script>

<style scoped>
.list{
  max-width: 750px;
}
</style>
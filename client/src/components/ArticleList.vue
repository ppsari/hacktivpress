<template>
  <div class="container">
    <h1>Article List</h1>
    <div class="row" v-for="al in articleList" :key="al._id" @click.native.prevent="onClick(al._id)">
      <div class="col s11 offset-s1">
        <h4 class="header">{{al.title}}</h4>
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>Created By: {{ typeof al._author !== 'undefined' ?  al._author.username : 'anonim' }}</p>
              <p>{{ al.content.substr(0,10)+'...' }}</p>
            </div>
            <div class="card-action">
              <label class="green"><strong>{{al.category}}</strong></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        articleList : []
      }
    },
    created: function() {
      this.getAllArticle();
      this.axios.defaults.headers.common['token'] = this.token;
    },
    methods: {
      onClick(_aid) {},
      getAllArticle() {
        let _self = this;
        axios.get('http://localhost:3000/api/articles')
        .then(response => {
          if (typeof response.data !== 'undefined') {
            _self.articleList = response.data;
            console.log(_self.articleList)
          }
        })
        .catch(err => {console.log(err)})
      },
      // getUserArticle() {
      //
      // },
      // getCatArticle() {
      //
      // }
    }
  }
</script>
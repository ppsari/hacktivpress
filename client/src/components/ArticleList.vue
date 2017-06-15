<template>
  <div class="container">
    <h1>Article List</h1>
    <input type="text" placeholder="search by category" id="txtCategory"><button class="btn" @click.native.prevent="searchCategory()">SEARCH</button>
    <br/><br/>
    <input type="text" placeholder="search by username" id="txtUsername"><button class="btn" @click.native.prevent="searchUsername()">SEARCH</button>
    <br/><br/>
    <div class="row" v-for="al in articleList" :key="al._id">
      <div class="col s11 offset-s1">
        <h4 class="header">{{al.title}}</h4>
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>Created By: {{ typeof al._author !== 'undefined' ?  al._author.username : 'anonim' }}</p>
              <p>{{ al.content.substr(0,10)}} ... </p>
              <button class="btn" @click.native.prevent="onClick(al._id)"> View Detail</button>
            </div>
            <div class="card-action">
              <label class="green"><strong>{{al.category}}</strong></label>
              {{al._id}}
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
      this.axios.defaults.headers.common['token'] = localStorage.token;
      this.getAllArticle();
    },
    methods: {
      onClick(_aid) {
        console.log('called'+_aid);
        window.open(
          `http://localhost:8080/#/article/${_aid}`,
          '_blank'
        )
      },
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
      searchUsername() {
        let _self = this;
        let user = $('#txtUsername').text();
        axios.get('http://localhost:3000/api/articles/user/'+user)
        .then(response => {
          if (typeof response.data !== 'undefined') {
            _self.articleList = response.data;
            console.log(_self.articleList)
          }
        })
        .catch(err => {console.log(err)})
      },
      searchCategory() {
        let _self = this;

        let category = $('#txtCategory').text();
        axios.get('http://localhost:3000/api/articles/category/'+category)
        .then(response => {
          if (typeof response.data !== 'undefined') {
            _self.articleList = response.data;
            console.log(_self.articleList)
          }
        })
        .catch(err => {console.log(err)})
      }
    }
  }
</script>
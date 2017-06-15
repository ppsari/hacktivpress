<template>
  <div class="article" style="margin:0px 15%">
    <h3 style="margin-left:40px"> Article > </h3>
    <article-one
      :id="id"
      :article="article"
      @edit="editA"
      @remove="removeA"
      :user="currUser"
      ></article-one>
    <hr/>
    <frm-save-article
      :article="articleInForm"
      @submit="saveFrmA"
      @reset="resetFrmA"
    >
  </frm-save-article>
    <hr/>

  </div>
</template>
<script>
  import ArticleOne from './article/ArticleOne';
  import FrmSaveArticle from './article/FrmSaveArticle';
  const initialData = {
    article :
    {
      _id: null,
      title: '',
      content: '',
      category: ''
    }
  }

  export default {
    props: ['id'],
    components: {
      ArticleOne,
      FrmSaveArticle
    },
    data () {
      return {
        token: localStorage.getItem('token'),
        currUser: {},
        article: {},
        articleInForm: initialData.article
      }
    },
    created: function() {
      this.id = this.$route.params.id;
      this.getCurrentUser();
      this.getArticle();
      this.axios.defaults.headers.common['token'] = this.token;
    },
    methods: {
      getArticle() {
        let _self = this;
        _self.axios.get(`http://localhost:3000/api/article/${this.id}`)
        .then( res => {
          _self.article = (typeof res.data === 'undefined' ? [] : res.data);
        })
        .catch(err=> console.log(err));
      },
      getCurrentUser() {
        let _self = this;
        let user = {};
        _self.axios
        .post('http://localhost:3000/token', {
          token: _self.token
        })
        .then( res => {

          console.log('curr user');
          console.log(res.data);
          if (res.data) {
            user = res.data;
            user.token = _self.token;
            _self.currUser = user;
          } else
            localStorage.removeItem('token');
        });
      },
      editA(article) {
        article._id = this.id;
        this.articleInForm  = {...article};
      },
      saveFrmA(article) {
        let _self = this;
        _self.axios
        .put(`http://localhost:3000/api/articles/${this.id}`, article)
        .then( res => {
          if (typeof res.data.err === 'undefined'){
            this.getArticle();
            this.resetFrmA();
          }
          else {
            console.log('failed to save')
            alert(`${res.data.err}`);
          }
        });
      },
      resetFrmA() {
        this.articleInForm = initialData.article;
      }

    }
  }


</script>
<style scope>
  /*.md-fab, .md-fab:hover {
    background-color: rgba(102, 98, 98, 0.85);
  }*/
  button.gray{
    background-color: 'dimgray'
  }
  .red: {
    background-color: 'red'
  }
  .green : {
    background-color: 'green'
  }
</style>
<template>
  <div class="article">

      <div class="col s11 offset-s1"  v-if="article">
        <h4 class="header">{{article.title}}</h4>
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>Created By: {{ typeof article._author !== 'undefined' ?  article._author.username : 'anonim' }}</p>
              <p>{{ article.content.substr(0,10)+'...' }}</p>
            </div>
            <div class="card-action">
              <label class="green"><strong>{{article.category}}</strong></label>
              <button v-if="user._id === article._author._id" @click.native.prevent="onEdit(article)"> Edit </button>
              <button v-if="user._id === article._author._id" @click.native.prevent="onDelete(article._id)"> Delete </button>
            </div>
          </div>
        </div>
      </div>






  </div>
</template>
<script>

export default {
  props: ['id','article','user'],
  data () {
    return {}
  },
  methods: {
    onDelete(_aid) {
      this.$emit('remove',_aid)
    },
    onEdit(thread) {
      this.$emit('edit',article)
    }

  }
}
</script>
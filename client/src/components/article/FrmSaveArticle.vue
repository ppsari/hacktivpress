<template>
  <form>
    <div class="row">
     <div class="input-field col s12">
       <input id="title" type="text"
       v-model="article.title"
       placeholder="Input article title" >
       <label for="title">Title</label>
     </div>
   </div>
    <div class="row">
     <div class="input-field col s12">
       <input id="content" type="text"
       v-model="article.content"
       placeholder="Input article content" >
       <label for="content">Content</label>
     </div>
   </div>

   <div class="row">
    <div class="input-field col s12">
      <input id="category" type="text"
      v-model="article.category"
      placeholder="Input article category" >
      <label for="category">Category</label>
    </div>
  </div>

    <button type="submit" @click.prevent="onSubmit" class="btn btn-primary">{{ article._id !== null? 'Edit' : 'Save' }} Question</button>
    <button type="reset" v-if="article._id != null" @click.prevent="onReset">Reset</button>
  </form>
</template>
<script>
  export default {
    props: ['article'],
    methods: {
      onSubmit() {
        this.$emit('submit',this.article);
      },
      onReset() {
        this.$emit('reset');
      }
    }
  }
</script>
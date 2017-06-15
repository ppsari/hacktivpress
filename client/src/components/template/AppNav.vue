<template>
      <nav>
       <div class="nav-wrapper">
         <a href="#" class="brand-logo">Hacktivpress</a>
         <ul id="nav-mobile" class="right hide-on-med-and-down" v-if="isLogin">
           <li ><a href="">User</a></li>
           <li><a href="">Logout</a></li>
         </ul>
         <ul id="nav-mobile" class="right hide-on-med-and-down" v-else>
           <li ><a href="sass.html">Login</a></li>
           <li><a href="badges.html">Register</a></li>
         </ul>
       </div>
     </nav>
</template>

<script>
  export default {
    data: function() {
      return {
        token : localStorage.getItem('token'),
        isLogin: (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '')
      }
    }
  }
</script>
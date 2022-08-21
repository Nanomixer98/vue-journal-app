<template>
  <Navbar />
  <div class="d-flex">
    <div class="col-3"><EntryList /></div>
    <div class="col"><router-view /></div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Navbar: defineAsyncComponent(() =>
      import("../components/NavbarComponent.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("../components/EntryListComponent.vue")
    ),
  },
};
</script>

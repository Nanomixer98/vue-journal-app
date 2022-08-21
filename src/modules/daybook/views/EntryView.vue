<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">21</span>
      <span class="mx-1 fs-3">Agosto</span>
      <span class="mx-2 fs-4 fw-ligth">2022, domingo</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Subir foto
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>

  <hr />

  <div class="d-flex flex-column px-3 h-75">
    <textarea
      placeholder="¿Qué sucedió hoy?"
      id=""
      cols="30"
      rows="10"
    ></textarea>
  </div>

  <Fab />

  <img
    src="https://s.yimg.com/ny/api/res/1.2/NO32AnKeYxKJlrw5RKk2eg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2022-05/c86d1780-d79e-11ec-97ff-f8cb09fc00e6"
    alt="entry-pic"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/FabComponent.vue")),
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  font-size: 20px;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  bottom: 150px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  position: fixed;
  right: 20px;
  width: 200px;
}
</style>

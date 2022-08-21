<template>
  <div
    class="entry-container b-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 23 } })"
  >
    <!-- Titulo -->
    <div class="entry-tile d-flex">
      <span class="text-success fs-5 fw-bold">19</span>
      <span class="mx-1 fs-5">Agosto</span>
      <span class="mx-2 fw-light">2022, sabado</span>
    </div>

    <div class="entry-description">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quos a perferendis possimus. Distinctio laudantium molestiae quod cum
      dolore asperiores pariatur doloribus consectetur, odio natus explicabo
      dicta. Quae, ducimus itaque.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
}
</style>

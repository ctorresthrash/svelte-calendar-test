<script>
  export let title;
</script>

<style>
  .container {
    background-color: var(--main-color);
    border: var(--cell-border-width) solid black;
    margin-right: -1px;
  }
  .title {
    color: var(--light-gray);
    text-align: center;
  }
</style>

<div class="container">
  <p class="title">{title}</p>
</div>

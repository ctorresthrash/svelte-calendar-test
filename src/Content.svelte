<script>
  import Calendar from "./components/Calendar.svelte";
</script>

<style>
  :global(:root) {
    --main-color: #2f75b5;
    --main-color-light: #97bada;
    --light-gray: #f2f2f2;
    --gray: #a7a7a7;
    --cell-width: 250px;
    --cell-border-width: 1px;
  }
  main {
    padding: 0 30px 0;
  }
</style>

<main>
  <Calendar />
</main>

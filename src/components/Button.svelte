<script>
  export let type = "button";
</script>

<style type="text/scss">
  button {
    &:active {
      @apply bg-blue-700;
    }
    &:disabled {
      @apply bg-blue-200 text-white;
    }
  }
</style>

<button
  {type}
  class="border-none bg-blue-500 text-white font-bold py-2 px-4 rounded
  focus:outline-none focus:shadow-outline hover:bg-blue-400"
  on:click>
  <slot />
</button>

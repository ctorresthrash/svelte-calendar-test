<style type="text/scss">
  button {
    @apply px-4 py-2 rounded font-semibold bg-blue-600 text-white rounded-md border-transparent;
    &:hover,
    &:focus {
      @apply bg-blue-500 outline-none;
    }
    &:active {
      @apply bg-blue-700;
    }
  }
</style>

<button on:click>
  <slot />
</button>

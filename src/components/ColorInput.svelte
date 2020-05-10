<script>
  export let id = "";
  export let label = "";
  export let name = "";
  export let value = "";
  export let error;
</script>

<label for={id}>
  <span class="block text-gray-700 text-sm font-bold mb-2">{label}</span>
  <input
    class="shadow appearance-none border rounded w-full text-gray-700
    leading-tight focus:outline-none focus:shadow-outline h-8"
    {id}
    {name}
    type="color"
    bind:value
    on:change />
  {#if error}
    <small class="text-red-500">{error}</small>
  {/if}
</label>

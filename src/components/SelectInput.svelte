<script>
  export let name = "";
  export let id = "";
  export let items = [];
  export let value;
</script>

<style>
  select {
    background: white;
    padding: 10px;
  }
</style>

<select bind:value {name} {id}>
  {#each items as item}
    <option value={item.value}>{item.label}</option>
  {/each}
</select>

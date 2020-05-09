<script>
  import { createForm } from "svelte-forms-lib";
  import Button from "./Button.svelte";
  import TextInput from "./TextInput.svelte";

  export let onSubmit = () => {};

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      content: "",
      date: "",
      city: ""
    },
    onSubmit: values => {
      console.log(values);
      onSubmit(values);
    }
  });
</script>

<form class="bg-white px-8 pt-6 pb-8 mb-4" on:submit={handleSubmit}>
  <div class="mb-4">
    <TextInput
      id="content"
      name="content"
      label="Content"
      on:change={handleChange}
      value={$form.content} />
  </div>
  <div class="mb-4">
    <TextInput
      id="date"
      name="date"
      label="Date"
      type="datetime-local"
      on:change={handleChange}
      value={$form.date} />
  </div>
  <div class="mb-6">
    <TextInput
      id="city"
      name="city"
      label="City"
      on:change={handleChange}
      value={$form.city} />
  </div>

  <Button type="submit">Submit</Button>
</form>

<script>
  import { createForm } from "svelte-forms-lib";
  import Button from "./Button.svelte";
  import TextInput from "./TextInput.svelte";
  import * as Yup from "yup";

  export let onSubmit = () => {};

  const { form, handleChange, handleSubmit, errors } = createForm({
    initialValues: {
      content: "",
      date: "",
      city: ""
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required("Required"),
      date: Yup.date().required("Required").typeError('Invalid date'),
      city: Yup.string().required("Required")
    }),
    onSubmit: values => {
      onSubmit(values);
    }
  });
  $: console.log($errors);
</script>

<form class="bg-white px-8 pt-6 pb-8 mb-4" on:submit={handleSubmit}>
  <div class="mb-4">
    <TextInput
      id="content"
      name="content"
      label="Content"
      on:change={handleChange}
      value={$form.content}
      error={$errors.content} />
  </div>
  <div class="mb-4">
    <TextInput
      id="date"
      name="date"
      label="Date"
      type="datetime-local"
      on:change={handleChange}
      value={$form.date}
      error={$errors.date} />
  </div>
  <div class="mb-6">
    <TextInput
      id="city"
      name="city"
      label="City"
      on:change={handleChange}
      value={$form.city}
      error={$errors.city} />
  </div>

  <Button type="submit">Submit</Button>
</form>

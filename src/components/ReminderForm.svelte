<script>
  import { createForm } from "svelte-forms-lib";
  import Button from "./Button.svelte";
  import TextInput from "./TextInput.svelte";
  import ColorInput from "./ColorInput.svelte";
  import Forecast from "./Forecast.svelte";
  import * as Yup from "yup";
  import { formatISO } from "date-fns";

  export let onSubmit = () => {};

  const { form, handleChange, handleSubmit, errors } = createForm({
    initialValues: {
      content: "",
      city: "",
      date: "",
      time: "",
      color: "#4299e1"
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required("Required"),
      date: Yup.date()
        .required("Required")
        .typeError("Invalid date"),
      time: Yup.string()
        .required("Required")
        .typeError("Invalid time"),
      city: Yup.string().required("Required"),
      color: Yup.string().required("Required")
    }),
    onSubmit: values => {
      onSubmit(values);
    }
  });
</script>

<form class="bg-white px-8 pt-6 pb-8 mb-4" on:submit={handleSubmit}>
  <div class="mb-4">
    <Forecast date={$form.date} city={$form.city} time={$form.time} />
  </div>
  <div class="mb-4">
    <TextInput
      id="content"
      name="content"
      label="Content"
      on:change={handleChange}
      value={$form.content}
      error={$errors.content} />
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
  <div class="mb-4">
    <TextInput
      id="date"
      name="date"
      label="Date"
      type="date"
      on:change={handleChange}
      value={$form.date}
      error={$errors.date} />
  </div>
  <div class="mb-4">
    <TextInput
      id="time"
      name="time"
      label="Time"
      type="time"
      on:change={handleChange}
      value={$form.time}
      error={$errors.time} />
  </div>
  <div class="mb-4">
    <ColorInput
      id="color"
      name="color"
      label="Color"
      on:change={handleChange}
      value={$form.color}
      error={$errors.color} />
  </div>

  <Button type="submit">Submit</Button>
</form>

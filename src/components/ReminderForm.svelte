<script>
  import { Form, Input, Select, Choice } from "sveltejs-forms";
  import * as yup from "yup";

  export let onSubmit = () => {};

  function handleSubmit({ detail: { values } }) {
    onSubmit(values);
  }

  const schema = yup.object().shape({
    content: yup.string().required(),
    date: yup.date()
  });

  const initialValues = {
    date: new Date()
  };
</script>

<style type="text/scss" global>
  .sveltejs-forms {
    padding: 1rem;

    .field {
      margin-bottom: 1rem;
      &.error {
        input {
          border: 1px solid red;
        }
        .message {
          margin-top: 0.2rem;
          color: red;
          font-size: 0.8rem;
        }
      }
    }
  }
</style>

<Form
  {schema}
  validateOnBlur={false}
  validateOnChange={false}
  on:submit={handleSubmit}
  let:isSubmitting
  let:isValid>
  <Input name="content" label="Content" placeholder="Reminder Content" />
  <Input
    name="date"
    type="datetime-local"
    label="Date"
    placeholder="Reminder Date" />
  <button type="submit" disabled={isSubmitting}>Sign in</button>
</Form>

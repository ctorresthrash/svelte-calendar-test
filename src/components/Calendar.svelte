<script>
  import { getDaysInMonth, isToday, getWeeksInMonth } from "date-fns";
  import shortid from "shortid";
  import CalendarDay from "./CalendarDay.svelte";
  import CalendarTitle from "./CalendarTitle.svelte";
  import SelectInput from "./SelectInput.svelte";
  import ReminderForm from "./ReminderForm.svelte";
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";
  import { getMonthMap, getWeekMap } from "../utils/index";
  import { reminders, remindersByDate } from "../stores/reminders";

  let showAddReminderForm = false;

  const handleSubmitAddReminder = (values) => {
    const id = shortid.generate();
    $reminders = {
      ...$reminders,
      [id]: {
        id,
        ...values,
      },
    };
    closeAddReminderForm();
  };

  const openAddReminderForm = () => {
    showAddReminderForm = true;
  };

  const closeAddReminderForm = () => {
    showAddReminderForm = false;
  };

  const months = Object.entries(getMonthMap()).map(([key, value]) => ({
    label: key,
    value,
  }));

  const today = new Date();
  const daysOfWeek = getWeekMap();
  let month = today.getMonth();
  let year = today.getFullYear();
  $: calendarMonth = new Date(year, month);
  $: firstDay = calendarMonth.getDay();
  $: daysInMonth = getDaysInMonth(calendarMonth);
  $: lastDay = new Date(year, month, daysInMonth);

  $: weeksInMonth = Array.from(Array(getWeeksInMonth(calendarMonth)).keys());

  $: calendarWeekDays = weeksInMonth.map((_week) => {
    return Object.values(daysOfWeek).map((_day) => {
      return new Date(year, month, _week * 7 + (_day - firstDay + 1));
    });
  });

  $: console.log($remindersByDate);
</script>

{#if showAddReminderForm}
  <Modal on:close={closeAddReminderForm}>
    <p slot="header" class="text-2xl font-bold">Add Reminder</p>
    <ReminderForm onSubmit={handleSubmitAddReminder} />
  </Modal>
{/if}

<div class="w-4/5 m-auto bg-white p-8 rounded-md shadow-md">
  <h1 class="text-2xl text-gray-700">Reminders Calendar</h1>
  <div class="flex flex-row justify-between my-4">
    <SelectInput bind:value={month} name="month" items={months} />
    <Button on:click={openAddReminderForm}>Add Reminder</Button>
  </div>
  <div class="flex flex-no-wrap flex-row">
    {#each Object.keys(daysOfWeek) as dayOfWeek}
      <div class="flex-1">
        <CalendarTitle title={dayOfWeek.substring(0, 3)} />
      </div>
    {/each}
  </div>
  {#each calendarWeekDays as week}
    <div class="flex flex-no-wrap flex-row">
      {#each week as day}
        <div class="flex-1">
          <CalendarDay {day} month={calendarMonth} />
        </div>
      {/each}
    </div>
  {/each}
</div>

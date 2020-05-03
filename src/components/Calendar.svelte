<script>
  import { getContext } from "svelte";
  import { getDaysInMonth, isToday, getWeeksInMonth } from "date-fns";
  import CalendarDay from "./CalendarDay.svelte";
  import CalendarTitle from "./CalendarTitle.svelte";
  import SelectInput from "./SelectInput.svelte";
  import ReminderForm from "./ReminderForm.svelte";
  import { getMonthMap, getWeekMap } from "../utils/index";

  const { open } = getContext("simple-modal");

  const showReminderForm = () => {
    open(ReminderForm);
  };

  const months = Object.entries(getMonthMap()).map(([key, value]) => ({
    label: key,
    value
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

  $: calendarWeekDays = weeksInMonth.map(_week => {
    return Object.values(daysOfWeek).map(_day => {
      return new Date(year, month, _week * 7 + (_day - firstDay + 1));
    });
  });
</script>

<style>
  .calendar {
    width: 1024px;
    margin: auto;
  }

  .nowrap-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .flex-item {
    flex: 1;
  }
</style>

<div class="calendar">
  <SelectInput bind:value={month} name="month" items={months} />
  <button on:click={showReminderForm}>Add Reminder</button>
  <div class="nowrap-container">
    {#each Object.keys(daysOfWeek) as dayOfWeek}
      <div class="flex-item">
        <CalendarTitle title={dayOfWeek} />
      </div>
    {/each}
  </div>
  {#each calendarWeekDays as week}
    <div class="nowrap-container">
      {#each week as day}
        <div class="flex-item">
          <CalendarDay {day} month={calendarMonth} />
        </div>
      {/each}
    </div>
  {/each}
</div>

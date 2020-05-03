<script>
  import { getDaysInMonth, isToday, getWeeksInMonth } from "date-fns";
  import CalendarDay from "./components/CalendarDay.svelte";
  import CalendarTitle from "./components/CalendarTitle.svelte";
  import SelectInput from "./components/SelectInput.svelte";
  import { getMonthMap, getWeekMap } from "./utils/index";

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
  $: console.log(calendarWeekDays, firstDay);
</script>

<style>
  :global(:root) {
    --main-color: #2f75b5;
    --main-color-light: #97bada;
    --light-gray: #f2f2f2;
    --gray: #a7a7a7;
    --cell-width: 250px;
    --cell-border-width: 1px;
  }
  main {
    padding: 0 30px 0;
  }

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

<main>
  <div class="calendar">
    <SelectInput bind:value={month} name="month" items={months} />
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
</main>

<script>
  import { format } from "date-fns";
  export let day;
  export let month;
  $: isOffsetMonth = day.getMonth() !== month.getMonth();
  $: isWeekendDay = day.getDay() === 6 || day.getDay() === 0;
</script>

<style>
  .container {
    border: var(--cell-border-width) solid black;
    margin-right: -1px;
    margin-top: -1px;
    height: 150px;
  }

  .container p {
    text-align: center;
    margin: 0;
    padding: 10px 0;
  }

  .week-day {
    background-color: white;
  }

  .week-day p {
    color: black;
  }

  .weekend-day {
    background: var(--light-gray);
  }

  .weekend-day p {
    color: var(--main-color);
  }

  .offset-month {
    background: var(--light-gray);
  }

  .offset-month p {
    color: var(--gray);
  }
</style>

<div
  class="container week-day"
  class:weekend-day={isWeekendDay}
  class:offset-month={isOffsetMonth}>
  <p class="day">{format(day, 'd')}</p>
</div>

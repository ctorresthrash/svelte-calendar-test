<script>
  import { format, isToday } from "date-fns";
  export let day;
  export let month;
  $: isOffsetMonth = day.getMonth() !== month.getMonth();
  $: isWeekendDay = day.getDay() === 6 || day.getDay() === 0;
</script>

<style type="text/scss">
  .container {
    margin-right: -1px;
    margin-top: -1px;
    @apply border border-gray-500 border-solid h-32;
    p {
      @apply py-2 m-0 text-center;
    }
  }

  .week-day {
    @apply bg-white text-gray-700;
  }

  .weekend-day {
    @apply bg-gray-200 text-blue-500;
  }

  .offset-month {
    @apply bg-gray-200 text-gray-500;
  }

  .today {
    @apply bg-blue-300 text-white;
  }
</style>

<div
  class="container week-day"
  class:weekend-day={isWeekendDay}
  class:offset-month={isOffsetMonth}
  class:today={isToday(day)}>
  <p class="day">{format(day, 'd')}</p>
  <slot name="content" />
</div>

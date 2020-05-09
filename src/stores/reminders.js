import { writable, derived } from "svelte/store";
import _ from "lodash/fp";
import { format } from "date-fns";

export const reminders = writable({});

export const remindersByDate = derived(reminders, ($reminders) => {
  const groupedByDateReminders = _.groupBy((reminder) => {
    return format(reminder.date, "MM/dd/YYYY");
  }, $reminders);
  return groupedByDateReminders;
});

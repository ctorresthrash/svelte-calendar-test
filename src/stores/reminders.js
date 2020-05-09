import { writable, derived } from "svelte/store";
import _ from "lodash/fp";
import { format, parse, parseISO } from "date-fns";

export const reminders = writable({});

export const remindersByDate = derived(reminders, ($reminders) => {
  const groupedByDateReminders = _.groupBy((reminder) => {
    return format(parseISO(reminder.date), "MM/dd/yyyy");
  }, $reminders);
  return groupedByDateReminders;
});

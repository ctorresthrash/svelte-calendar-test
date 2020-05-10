<script>
  import { scale } from "svelte/transition";
  import Axios from "axios";
  import _ from "lodash/fp";
  import { parse, differenceInDays } from "date-fns";

  export let date;
  export let city;
  export let time;

  $: _date = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());

  const OPEN_WEATHER_API_KEY = "c50d82d239feff96cee0695ce898171e";
  const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org";

  Axios.defaults.baseURL = OPEN_WEATHER_BASE_URL;
  Axios.defaults.timeout = 30000;
  Axios.defaults.headers.post["Content-Type"] = "application/json";
  Axios.defaults.withCredentials = false;

  const getForecastDescription = _.getOr("", "weather.0.description");
  const getForecastIcon = _.getOr("", "weather.0.icon");

  $: forecast =
    date && city && time
      ? Axios({
          method: "GET",
          url: `/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
        })
          .then(response => {
            const forecastList = _.getOr([], "data.list", response);
            const closestForecast = forecastList.reduce(function(prev, curr) {
              const currentDate = parse(
                curr.dt_txt,
                "yyyy-MM-dd HH:mm:ss",
                new Date()
              );
              const previousDate = parse(
                prev.dt_txt,
                "yyyy-MM-dd HH:mm:ss",
                new Date()
              );
              return Math.abs(currentDate - _date) <
                Math.abs(previousDate - _date)
                ? curr
                : prev;
            });
            const closestForecastDate = parse(
              closestForecast.dt_txt,
              "yyyy-MM-dd HH:mm:ss",
              new Date()
            );
            const isFromSameDay =
              differenceInDays(closestForecastDate, _date) === 0;
            debugger;
            return isFromSameDay ? closestForecast : null;
          })
          .catch(error => {
            return null;
          })
      : null;
</script>

{#if Boolean(forecast)}
  {#await forecast then data}
    <span transition:scale class="bg-blue-200 p-2 rounded-md text-blue-800">
      {#if Boolean(data)}
        {`Weather forecast: ${getForecastDescription(data)} `}
        <img
          class="inline"
          alt={getForecastDescription(data)}
          src={`${OPEN_WEATHER_BASE_URL}/img/w/${getForecastIcon(data)}.png`} />
      {:else}Forecast not found{/if}
    </span>
  {/await}
{/if}

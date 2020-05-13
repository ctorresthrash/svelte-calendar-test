<script>
  import { tick } from "svelte";
  import { scale } from "svelte/transition";
  import Axios from "axios";
  import _ from "lodash/fp";
  import { parse, differenceInDays } from "date-fns";

  export let date;
  export let city;
  export let time;
  let forecast = null;

  const OPEN_WEATHER_API_KEY = "c50d82d239feff96cee0695ce898171e";
  const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org";

  Axios.defaults.baseURL = OPEN_WEATHER_BASE_URL;
  Axios.defaults.timeout = 30000;
  Axios.defaults.headers.post["Content-Type"] = "application/json";
  Axios.defaults.withCredentials = false;

  const getForecastDescription = _.getOr("", "weather.0.description");
  const getForecastIcon = _.getOr("", "weather.0.icon");

  const getForecast = async (_date, _time, _city) => {
    if (_date && _time && _city) {
      try {
        await tick();
        const parsedDate = parse(
          `${_date} ${_time}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );
        const response = await Axios({
          method: "GET",
          url: `/data/2.5/forecast?q=${_city}&appid=${OPEN_WEATHER_API_KEY}`,
        });
        const forecastList = _.getOr([], "data.list", response);
        const closestForecast = forecastList.reduce(function (prev, curr) {
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
          return Math.abs(currentDate - parsedDate) <
            Math.abs(previousDate - parsedDate)
            ? curr
            : prev;
        });
        const closestForecastDate = parse(
          closestForecast.dt_txt,
          "yyyy-MM-dd HH:mm:ss",
          new Date()
        );
        const isFromSameDay =
          differenceInDays(closestForecastDate, parsedDate) === 0;
        forecast = isFromSameDay
          ? closestForecast
          : { message: "Forecast not found" };
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    return null;
  };
  $: getForecast(date, time, city);
</script>

{#if forecast}
  <span transition:scale class="bg-blue-200 border-blue-500 border-t-2 p-2 rounded-md text-blue-800">
    {#if Boolean(getForecastDescription(forecast))}
      {`Weather forecast: ${getForecastDescription(forecast)} `}
      <img
        class="inline"
        alt={getForecastDescription(forecast)}
        src={`${OPEN_WEATHER_BASE_URL}/img/w/${getForecastIcon(forecast)}.png`} />
    {:else}Forecast not found{/if}
  </span>
{/if}

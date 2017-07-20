import _ from 'lodash';
import querystring from 'querystring';
import getDay from 'date-fns/get_day';
import format from 'date-fns/format';
import addMinutes from 'date-fns/add_minutes';

function getResponseJSON(resp) {
  return resp.json();
}

function getQueryBuilder(apiKey) {
  return (obj) => {
    let fields = Object.assign({appid: apiKey, units: 'imperial'}, obj);
    return querystring.stringify(fields);
  };
}

function format5DayResponse({ utcOffset }) {
  return (data) => {
    return _.chain(data.list)
      .map((forecast) => {
        let datetime = addMinutes(forecast.dt_txt, -utcOffset());

        return {
          day: getDay(datetime),
          dayFormatted: format(datetime, 'dddd'),
          timestamp: format(datetime, 'YYYY-MM-DDTHH:mm:ss'),
          temp: Math.round(forecast.main.temp),
          humidity: forecast.main.humidity,
          conditionImage: `//openweathermap.org/img/w/${forecast.weather[0].icon}.png`
        }
      })
      .groupBy('day')
      .value();
  }
}

export function get5Day(io, config, {fetch, queryBuilder, logger, utcOffset }) {
  const url = config.base + config.forecast;

  return (cityId) => {
    let qs = queryBuilder({id: cityId});

    return fetch(`//${url}?${qs}`)
      .then(getResponseJSON)
      .then(format5DayResponse({ logger, utcOffset }))
      .catch((err) => {
        logger.error('5 Day fetch failed', err);
        return Promise.reject(new Error('5 Day Forecast Failed to Load. Please Try Again.'));
      });
  }
}

export default function(io, config, {fetch, logger, utcOffset}) {
  const queryBuilder = getQueryBuilder(config.apiKey);

  return {
    get5Day: get5Day(io, config, { fetch, queryBuilder, utcOffset, logger })
  };
}

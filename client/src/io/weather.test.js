import url from 'url';
import querystring from 'querystring';

import weather from './weather';
import getLogger from '../../mocks/logger';
import getFetch from '../../mocks/fetch';
import getFailingFetch from '../../mocks/failingFetch';

describe('weather', () => {

  var logger;
  const config = {
    apiKey: '567453406b0529684eacf2eabf2250be',
    base: 'weather-redux.dannydavidson.com',
    forecast: '/forecast'
  };

  beforeEach(() => {
    logger = getLogger();
  })

  describe('get5Day', () => {

    it('calls configured endpoint and resolves with normalized weather data', () => {
      let expected = {
        "4": [
          {
            "day": 4,
            "dayFormatted": "Thursday",
            "timestamp": "2017-07-20T16:00:00",
            "temp": 94,
            "humidity": 66,
            "conditionImage": "//openweathermap.org/img/w/01d.png"
          },
          {
            "day": 4,
            "dayFormatted": "Thursday",
            "timestamp": "2017-07-20T19:00:00",
            "temp": 90,
            "humidity": 74,
            "conditionImage": "//openweathermap.org/img/w/03n.png"
          },
          {
            "day": 4,
            "dayFormatted": "Thursday",
            "timestamp": "2017-07-20T22:00:00",
            "temp": 79,
            "humidity": 79,
            "conditionImage": "//openweathermap.org/img/w/10n.png"
          }
        ],
        "5": [
          {
            "day": 5,
            "dayFormatted": "Friday",
            "timestamp": "2017-07-21T01:00:00",
            "temp": 74,
            "humidity": 87,
            "conditionImage": "//openweathermap.org/img/w/10n.png"
          }
        ]
      };

      let serviceResponse = {
        "list": [
          {
            "main": {
              "temp": 94.46,
              "humidity": 66
            },
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
              }
            ],
            "dt_txt": "2017-07-20 21:00:00"
          },
          {
            "main": {
              "temp": 89.98,
              "humidity": 74
            },
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03n"
              }
            ],
            "dt_txt": "2017-07-21 00:00:00"
          },
          {
            "main": {
              "temp": 78.62,
              "humidity": 79
            },
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
              }
            ],
            "dt_txt": "2017-07-21 03:00:00"
          },
          {
            "main": {
              "temp": 74.39,
              "humidity": 87
            },
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
              }
            ],
            "dt_txt": "2017-07-21 06:00:00"
          }
        ],
        "city": {
          "id": 4070245,
          "name": "Jones Crossroads",
          "coord": {
            "lat": 31.2107,
            "lon": -85.4847
          },
          "country": "US"
        }
      }

      let fetch = getFetch(serviceResponse);
      let utcOffset = jest.fn().mockReturnValue(300);

      let api = weather({}, config, { fetch, logger, utcOffset });

      return api.get5Day('12345')
        .then((data) => {
          let u = url.parse(fetch.mock.calls[0][0]);
          let qs = querystring.parse(u.query);

          expect(u.pathname).toEqual('//weather-redux.dannydavidson.com/forecast');
          expect(qs.appid).toEqual(config.apiKey);
          expect(qs.units).toEqual('imperial');
          expect(qs.id).toEqual('12345');

          expect(data).toEqual(expect.objectContaining(expected));
        });

    });

    it('rejects with error on failure, logging error', () => {
      let fetchError = new Error('FAIL');
      let fetch = getFailingFetch(fetchError);

      let api = weather({}, config, { fetch, logger });

      return api.get5Day('12345')
        .catch((err) => {
          expect(logger.error).toHaveBeenCalledWith('5 Day fetch failed', fetchError);
          expect(err.message).toEqual('5 Day Forecast Failed to Load. Please Try Again.');
        });
    });

  });

});

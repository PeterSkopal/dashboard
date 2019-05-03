export interface SMHIForeCastResponse {
  approvedTime: string;
  referenceTime: string;
  geometry: {
    type: string
    coordinates: number[][]
  };
  timeSeries: SingleForeCast[];
}

export interface SingleForeCast {
  validTime: string;
  parameters: Array<{
    name: string
    levelType: string
    level: number
    unit: string
    values: number[]
  }>;
}

// according to https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-wsymb
export const SMHIWeatherSymbol = [
  "Clear sky",
  "Nearly clear sky",
  "Variable cloudiness",
  "Halfclear sky",
  "Cloudy sky",
  "Overcast",
  "Fog",
  "Light rain showers",
  "Moderate rain showers",
  "Heavy rain showers",
  "Thunderstorm",
  "Light sleet showers",
  "Moderate sleet showers",
  "Heavy sleet showers",
  "Light snow showers",
  "Moderate snow showers",
  "Heavy snow showers",
  "Light rain",
  "Moderate rain",
  "Heavy rain",
  "Thunder",
  "Light sleet",
  "Moderate sleet",
  "Heavy sleet",
  "Light snowfall",
  "Moderate snowfall",
  "Heavy snowfall",
];

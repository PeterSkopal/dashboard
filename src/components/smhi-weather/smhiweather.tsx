import React from "react";

import fetch from "../../utils/http.util";
import {
  SingleForeCast,
  SMHIForeCastResponse,
  SMHIWeatherSymbol,
} from "./smhi.model";
import "./smhiweather.scss";

// retrieving forecasts from https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-wsymb
class SMHI extends React.Component<
  {},
  { currentTemp: any; forecast: SingleForeCast[] }
> {
  public interval;

  constructor(props) {
    super(props);
    this.fetchData();
  }

  public fetchData() {
    fetch("/.netlify/functions/smhi")
      .then(res => res.json())
      .then(res => {
        this.setState({ currentTemp: res.value[0].value });
      });
    fetch("/.netlify/functions/smhiforecast")
      .then(res => res.json())
      .then((res: SMHIForeCastResponse) => {
        this.setState({ forecast: res.timeSeries });
      });
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 3600000);
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public getLocale() {
    if (navigator.languages !== undefined) {
      return navigator.languages[0];
    } else {
      return navigator.language;
    }
  }

  public groupBy(items: any[], key) {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );
  }

  public createList = () => {
    const data =
      this.state && this.state.forecast
        ? this.state.forecast.filter((_, index) => index % 5 === 0)
        : [];
    const groupedData = this.groupBy(
      data.map(v => {
        const date = new Date(v.validTime).getDate();
        return { ...v, date };
      }),
      "date"
    );
    const forecastlist = Object.keys(groupedData).map(key => {
      let groupDate;
      let day;
      const foreCastGroup = groupedData[key].map((v, index) => {
        groupDate = v.date;
        const date = new Date(v.validTime);
        day = date.toLocaleDateString(this.getLocale(), {
          weekday: "long",
        });
        const hour = `0${date.getHours()}`.slice(-2);

        const symbol = v.parameters.find(p => p.name === "Wsymb2");
        const symbolName = symbol ? SMHIWeatherSymbol[symbol.values[0] + 1] : "";

        const tempValue = v.parameters.find(p => p.name === "t");
        const temp = tempValue ? tempValue.values[0] : "";
        return (
          <li key={v.validTime} className="smhi-forecast-entry">
            <div className="time">
              {/* <span className="day">{day}</span> */}
              <span className="hour">{`${hour}:00`}</span>
            </div>
            <div className="weather">
              <span className="symbol">{symbolName}</span>
              <span className="temperature">{temp} &#176;C</span>
            </div>
          </li>
        );
      });
      return (
        <ul key={groupDate} className="date-group">
          <span className="day">{day}</span>
          {foreCastGroup}
        </ul>
      );
    });
    return (
      <div className="weather-container">
        <label>Current Temparature</label>
        <p>{this.state ? this.state.currentTemp : ""}</p>
        <ul className="smhi-forecast-list">{forecastlist}</ul>
      </div>
    );
  }

  public render() {
    return <div className="smhi-container">{this.createList()}</div>;
  }
}

export default SMHI;

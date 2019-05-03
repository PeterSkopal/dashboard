import React from "react";

import Icon from "../../assets/SL_logo.svg";
import fetch from "../../utils/http.util";

import "./slrealtime.scss";

interface SLOption {
  LineNumber: number;
  JourneyDirection: number;
  JourneyNumber: number;
  Destination: string;
  DisplayTime: string;
}

class SLRealTime extends React.Component<{}, { results: SLOption[] }> {
  public interval;
  public interval2;

  constructor(props) {
    super(props);
    this.fetchData();
  }

  public fetchData() {
    fetch("/.netlify/functions/slrealtime")
      .then(res => res.json())
      .then(res => this.setState({ results: res.ResponseData.Metros }));
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 20000);
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public createList = () => {
    const listToTC: any[] = [];
    const listToMallanAndRobban: any[] = [];
    const data = this.state ? this.state.results : [];
    data.forEach((v: SLOption) => {
      if (Number(v.LineNumber) === 17 && v.JourneyDirection === 2) {
        listToMallanAndRobban.push(
          <li key={v.JourneyNumber.toString()} className="metro-entry">
            <span>{v.Destination}</span>
            <span>{v.DisplayTime}</span>
          </li>
        );
      } else if (Number(v.JourneyDirection) === 1 && listToTC.length < 4) {
        listToTC.push(
          <li key={v.JourneyNumber.toString()} className="metro-entry">
            <span>{v.Destination}</span>
            <span>{v.DisplayTime}</span>
          </li>
        );
      }
    });

    return (
      <>
        <label>Towards T-centralen</label>
        <ul className="metro-entry-container">{listToTC}</ul>
        <label>Towards Mallan and Robban</label>
        <ul className="metro-entry-container">{listToMallanAndRobban}</ul>
      </>
    );
  }

  public render() {
    return (
      <div className="sl-container">
        <Icon className="sl-logo" />
        {this.createList()}
      </div>
    );
  }
}

export default SLRealTime;

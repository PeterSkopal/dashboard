import React from "react"

import Icon from "../../assets/SL_logo.svg"
import fetch from "../../utils/http.util"

import "./slrealtime.scss"

interface SLOption {
  LineNumber: string
  JourneyDirection: number
  JourneyNumber: number
  Destination: string
  DisplayTime: string
}

class SLRealTime extends React.Component<{}, { results: SLOption[] }> {
  public interval

  constructor(props) {
    super(props)
    this.fetchData()
  }

  public fetchData() {
    fetch("/.netlify/functions/slrealtime")
      .then(res => res.json())
      .then(res => this.setState({ results: res.ResponseData.Metros }))
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 20000)
  }
  public componentWillUnmount() {
    clearInterval(this.interval)
  }

  public _createList = () => {
    const listToTC: any[] = []
    const listToMallanAndRobban: any[] = []
    const data = this.state ? this.state.results : []
    data.forEach((v: SLOption) => {
      if (parseInt(v.LineNumber, 10) === 17 && v.JourneyDirection === 2) {
        listToMallanAndRobban.push(
          <li key={v.JourneyNumber.toString()} className="metro-entry">
            {v.Destination} - {v.DisplayTime}
          </li>
        )
      } else if (v.JourneyDirection === 1 && listToTC.length < 4) {
        listToTC.push(
          <li key={v.JourneyNumber.toString()} className="metro-entry">
            {v.Destination} - {v.DisplayTime}
          </li>
        )
      }
    })

    return (
      <>
        <label>Towards T-centralen</label>
        <ul>{listToTC}</ul>
        <label>Towards Mallan and Robban</label>
        <ul>{listToMallanAndRobban}</ul>
      </>
    )
  }

  public render() {
    return (
      <div className="sl-container">
        <Icon className="sl-logo" />
        {this._createList()}
      </div>
    )
  }
}

export default SLRealTime

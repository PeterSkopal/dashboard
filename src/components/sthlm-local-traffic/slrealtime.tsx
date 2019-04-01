import React from "react"

import Icon from "../../assets/SL_logo.svg"
import fetch from "../../utils/http.util"

import "./slrealtime.scss"

interface SLOption {
  LineNumber: number
  JourneyDirection: number
  JourneyNumber: number
  Destination: string
  DisplayTime: string
}

class SLRealTime extends React.Component<{}, { results: SLOption[] }> {
  interval

  constructor(props) {
    super(props)
    this.fetchData()
  }

  fetchData() {
    fetch("/.netlify/functions/slrealtime")
      .then(res => res.json())
      .then(res => this.setState({ results: res.ResponseData.Metros }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 20000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _createList = () => {
    let listToTC: any[] = []
    let listToMallanAndRobban: any[] = []
    const data = this.state ? this.state.results : []
    data.forEach((v: SLOption) => {
      if (v.LineNumber === 17 && v.JourneyDirection === 2) {
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

  render() {
    return (
      <div className="sl-container">
        <Icon className="sl-logo" />
        {this._createList()}
      </div>
    )
  }
}

export default SLRealTime

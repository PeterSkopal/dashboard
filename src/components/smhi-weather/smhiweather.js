import React, { Component } from "react"

import fetch from "../../utils/http.util"

class SMHI extends Component {
  interval

  constructor(props) {
    super(props)

    this.state = {
      result: [],
    }
    this.fetchData()
  }

  fetchData() {
    fetch("/.netlify/functions/smhi")
      .then(res => res.json())
      .then(res => {
        this.setState({ result: res.value[0].value })
      })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 3600000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _createList = () => {
    return (
      <>
        <label>Current Weather</label>
        <p>{this.state.result}</p>
      </>
    )
  }

  render() {
    return <div className="smhi-container">{this._createList()}</div>
  }
}

export default SMHI

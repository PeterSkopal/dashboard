import React from "react"

import fetch from "../../utils/http.util"

class SMHI extends React.Component<{}, { result: any }> {
  interval

  constructor(props) {
    super(props)
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
        <label>Current Temparature</label>
        <p>{this.state ? this.state.result : ""}</p>
      </>
    )
  }

  render() {
    return <div className="smhi-container">{this._createList()}</div>
  }
}

export default SMHI

import React from "react";

import fetch from "../../utils/http.util";

class SMHI extends React.Component<{}, { result: any }> {
  public interval;

  constructor(props) {
    super(props);
    this.fetchData();
  }

  public fetchData() {
    fetch("/.netlify/functions/smhi")
      .then(res => res.json())
      .then(res => {
        this.setState({ result: res.value[0].value });
      });
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 3600000);
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public createList = () => {
    return (
      <>
        <label>Current Temparature</label>
        <p>{this.state ? this.state.result : ""}</p>
      </>
    );
  }

  public render() {
    return <div className="smhi-container">{this.createList()}</div>;
  }
}

export default SMHI;

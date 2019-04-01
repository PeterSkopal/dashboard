var http = require("http")

export function handler(event, _, callback) {
  const query = {
    host: "api.sl.se",
    path: "/api2/realtimedeparturesV4.json?key=4a7fb365d4c44323b385a34f6abc183d&siteid=9190&timewindow=20"
  }
  httpGet(query, result => {
    callback(null, {
      statusCode: 200,
      body: result,
    })
  })
}

function httpGet(query, callback) {
  var options = {
    host: query.host,
    path: query.path,
    method: "GET",
  }

  var req = http.request(options, res => {
    res.setEncoding("utf8")
    var responseString = ""

    //accept incoming data asynchronously
    res.on("data", chunk => {
      responseString = responseString + chunk
    })

    //return the data when streaming is complete
    res.on("end", () => {
      callback(responseString)
    })
  })
  req.end()
}

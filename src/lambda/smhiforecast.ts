import * as http from "http";

export function handler(event, _, callback) {
  const query = {
    host: "opendata-download-metfcst.smhi.se",
    path:
      "/api/category/pmp3g/version/2/geotype/point/lon/18.090426/lat/59.310182/data.json",
  };
  httpGet(query, result => {
    callback(null, {
      statusCode: 200,
      body: result,
    });
  });
}

function httpGet(query, callback) {
  const options = {
    host: query.host,
    path: query.path,
    method: "GET",
  };

  const req = http.request(options, res => {
    res.setEncoding("utf8");
    let responseString = "";

    // accept incoming data asynchronously
    res.on("data", chunk => {
      responseString = responseString + chunk;
    });

    // return the data when streaming is complete
    res.on("end", () => {
      callback(responseString);
    });
  });
  req.end();
}

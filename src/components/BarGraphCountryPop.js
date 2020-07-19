import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class BarGraphCountryPop extends PureComponent {
  render() {
    const { data } = this.props;
    let modifiedData = [];
    if (data.length >= 1) {
      const slicedData = data.slice(0, 10);
      modifiedData = slicedData.map((item) => {
        if (item.citizenship === "Peoples Republic of China") {
          let tempObject = {};
          tempObject.citizenship = "China";
          tempObject.count = item.count;
          return tempObject;
        } else if (item.citizenship === "Antigua and Barbuda") {
          let tempObject = {};
          tempObject.citizenship = "A & B";
          tempObject.count = item.count;
          return tempObject;
        } else if (item.citizenship === "United States of America") {
          let tempObject = {};
          tempObject.citizenship = "U.S.A";
          tempObject.count = item.count;
          return tempObject;
        } else if (item.citizenship === "Bangladesh") {
          let tempObject = {};
          tempObject.citizenship = "Bangla";
          tempObject.count = item.count;
          return tempObject;
        }
        return item;
      });
    } else {
      modifiedData = data;
    }

    return (
      <BarChart
        width={900}
        height={420}
        data={modifiedData}
        margin={{
          top: 100,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="citizenship" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="count" fill="#82ca9d" label={{ position: "top" }} />
      </BarChart>
    );
  }
}

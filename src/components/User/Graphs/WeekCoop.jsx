import React from "react";

import GraphModel from "../GraphModel";
import { weekTotalCoopTime, weekCoopData, baseOptions } from "../GraphData";

const WeekCoop = () => {
  return (
    <GraphModel
      base={baseOptions}
      coopData={weekCoopData}
      text="Co-op Job"
      percent={weekCoopData().datasets[0].data[0]}
      hours={weekTotalCoopTime}
    />
  );
};

export default WeekCoop;

// import axios from "axios";

// variables
// time
let totalCoopTime = 0;
let weekTotalCoopTime = 0;
let weekTotalNonCoopTime = 0;
let firstCoopTime = 0;
let secondCoopTime = 0;
let thirdCoopTime = 0;
// percent
let coopPercent = 0;
let remainPercent = 0;
let weekCoopPercent = 0;
let weekNonCoopPercent = 0;
let weekCoopRemainPercent = 0;
let weekNonCoopRemainPercent = 0;
let firstCoopPercent = 0;
let secondCoopPercent = 0;
let thirdCoopPercent = 0;
let firstCoopRemainPercent = 0;
let secondCoopRemainPercent = 0;
let thirdCoopRemainPercent = 0;
// other
let duration = "";
let firstCompanyName = "";
let secondCompanyName = "";
let thirdCompanyName = "";

export const calculateData = (res) => {
  // for totalCoopData
  const companies = res.company_status;
  for (let company of companies) {
    let hire_type = company.hire_type;
    if (hire_type === "CO") {
      let workingTime = parseFloat(company.working_time);
      totalCoopTime += workingTime;
    }
  }
  let coopTime = res.coop_hours;
  let remainTime = coopTime - totalCoopTime;
  coopPercent = Math.round((totalCoopTime / coopTime) * 1000) / 10;
  remainPercent = Math.round((remainTime / coopTime) * 1000) / 10;

  // for weekCoopData, weekNonCoopData
  // reset week data
  let date = new Date();
  let dayOfWeek = date.getDay();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let time = `${dayOfWeek}:${hour}:${minute}:${second}`;
  const resetTime = "7:23:59:59";

  // delete week data when Sunday 23:59:59
  if (time == resetTime) {
    weekTotalCoopTime = 0;
    weekTotalNonCoopTime = 0;
  } else {
    weekTotalCoopTime = res.week_coop_working_hours;
    weekTotalNonCoopTime = res.week_non_coop_working_hours;
  }

  let weekCoopTime;
  let weekNonCoopTime;

  for (let company of companies) {
    let hire_type = company.hire_type;
    if (hire_type === "CO") {
      // define working limit
      weekCoopTime = 40.0;
      weekNonCoopTime = 0;

      switch (res.company_status.length) {
        case 3:
          // define company name
          firstCompanyName = res.company_status[0].name;
          secondCompanyName = res.company_status[1].name;
          thirdCompanyName = res.company_status[2].name;
          // define working time by companies
          firstCoopTime = res.company_status[0].working_time;
          secondCoopTime = res.company_status[1].working_time;
          thirdCoopTime = res.company_status[2].working_time;
          break;
        case 2:
          firstCompanyName = res.company_status[0].name;
          secondCompanyName = res.company_status[1].name;
          firstCoopTime = res.company_status[0].working_time;
          secondCoopTime = res.company_status[1].working_time;
          break;
        case 1:
          firstCompanyName = res.company_status[0].name;
          firstCoopTime = res.company_status[0].working_time;
          break;
        default:
          break;
      }
    } else {
      weekCoopTime = 20.0;
      weekNonCoopTime = 20.0;
    }
  }

  let weekCoopRemainTime = weekCoopTime - weekTotalCoopTime;
  let weekNonCoopRemainTime = weekNonCoopTime - weekTotalNonCoopTime;
  weekCoopPercent = Math.round((weekTotalCoopTime / weekCoopTime) * 1000) / 10;
  weekCoopRemainPercent =
    Math.round((weekCoopRemainTime / weekCoopTime) * 1000) / 10;
  weekNonCoopPercent =
    Math.round((weekTotalNonCoopTime / weekNonCoopTime) * 1000) / 10;
  weekNonCoopRemainPercent =
    Math.round((weekNonCoopRemainTime / weekNonCoopTime) * 1000) / 10;

  // LOG
  console.log(weekCoopPercent); //0
  console.log(weekNonCoopPercent); //nan
  console.log(weekNonCoopTime); //0
  console.log(weekTotalNonCoopTime); //0

  // for firstCoopData, secondCoopData, thirdCoopData
  let firstCoopRemainTime = totalCoopTime - firstCoopTime;
  let secondCoopRemainTime = totalCoopTime - secondCoopTime;
  let thirdCoopRemainTime = totalCoopTime - thirdCoopTime;
  firstCoopPercent = Math.round((firstCoopTime / totalCoopTime) * 1000) / 10;
  secondCoopPercent = Math.round((secondCoopTime / totalCoopTime) * 1000) / 10;
  thirdCoopPercent = Math.round((thirdCoopTime / totalCoopTime) * 1000) / 10;
  firstCoopRemainPercent =
    Math.round((firstCoopRemainTime / totalCoopTime) * 1000) / 10;
  secondCoopRemainPercent =
    Math.round((secondCoopRemainTime / totalCoopTime) * 1000) / 10;
  thirdCoopRemainPercent =
    Math.round((thirdCoopRemainTime / totalCoopTime) * 1000) / 10;

  // coop duration
  let coopStartDate = res.coop_start_date;
  let coopEndDate = res.coop_end_date;
  duration = `${coopStartDate} - ${coopEndDate}`;

  return { coopTime, totalCoopTime, remainTime, coopPercent, remainPercent };
};

// colors
const blue500 = "#3B82F6";
const gray200 = "#E5E7EB";
const gray100 = "#F3F4F6";

// dataData
const baseData = {
  datasets: [
    {
      data: [],
      backgroundColor: [blue500, gray200],
      borderColor: ["transparent", "transparent"],
    },
  ],
  labels: ["Done", "Remain"],
};

// baseOptions
const baseOptions = {
  legend: {
    display: false,
  },
  plugins: {
    doughnutlabel: {
      labels: [
        {
          text: "",
          color: gray100,
          font: {
            size: 16,
          },
        },
        {
          text: "",
          color: gray100,
          font: {
            size: 32,
          },
        },
        {
          text: "",
          color: gray100,
          font: {
            size: 20,
          },
        },
      ],
    },
  },
  cutoutPercentage: 70,
};

// datas
const totalCoopData = () => {
  baseData.datasets[0].data = [coopPercent, remainPercent];
  return baseData;
};
const weekCoopData = () => {
  baseData.datasets[0].data = [weekCoopPercent, weekCoopRemainPercent];
  return baseData;
};
const weekNonCoopData = () => {
  baseData.datasets[0].data = [weekNonCoopPercent, weekNonCoopRemainPercent];
  return baseData;
};
const firstCoopData = () => {
  baseData.datasets[0].data = [firstCoopPercent, firstCoopRemainPercent];
  return baseData;
};
const secondCoopData = () => {
  baseData.datasets[0].data = [secondCoopPercent, secondCoopRemainPercent];
  return baseData;
};
const thirdCoopData = () => {
  baseData.datasets[0].data = [thirdCoopPercent, thirdCoopRemainPercent];
  return baseData;
};

export {
  totalCoopTime,
  weekTotalCoopTime,
  weekTotalNonCoopTime,
  firstCoopTime,
  secondCoopTime,
  thirdCoopTime,
  duration,
  firstCompanyName,
  secondCompanyName,
  thirdCompanyName,
  baseData,
  baseOptions,
  totalCoopData,
  weekCoopData,
  weekNonCoopData,
  firstCoopData,
  secondCoopData,
  thirdCoopData,
};

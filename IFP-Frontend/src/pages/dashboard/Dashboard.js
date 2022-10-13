import React, { useState,useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import axios from "axios";
import moment from "moment";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import imgRegister from "../../images/verify.png";
import imgSignOut from "../../images/arrow.png";
import industryIcon from "../../images/icon-factory.png";
import TechnologyIcon from "../../images/icon-technology.png";
import FeatureIcon from "../../images/icon-feature.png";
import PortfolioIcon from "../../images/portfolio.png";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Tooltip } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import CountUp from 'react-countup';

// const mainChartData = getMainChartData();


function GroupAvatars() {
  return (
    <AvatarGroup total={24}>
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
  </AvatarGroup>
  );
}




const PieChartData = [
  { name: "Active", value: 900, color: "primary" },
  { name: "Inactive", value: 100, color: "secondary" },
  { name: "Idle", value: 50, color: "warning" },
  { name: "Busy", value: 200, color: "success" },
];

export default function Dashboard(props) {
  const [siteMember, setSiteMember] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [technology, setTechnology] = useState(0);
  const [feature, setFeature] = useState([]);
  const [portfolio, setPortfolio] = useState(0);
  var classes = useStyles();
  var theme = useTheme();


useEffect(() => {
    const user = axios
        .get("http://localhost:3002/api/user/count", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      industry = axios
        .get("http://localhost:3002/api/industry/count", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      technology = axios
        .get("http://localhost:3002/api/technology/count", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      feature = axios
        .get("http://localhost:3002/api/features/count", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      portfolio = axios
        .get("http://localhost:3002/api/portfolio/count", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

    Promise.all([user, industry, technology, feature, portfolio]).then(
      axios.spread((...responses) => {
        const responseUser = responses[0];
        const responseIndustry = responses[1];
        const responseTechnology = responses[2];
        const responseFeature = responses[3];
        const responsePortfolio = responses[4];
        console.log("responseUser", responseUser.data);
        console.log("responseIndustry", responseIndustry.data);
        console.log("responseTechnology", responseTechnology.data);
        console.log("responseFeature", responseFeature.data);
        console.log("responsePortfolio", responsePortfolio.data);
        setSiteMember(responseUser.data);
        setIndustry(responseIndustry.data);
        setTechnology(responseTechnology.data);
        setFeature(responseFeature.data);
        setPortfolio(responsePortfolio.data);
      })
    );
  }
  , []);


  var [mainChartState, setMainChartState] = useState("daily");
  console.log("mainChartState", mainChartState);


  const dataSwitcher = (data) => {
    switch (data) {
      case "weekly":
        return getWeeklyData();
      case "monthly":
        return getMonthlyData();
      case "daily":
        return getDailyData();
      default:
        return getData();
    }
  }

function getData() {
  return [
    {
      date: "2019-01-01",
      siteMember: 4000,
      industry: 2400,
      technology: 2400,
      feature: 5400,
      portfolio: 2400,
    },
    {
      date: "2019-01-02",
      siteMember: 3000,
      industry: 1398,
      technology: 2210,
      feature: 6210,
      portfolio: 2210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}

const getWeeklyData = () => {
  const dataSiteMember = [];
  const dataIndustry = [];
  const dataTechnology = [];
  const dataFeature = [];
  const dataPortfolio = [];
  const data = [];
  const date = new Date();
  const today = moment(date).format("YYYY-MM-DD");
  const lastWeek = moment(date).subtract(7, "days").format("YYYY-MM-DD");
  console.log("today", today);
  console.log("lastWeek", lastWeek);
  siteMember.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateSiteMember", date);
    // console.log("item", item);
    if (date >= lastWeek && date <= today) {
      dataSiteMember.push(item);
    }
    else {
      dataSiteMember.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--SiteMember", dataSiteMember);

  industry.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateIndustry", date);
    console.log("item", item);
    if (date >= lastWeek && date <= today) {
      dataIndustry.push(item);
    }
    else {
      dataIndustry.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Industry", dataIndustry);
  technology.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateTechnology", date);
    console.log("item", item);
    if (date >= lastWeek && date <= today) {
      dataTechnology.push(item);
    }
    else {
      dataTechnology.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Technology", dataTechnology);
  feature.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateFeature", date);
    console.log("item", item);
    if (date >= lastWeek && date <= today) {
      dataFeature.push(item);
    }
    else {
      dataFeature.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Feature", dataFeature);
  portfolio.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("datePortfolio", date);
    console.log("item", item);
    if (date >= lastWeek && date <= today) {
      dataPortfolio.push(item);
    }
    else {
      dataPortfolio.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Portfolio", dataPortfolio);
  for (let i = 0; i < dataSiteMember.length; i++) {
    console.log("dataSiteMember[i]", dataSiteMember[i].count);
    const year = dataSiteMember[i]._id.year
    const month = dataSiteMember[i]._id.month
    const day = dataSiteMember[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const siteMember = dataSiteMember[i].count;
    console.log("siteMember", siteMember);
    data.push({
      date: date,
      siteMember: siteMember,
   });
  }

  for (let i = 0; i < dataIndustry.length; i++) {
    console.log("dataIndustry[i]", dataIndustry[i].count);
    const year = dataIndustry[i]._id.year
    const month = dataIndustry[i]._id.month
    const day = dataIndustry[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const industry = dataIndustry[i].count;
    console.log("industry", industry);
    data.push({
      date: date,
      industry: industry,
    });
  }
  for (let i = 0; i < dataTechnology.length; i++) {
    console.log("dataTechnology[i]", dataTechnology[i].count);
    const year = dataTechnology[i]._id.year
    const month = dataTechnology[i]._id.month
    const day = dataTechnology[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const technology = dataTechnology[i].count;
    console.log("technology", technology);
    data.push({
      date: date,
      technology: technology,
    });
  }
  for (let i = 0; i < dataFeature.length; i++) {
    console.log("dataFeature[i]", dataFeature[i].count);
    const year = dataFeature[i]._id.year
    const month = dataFeature[i]._id.month
    const day = dataFeature[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const feature = dataFeature[i].count;
    console.log("feature", feature);
    data.push({
      date: date,
      feature: feature,
    });
  }
  for (let i = 0; i < dataPortfolio.length; i++) {
    console.log("dataPortfolio[i]", dataPortfolio[i].count);
    const year = dataPortfolio[i]._id.year
    const month = dataPortfolio[i]._id.month
    const day = dataPortfolio[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const portfolio = dataPortfolio[i].count;
    console.log("portfolio", portfolio);
    data.push({
      date: date,
      portfolio: portfolio,
    });
  }
  console.log("data", data);
  return data;
}



const getMonthlyData = () => {
  const data = [];
  const dataSiteMember = [];
  const dataIndustry = [];
  const dataTechnology = [];
  const dataFeature = [];
  const dataPortfolio = [];
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthDate = lastMonth.getDate();
  const lastMonthMonth = lastMonth.getMonth() + 1;
  const lastMonthYear = lastMonth.getFullYear();
  const lastMonthString = lastMonthYear + "-" + lastMonthMonth + "-" + lastMonthDate;
  console.log("lastMonthString", lastMonthString);

  siteMember.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateSiteMember", date);
    console.log("item", item);
    if (date >= lastMonthString && date <= today) {
      dataSiteMember.push(item);
    }
    else {
      dataSiteMember.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--SiteMember", dataSiteMember);
  industry.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateIndustry", date);
    console.log("item", item);
    if (date >= lastMonthString && date <= today) {
      dataIndustry.push(item);
    }
    else {
      dataIndustry.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Industry", dataIndustry);
  technology.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateTechnology", date);
    console.log("item", item);
    if (date >= lastMonthString && date <= today) {
      dataTechnology.push(item);
    }
    else {
      dataTechnology.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Technology", dataTechnology);
  feature.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("dateFeature", date);
    console.log("item", item);
    if (date >= lastMonthString && date <= today) {
      dataFeature.push(item);
    }
    else {
      dataFeature.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Feature", dataFeature);
  portfolio.data.map((item) => {
    const year = item._id.year
    const month = item._id.month
    const day = item._id.day
    const date = year + "-" + month + "-" + day;
    console.log("datePortfolio", date);
    console.log("item", item);
    if (date >= lastMonthString && date <= today) {
      dataPortfolio.push(item);
    }
    else {
      dataPortfolio.push({ _id: { year: 0, month: 0, day: 0 }, count: 0 });
    }

  });
  console.log("data--Portfolio", dataPortfolio);

  for (let i = 0; i < dataSiteMember.length; i++) { 
    console.log("dataSiteMember[i]", dataSiteMember[i].count);
    const year = dataSiteMember[i]._id.year
    const month = dataSiteMember[i]._id.month
    const day = dataSiteMember[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const siteMember = dataSiteMember[i].count;
    console.log("siteMember", siteMember);
    data.push({
      date: date,
      siteMember: siteMember,
    });
  }
  for (let i = 0; i < dataIndustry.length; i++) {
    console.log("dataIndustry[i]", dataIndustry[i].count);
    const year = dataIndustry[i]._id.year
    const month = dataIndustry[i]._id.month
    const day = dataIndustry[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const industry = dataIndustry[i].count;
    console.log("industry", industry);
    data.push({
      date: date,
      industry: industry,
    });
  }
  for (let i = 0; i < dataTechnology.length; i++) {
    console.log("dataTechnology[i]", dataTechnology[i].count);
    const year = dataTechnology[i]._id.year
    const month = dataTechnology[i]._id.month
    const day = dataTechnology[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const technology = dataTechnology[i].count;
    console.log("technology", technology);
    data.push({
      date: date,
      technology: technology,
    });
  }
  for (let i = 0; i < dataFeature.length; i++) {
    console.log("dataFeature[i]", dataFeature[i].count);
    const year = dataFeature[i]._id.year
    const month = dataFeature[i]._id.month
    const day = dataFeature[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const feature = dataFeature[i].count;
    console.log("feature", feature);
    data.push({
      date: date,
      feature: feature,
    });
  }
  for (let i = 0; i < dataPortfolio.length; i++) {
    console.log("dataPortfolio[i]", dataPortfolio[i].count);
    const year = dataPortfolio[i]._id.year
    const month = dataPortfolio[i]._id.month
    const day = dataPortfolio[i]._id.day
    const date = year + "-" + month + "-" + day;
    console.log("date=============", date);
    const portfolio = dataPortfolio[i].count;
    console.log("portfolio", portfolio);
    data.push({
      date: date,
      portfolio: portfolio,
    });
  }
  console.log("data", data);
  return data;
}


const getDailyData = () => {
  return [
    {
      date: "2019-01-01",
      siteMember: 4000,
      industry: 2400,
      technology: 2400,
      feature: 5400,
      portfolio: 2400,
    },
    {
      date: "2019-01-02",
      siteMember: 3000,
      industry: 1398,
      technology: 2210,
      feature: 6210,
      portfolio: 2210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}




  return (
    <>
      <PageTitle title="Dashboard" button="Latest Reports" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Site Members"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >

<div className={classes.visitsNumberContainer}>
              
              <Typography size="xl" weight="medium">
                <img src={imgRegister} alt="register" width="50" height="50" />
                <span style={{marginLeft:"150px"}}>{
                  siteMember.total
                }</span>
                
                
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Industry"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
          
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={industryIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{industry.length}</span> */}
                <span style={{marginLeft:"150px"}}>{industry.total}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Technology"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={TechnologyIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{technology.length}</span> */}
                <span style={{marginLeft:"150px"}}>{technology.total}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Features"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={FeatureIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{feature.length}</span> */}
                <span style={{marginLeft:"150px"}}>{feature.total}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Portfolio"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={PortfolioIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{portfolio.length}</span> */}
                <span style={{marginLeft:"150px"}}>{portfolio.total}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="success" />
                    <Typography className={classes.mainChartLegentElement}>
                      Site Members
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Industry
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Technology
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Features
                    </Typography>
                    </div>
                    <div className={classes.mainChartHeaderLabel}>
                    <Dot color="info" />
                    <Typography className={classes.mainChartLegentElement}>
                      Portfolio
                    </Typography>
                    </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >
            
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={dataSwitcher(mainChartState)}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 7500]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                
                {mainChartState === "monthly" ? (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    tickFormatter={date => moment(date).format("MMM D")}
                  />
                ) : mainChartState === "weekly" ? (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    // tickFormatter={date => moment(date).format("MMM D")}
                    //tickFormat for weekly
                  />
                ) : (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    tickFormatter={date => moment(date).format("MMM D")}
                  />
                )}
                <Tooltip
                  wrapperStyle={{
                    backgroundColor: theme.palette.primary.main,
                    border: "none",
                    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: 10,
                  }}
                  contentStyle={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    color: theme.palette.text.hint,
                  }}
                  cursor={false}
                  labelFormatter={date => moment(date).format("MMM D")}
                  formatter={(value, name) => [value, name]}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.info.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.info.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="siteMember"
                  fill={theme.palette.success.main}
                  stroke={theme.palette.success.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="industry"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="technology"
                  fill={theme.palette.warning.main}
                  stroke={theme.palette.warning.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="feature"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  fill={theme.palette.info.main}
                  stroke={theme.palette.info.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}


// #######################################################################
// function getData() {
//   return [
//     {
//       date: "2019-01-01",
//       siteMember: 4000,
//       industry: 2400,
//       technology: 2400,
//       feature: 5400,
//       portfolio: 2400,
//     },
//     {
//       date: "2019-01-02",
//       siteMember: 3000,
//       industry: 1398,
//       technology: 2210,
//       feature: 6210,
//       portfolio: 2210,
//     },
//     {
//       date: "2019-01-03",
//       siteMember: 2000,
//       industry: 9800,
//       technology: 4290,
//       feature: 2290,
//       portfolio: 2290,
//     },
//     {
//       date: "2019-01-04",
//       siteMember: 2780,
//       industry: 3908,
//       technology: 2000,
//       feature: 2000,
//       portfolio: 2000,
//     },
//     {
//       date: "2019-01-05",
//       siteMember: 1890,
//       industry: 4800,
//       technology: 2181,
//       feature: 2181,
//       portfolio: 2181,
//     },
//     {
//       date: "2019-01-06",
//       siteMember: 2390,
//       industry: 3800,
//       technology: 2500,
//       feature: 2500,
//       portfolio: 2500,
//     },
//     {
//       date: "2019-01-07",
//       siteMember: 3490,
//       industry: 4300,
//       technology: 2100,
//       feature: 2100,
//       portfolio: 2100,
//     },
//   ];
// }

// //get data for weekly, monthly, daily
// const getWeeklyData = () => {
//   return [
//     {
//       date: "2019-01-01",
//       siteMember: 3000,
//       industry: 2400,
//       technology: 8400,
//       feature: 6400,
//       portfolio: 1400,
//     },
//     {
//       date: "2019-01-02",
//       siteMember: 4000,
//       industry: 9398,
//       technology: 2210,
//       feature: 6210,
//       portfolio: 9210,
//     },
//     {
//       date: "2019-01-03",
//       siteMember: 2000,
//       industry: 9800,
//       technology: 4290,
//       feature: 2290,
//       portfolio: 2290,
//     },
//     {
//       date: "2019-01-04",
//       siteMember: 2780,
//       industry: 3908,
//       technology: 2000,
//       feature: 2000,
//       portfolio: 2000,
//     },
//     {
//       date: "2019-01-05",
//       siteMember: 1890,
//       industry: 4800,
//       technology: 2181,
//       feature: 2181,
//       portfolio: 2181,
//     },
//     {
//       date: "2019-01-06",
//       siteMember: 2390,
//       industry: 3800,
//       technology: 2500,
//       feature: 2500,
//       portfolio: 2500,
//     },
//     {
//       date: "2019-01-07",
//       siteMember: 3490,
//       industry: 4300,
//       technology: 2100,
//       feature: 2100,
//       portfolio: 2100,
//     },
//   ];
// }

// const getMonthlyData = () => {
//   return [
//     {
//       date: "2019-01-01",
//       siteMember: 4000,
//       industry: 2400,
//       technology: 2400,
//       feature: 5400,
//       portfolio: 2400,
//     },
//     {
//       date: "2019-01-02",
//       siteMember: 3000,
//       industry: 1398,
//       technology: 2210,
//       feature: 6210,
//       portfolio: 2210,
//     },
//     {
//       date: "2019-01-03",
//       siteMember: 2000,
//       industry: 9800,
//       technology: 4290,
//       feature: 2290,
//       portfolio: 2290,
//     },
//     {
//       date: "2019-01-04",
//       siteMember: 2780,
//       industry: 3908,
//       technology: 2000,
//       feature: 2000,
//       portfolio: 2000,
//     },
//     {
//       date: "2019-01-05",
//       siteMember: 1890,
//       industry: 4800,
//       technology: 2181,
//       feature: 2181,
//       portfolio: 2181,
//     },
//     {
//       date: "2019-01-06",
//       siteMember: 2390,
//       industry: 3800,
//       technology: 2500,
//       feature: 2500,
//       portfolio: 2500,
//     },
//     {
//       date: "2019-01-07",
//       siteMember: 3490,
//       industry: 4300,
//       technology: 2100,
//       feature: 2100,
//       portfolio: 2100,
//     },
//   ];
// }

// const getDailyData = () => {
//   return [
//     {
//       date: "2019-01-01",
//       siteMember: 4000,
//       industry: 2400,
//       technology: 2400,
//       feature: 5400,
//       portfolio: 2400,
//     },
//     {
//       date: "2019-01-02",
//       siteMember: 3000,
//       industry: 1398,
//       technology: 2210,
//       feature: 6210,
//       portfolio: 2210,
//     },
//     {
//       date: "2019-01-03",
//       siteMember: 2000,
//       industry: 9800,
//       technology: 4290,
//       feature: 2290,
//       portfolio: 2290,
//     },
//     {
//       date: "2019-01-04",
//       siteMember: 2780,
//       industry: 3908,
//       technology: 2000,
//       feature: 2000,
//       portfolio: 2000,
//     },
//     {
//       date: "2019-01-05",
//       siteMember: 1890,
//       industry: 4800,
//       technology: 2181,
//       feature: 2181,
//       portfolio: 2181,
//     },
//     {
//       date: "2019-01-06",
//       siteMember: 2390,
//       industry: 3800,
//       technology: 2500,
//       feature: 2500,
//       portfolio: 2500,
//     },
//     {
//       date: "2019-01-07",
//       siteMember: 3490,
//       industry: 4300,
//       technology: 2100,
//       feature: 2100,
//       portfolio: 2100,
//     },
//   ];
// }

// //data switcher for weekly, monthly, daily
// const dataSwitcher = (data) => {
//   switch (data) {
//     case "weekly":
//       return getWeeklyData();
//     case "monthly":
//       return getMonthlyData();
//     case "daily":
//       return getDailyData();
//     default:
//       return getData();
//   }
// }
import { useState,useContext,createContext, useEffect} from "react";
import axios from "axios";

const DataFlowContext = createContext(null);

export function DataFlowProvider(props) {
    const [siteMember, setSiteMember] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [feature, setFeature] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
    const user = await axios
        .get("http://localhost:3002/api/user/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      industry = await axios
        .get("http://localhost:3002/api/industry/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      technology = await axios
        .get("http://localhost:3002/api/technology/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      feature = await axios
        .get("http://localhost:3002/api/features/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      portfolio = await axios
        .get("http://localhost:3002/api/portfolio/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

    await Promise.all([user, industry, technology, feature, portfolio]).then(
      axios.spread((...responses) => {
        const responseUser = responses[0];
        const responseIndustry = responses[1];
        const responseTechnology = responses[2];
        const responseFeature = responses[3];
        const responsePortfolio = responses[4];
        console.log(responseUser.data.users);
        console.log(responseIndustry.data);
        console.log(responseTechnology.data);
        console.log(responseFeature.data);
        console.log(responsePortfolio.data);
        setSiteMember(responseUser.data.users);
        setIndustry(responseIndustry.data);
        setTechnology(responseTechnology.data);
        setFeature(responseFeature.data);
        setPortfolio(responsePortfolio.data);
      })
    );
  }
  fetchData();
  }, []); 
  

  const setSiteMemberData = async(data) => {
    await axios
        .get("http://localhost:3002/api/user/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      .then((response) => { 
        setSiteMember([...siteMember, response.data]);
      }
      )
      .catch((error) => {
        console.log(error);
      }
      );

  };

  const setIndustryData = () => {
    axios
      .get("http://localhost:3002/api/industry/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setIndustry([...industry, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const setTechnologyData = () => {
    axios
      .get("http://localhost:3002/api/technology/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTechnology([...technology, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setFeatureData = () => {
    axios
      .get("http://localhost:3002/api/features/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFeature([...feature, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setPortfolioData = () => {
    axios
      .get("http://localhost:3002/api/portfolio/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPortfolio(response.data);
      }

      );
  };

  const value = {
    siteMember,
    setSiteMemberData,
    industry,
    setIndustryData,
    technology,
    setTechnologyData,
    feature,
    setFeatureData,
    portfolio,
    setPortfolioData, 
  };

  return (
    <DataFlowContext.Provider value={value}>
      {props.children}
    </DataFlowContext.Provider>
  );
}

export function useDataFlow() {
  const context = useContext(DataFlowContext);
  if (!context) {
    throw new Error("useDataFlow must be used within a DataFlowProvider");
  }
  return context;
}
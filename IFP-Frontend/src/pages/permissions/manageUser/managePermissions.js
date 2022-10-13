import React, { useState, useEffect } from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../../components/PageTitle/PageTitle";
import '../style.scss';
import * as actions from "../../../actions/user";
import { Button, Form } from 'react-bootstrap';
import { connect } from "react-redux";
import { TrendingUpRounded } from "@material-ui/icons";
import { permissions } from "../../../actions/user";
import { toast } from 'react-toastify';





const styles = theme => ({
  paper: {
    padding: theme.spacing(0),
  },
  paperTable: {
    padding: theme.spacing(0),
  },
  formCheck: {
    width: '100%',
    marginBottom: '20px',
    marginTop: '20px',
    fontSize: '1.0rem',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textShadow: '0px 0px 1px #000000'
  }
})


const User = ({ classes, ...props }) => {
  const [inputValue, setValue] = useState([]);
  const [id, setId] = useState(''); 
  const [selectedValue, setSelectedValue] = useState("");
  const [add_user, setAddCheck] = useState(false);
  const [view_user, setViewCheck] = useState(false);
  const [update_user, setUpdateCheck] = useState(false);
  const [delete_user, setDeleteCheck] = useState(false);
  const [add_site, setSiteAdd] = useState(false);
  const [view_site, setSiteView] = useState(false);
  const [update_site, setSiteUpdate] = useState(false);
  const [delete_site, setSiteDelete] = useState(false);
  const [add_industry, setIndustryAdd] = useState(false);
  const [view_industry, setIndustryView] = useState(false);
  const [update_industry, setIndustryUpdate] = useState(false);
  const [delete_industry, setIndustryDelete] = useState(false);
  const [add_technology, setTechnologyAdd] = useState(false);
  const [view_technology, setTechnologyView] = useState(false);
  const [update_technology, setTechnologyUpdate] = useState(false);
  const [delete_technology, setTechnologyDelete] = useState(false);
  const [add_features, setfeaturesAdd] = useState(false);
  const [view_features, setfeaturesView] = useState(false);
  const [update_features, setfeaturesUpdate] = useState(false);
  const [delete_features, setfeaturesDelete] = useState(false);
  const [add_portfolio, setPortfolioAdd] = useState(false);
  const [view_portfolio, setPortfolioView] = useState(false);
  const [update_portfolio, setPortfolioUpdate] = useState(false);
  const [delete_portfolio, setPortfolioDelete] = useState(false);
  const [sitemodule, setSitemodule] = useState(false);
  const [industrymodule, setIndustrymodule] = useState(false);
  const [technologymodule, setTechnologymodule] = useState(false);
  const [featuresmodule, setFeaturesmodule] = useState(false);
  const [portfolioemodule, setPortfoliomodule] = useState(false);





  useEffect(() => {
    props.fetchPagination()
  }, [])

  var data = [];

  props.users.map((item) => {
    return (data.push({ name: item.name, id: item.id, add_user: item.add_permission }))

  })

  // console.log("DATA", data);
  // console.log("alldata", props.users)

  //handle input change event
  const handleInputChange = value => {
    setValue(value);
  }

  //handle selection
  const handleChange = event => {
    const choosenvalue = event.target.value;
    const selecteddata = props.users[choosenvalue];
    // console.log("alldata111111", selecteddata);
    setId(selecteddata.id);
    setAddCheck(selecteddata.add_permission);
    setViewCheck(selecteddata.view_permission);
    setUpdateCheck(selecteddata.update_permission);
    setDeleteCheck(selecteddata.delete_permission);
    setSiteAdd(selecteddata.add_site);
    setSiteView(selecteddata.view_site);
    setSiteUpdate(selecteddata.update_site);
    setSiteDelete(selecteddata.delete_site);
    setIndustryAdd(selecteddata.add_industry);
    setIndustryView(selecteddata.view_industry);
    setIndustryUpdate(selecteddata.update_industry);
    setIndustryDelete(selecteddata.delete_industry);
    setTechnologyAdd(selecteddata.add_technology);
    setTechnologyView(selecteddata.view_technology);
    setTechnologyUpdate(selecteddata.update_technology);
    setTechnologyDelete(selecteddata.delete_technology);
    setfeaturesAdd(selecteddata.add_features);
    setfeaturesView(selecteddata.view_features);
    setfeaturesUpdate(selecteddata.update_features);
    setfeaturesDelete(selecteddata.delete_features);
    setPortfolioAdd(selecteddata.add_portfolio);
    setPortfolioView(selecteddata.view_portfolio);
    setPortfolioUpdate(selecteddata.update_portfolio);
    setPortfolioDelete(selecteddata.delete_portfolio);
    setSitemodule(selecteddata.site);
    setIndustrymodule(selecteddata.industry);
    setTechnologymodule(selecteddata.technology);
    setFeaturesmodule(selecteddata.features);
    setPortfoliomodule(selecteddata.portfolio);



    setSelectedValue(choosenvalue);
    console.log('choosenvalue', choosenvalue)
  }


  // handle checkbox
  const handlePermissions = ((permissiontocheck) => {

    switch (permissiontocheck) {
      case 'add_user':
        setAddCheck(!add_user);
        // console.log('PROPS',props)
        // add_permission(props.dataUser[0],{add_permission:!addCheck},onSuccess)
        break;
      case 'view_user':
        setViewCheck(!view_user);
        // view_permission(props.dataUser[0],{view_permission:!viewCheck},onSuccess)
        break;
      case 'update_user':
        setUpdateCheck(!update_user);
        // update_permission(props.dataUser[0],{update_permission:!updateCheck},onSuccess)
        break;
      case 'delete_user':
        setDeleteCheck(!delete_user);
        // delete_permission(props.dataUser[0],{delete_permission:!deleteCheck},onSuccess)
        break;
      case 'sitemodule':
        setSitemodule(!sitemodule)
        break;
      case 'add_site':
        setSiteAdd(!add_site)
        break;
      case 'view_site':
        setSiteView(!view_site)
        break;
      case 'update_site':
        setSiteUpdate(!update_site)
        break;
      case 'delete_site':
        setSiteDelete(!delete_site)
        break;
      case 'industrymodule':
        setIndustrymodule(!industrymodule)
        break;
      case 'add_industry':
        setIndustryAdd(!add_industry)
        break;
      case 'view_industry':
        setIndustryView(!view_industry)
        break;
      case 'update_industry':
        setIndustryUpdate(!update_industry)
        break;
      case 'delete_industry':
        setIndustryDelete(!delete_industry)
        break;
      case 'technologymodule':
        setTechnologymodule(!technologymodule)
        break;
      case 'add_technology':
        setTechnologyAdd(!add_technology)
        break;
      case 'view_technology':
        setTechnologyView(!view_technology)
        break;
      case 'update_technology':
        setTechnologyUpdate(!update_technology)
        break;
      case 'delete_technology':
        setTechnologyDelete(!delete_technology)
        break;
      case 'featuresmodule':
        setFeaturesmodule(!featuresmodule)
        break;
      case 'add_features':
        setfeaturesAdd(!add_features)
        break;
      case 'view_features':
        setfeaturesView(!view_features)
        break;
      case 'update_features':
        setfeaturesUpdate(!update_features)
        break;
      case 'delete_features':
        setfeaturesDelete(!delete_features)
        break;
      case 'portfoliomodule':
        setPortfoliomodule(!portfolioemodule)
        break;
      case 'add_portfolio':
        setPortfolioAdd(!add_portfolio)
        break;
      case 'view_portfolio':
        setPortfolioView(!view_portfolio)
        break;
      case 'update_portfolio':
        setPortfolioUpdate(!update_portfolio)
        break;
      case 'delete_portfolio':
        setPortfolioDelete(!delete_portfolio)
        break;

      default:
        setSiteAdd(false)
        setSiteDelete(false)
        setSiteUpdate(false)
        setSiteView(false)
        setSitemodule(false)
        setAddCheck(false)
        setViewCheck(false)
        setUpdateCheck(false)
        setDeleteCheck(false)

        setIndustrymodule(false)
        setIndustryAdd(false)
        setIndustryView(false)
        setIndustryUpdate(false)
        setIndustryDelete(false)
        setTechnologymodule(false)
        setTechnologyAdd(false)
        setTechnologyView(false)
        setTechnologyUpdate(false)
        setTechnologyDelete(false)
        setFeaturesmodule(false)
        setfeaturesAdd(false)
        setfeaturesView(false)
        setfeaturesUpdate(false)
        setfeaturesDelete(false)
        setPortfoliomodule(false)
        setPortfolioAdd(false)
        setPortfolioView(false)
        setPortfolioUpdate(false)
        setPortfolioDelete(false)
    }
  })

  // handle submit

  const handleSubmit = (() => {
    if(selectedValue == ""){
      
      toast.success("Please select user");
    }
    else{
     permissions(id,
      {view_permission:view_user,
        add_permission:add_user,
        update_permission:update_user,
        delete_permission:delete_user,
        add_site: add_site,
        view_site: view_site,
        update_site: update_site,
        delete_site: delete_site,
        add_industry: add_industry,
        view_industry: view_industry,
        update_industry: update_industry,
        delete_industry: delete_industry,
        add_technology: add_technology,
        view_technology: view_technology,
        update_technology: update_technology,
        delete_technology: delete_technology,
        add_features: add_features,
        view_features: view_features,
        update_features: update_features,
        delete_features: delete_features,
        add_portfolio: add_portfolio,
        view_portfolio: view_portfolio,
        update_portfolio: update_portfolio,
        delete_portfolio: delete_portfolio,
        site: sitemodule,
        industry: industrymodule,
        technology: technologymodule,
        features: featuresmodule,
        portfolio: portfolioemodule,
        
       

    })
    }
  })

  return (

    <React.Fragment>

      <Grid container spacing={4}>
        <Grid item xs={12} >
          <Paper className={classes.paper}>

            <Form>
              <fieldset enable className="form-group">
                <Form.Group className="mb-3">
                  <Form.Label className="form-control form-control-md"
                    style={{ fontSize: '1.2rem', fontWeight: 'bold',
                    color: '#f1faee', textAlign: 'center',
                    backgroundColor: '#023e8a',
                    padding: '10px 0px 10px 0px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    marginTop: '20px',
                    width: '100%',
                    border: '1px solid #38a3a5',
                    boxShadow: '0px 0px 5px 0px #38a3a5',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'sans-serif',
                     }}>
                    Manage User Permission      
                    </Form.Label>

                  <Form.Select onChange={handleChange} 
                    aria-label="Default select example"
                    style={{ width: '20%', marginBottom: '20px',
                    marginTop: '20px', border: '2px solid #000000',
                    borderRadius: '15px', padding: '5px 0px 5px 0px',
                    boxShadow: '0px 0px 2px 0px #000000',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#f1faee',
                    textAlign: 'center',
                    backgroundColor: '#0077b6',
                    marginLeft: '1%',  
                    }}>
                    <option >    Select User</option>
                    {
                      props.users.map((item, i) => (
                        <option value={i}>{item.name}
                        </option>
                      )
                      )}

                  </Form.Select>


                </Form.Group>
                <Form.Group className="form-group form-check">
                  <Form.Check

                    type="checkbox"
                    id="disabledFieldsetCheck"
                    label="ADD USER"
                    onChange={() => { handlePermissions('add_user') }}
                    checked={add_user}
                    style={{ width: '100%', marginBottom: '20px',
                    marginTop: '20px',
                    fontSize: '1.0rem',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    textShadow: '0px 0px 1px #000000',
                  }}
                  />
                  {/* <Form.Check
                    type="checkbox"
                    id="disabledFieldsetCheck"
                    label="VIEW USER"
                    checked={view_user}
                    onChange={() => { handlePermissions('view_user') }}
                  /> */}
                  <Form.Check
                    type="checkbox"
                    id="disabledFieldsetCheck"
                    label="UPDATE USER"
                    checked={update_user}
                    onChange={() => { handlePermissions('update_user')}}
                    style={{ width: '100%', marginBottom: '20px',
                    marginTop: '20px',
                    fontSize: '1.0rem',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    textShadow: '0px 0px 1px #000000',
                    
                  }}
                  />
                  <Form.Check
                    type="checkbox"
                    id="disabledFieldsetCheck"
                    label="DELETE USER"
                    checked={delete_user}
                    onChange={() => { handlePermissions('delete_user') }}
                    style={{ width: '100%', marginBottom: '20px',
                    marginTop: '20px',
                    fontSize: '1.0rem',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    textShadow: '0px 0px 1px #000000',
                  }}
                    
                  />

                </Form.Group>


                <Form.Group >
                  <Form.Label htmlFor="disabledSelect" className="form-control form-control-md"
                  style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  color: '#f1faee', textAlign: 'center',
                  backgroundColor: '#023e8a',
                  padding: '10px 0px 10px 0px',
                  borderRadius: '5px',
                  marginBottom: '20px',
                  marginTop: '20px',
                  width: '100%',
                  border: '1px solid #000000',
                  boxShadow: '0px 0px 5px 0px #000000',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: 'sans-serif',
                   }}>
                    Manage Module Permission      </Form.Label>
                </Form.Group>
                <Form.Group className="form-group form-check">
                  <label className="form-control form-control-sm"> 
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  letterSpacing: '2px',
                  }}>
                    Site Members :- </span>
                    <span style={{
                      marginLeft: '50px',
                      fontSize: '1.0rem',
                    }}>
                    <input type="checkbox" checked={sitemodule} label=" Show in Sidebar" onChange={() => { handlePermissions('sitemodule') }} /> Show in Sidebar&emsp;&emsp;
                    <input type="checkbox" checked={add_site} label="ADD" onChange={() => { handlePermissions('add_site') }} /> Add&emsp;&emsp;
                    <input type="checkbox" checked={view_site} label="View" onChange={() => { handlePermissions('view_site') }} /> View&emsp;&emsp;
                    <input type="checkbox" checked={update_site} label="Update" onChange={() => { handlePermissions('update_site') }} /> Update&emsp;&emsp;
                    <input type="checkbox" checked={delete_site} label="Delete" onChange={() => { handlePermissions('delete_site') }} /> Delete&emsp;&emsp;
                    </span>
                  </label>
                  <br />
                  <label className="form-control form-control-sm">
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  letterSpacing: '2px',
                  }}>
                    Industry :-</span>
                    <span style={{
                      marginLeft: '115px',
                      fontSize: '1.0rem',
                    }}>
                    <input type="checkbox" checked={industrymodule} label=" Show in Sidebar" onChange={() => { handlePermissions('industrymodule') }} /> Show in Sidebar&emsp;&emsp;
                    <input type="checkbox" checked={add_industry} label="ADD" onChange={() => { handlePermissions('add_industry') }} /> Add&emsp;&emsp;
                    <input type="checkbox" checked={view_industry} label="View" onChange={() => { handlePermissions('view_industry') }} /> View&emsp;&emsp;
                    <input type="checkbox" checked={update_industry} label="Update" onChange={() => { handlePermissions('update_industry') }} /> Update&emsp;&emsp;
                    <input type="checkbox" checked={delete_industry} label="Delete" onChange={() => { handlePermissions('delete_industry') }} /> Delete&emsp;&emsp;
                    </span>
                  </label>

                  <br />
                  <label className="form-control form-control-sm">
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  letterSpacing: '2px',
                  }}>
                    Technology :-</span>
                    <span style={{
                      marginLeft: '80px',
                      fontSize: '1.0rem',
                    }}>
                    <input type="checkbox" checked={technologymodule} label=" Show in Sidebar" onChange={() => { handlePermissions('technologymodule') }} /> Show in Sidebar&emsp;&emsp;
                    <input type="checkbox" checked={add_technology} label="ADD" onChange={() => { handlePermissions('add_technology') }} /> Add&emsp;&emsp;
                    <input type="checkbox" checked={view_technology} label="View" onChange={() => { handlePermissions('view_technology') }} /> View&emsp;&emsp;
                    <input type="checkbox" checked={update_technology} label="Update" onChange={() => { handlePermissions('update_technology') }} /> Update&emsp;&emsp;
                    <input type="checkbox" checked={delete_technology} label="Delete" onChange={() => { handlePermissions('delete_technology') }} /> Delete&emsp;&emsp;
                    </span>
                  </label>
                  <br />
                  <label className="form-control form-control-sm">
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  letterSpacing: '2px',
                  }}>
                    Features :-</span>
                    <span style={{
                      marginLeft: '110px',
                      fontSize: '1.0rem',
                    }}>
                    <input type="checkbox" checked={featuresmodule} label=" Show in Sidebar" onChange={() => { handlePermissions('featuresmodule') }} /> Show in Sidebar&emsp;&emsp;
                    <input type="checkbox" checked={add_features} label="ADD" onChange={() => { handlePermissions('add_features') }} /> Add&emsp;&emsp;
                    <input type="checkbox" checked={view_features} label="View" onChange={() => { handlePermissions('view_features') }} /> View&emsp;&emsp;
                    <input type="checkbox" checked={update_features} label="Update" onChange={() => { handlePermissions('update_features') }} /> Update&emsp;&emsp;
                    <input type="checkbox" checked={delete_features} label="Delete" onChange={() => { handlePermissions('delete_features') }} /> Delete&emsp;&emsp;
                    </span>
                  </label>
                  <br />
                  <label className="form-control form-control-sm"> 
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold',
                  letterSpacing: '2px',
                  }}>
                    Portfolio :-</span>
                    <span style={{
                      marginLeft: '110px',
                      fontSize: '1.0rem',
                    }}>
                    <input type="checkbox" checked={portfolioemodule} label=" Show in Sidebar" onChange={() => { handlePermissions('portfoliomodule') }} /> Show in Sidebar&emsp;&emsp;
                    <input type="checkbox" checked={add_portfolio} label="ADD" onChange={() => { handlePermissions('add_portfolio') }} /> Add&emsp;&emsp;
                    <input type="checkbox" checked={view_portfolio} label="View" onChange={() => { handlePermissions('view_portfolio') }} /> View&emsp;&emsp;
                    <input type="checkbox" checked={update_portfolio} label="Update" onChange={() => { handlePermissions('update_portfolio') }} /> Update&emsp;&emsp;
                    <input type="checkbox" checked={delete_portfolio} label="Delete" onChange={() => { handlePermissions('delete_portfolio') }} /> Delete&emsp;&emsp;
                    </span>
                  </label>
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" onClick={handleSubmit}
                  style={{
                    // backgroundColor: '#bf360c',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: '40px',
                    marginBottom: '40px',
                    borderRadius: '20px',
                    // border: 'none',
                    justifyContent: 'center',

                  }}
                  >
                  Save Module Permission
                  </Button>
                </div>
              </fieldset>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  users: state.user.users,
  meta: state.user.metaUser
})

const mapActionToProps = {
  fetchPagination: actions.Pagination,
  create: actions.create,
  update: actions.update,
  delete: actions.Delete,
  add_permission: actions.add_permission,



}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(User));
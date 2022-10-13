import Portfolio from '../models/portfolio.model'


const portfoliosSerializer = data => ({
    id: data._id,
    project_name: data.project_name,
    live_url: data.live_url,
    user_login: data.user_login,
    user_password: data.user_password,
    staging_admin_url: data.staging_admin_url,
    admin_user_login: data.admin_user_login,
    admin_password: data.admin_password,
    technology: data.technology,
    industry: data.industry,
    staging_url: data.staging_url,
    feature: data.feature, 

});

// Retrieve all data
exports.findAll =  (req, res) => {
    Portfolio.find()
    .then(async data => {
        const portfolios = await Promise.all(data.map(portfoliosSerializer));
        res.send(portfolios);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving portfolios."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = ""} = req.query;

    let query = {}
     if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await Portfolio.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const portfolios = await Promise.all(docs.map(portfoliosSerializer));
    
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, portfolios });
};

exports.findOne = (req, res) => {
    Portfolio.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "portfolio not found with id " + req.params.id
                });
            }
            const portfolio = portfoliosSerializer(data)
            res.send(portfolio);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Portfolio not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving portfolio with id " + req.params.id
            });
        });
};

// exports.create = (req, res) => {

//     if(!req.body.name) {
//          return res.status(400).send({
//              message: "Map name can not be empty"
//          });
//     }

//     const portfolio = new Portfolio({
//         name: req.body.name.trim()
//     });

//     portfolio.save()
//     .then(data => {
//         const portfolio = portfoliosSerializer(data)
//         res.send(portfolio)
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Portfolio."
//         });
//     });
// };

exports.create = async (req, res) => {
    const { project_name, live_url, user_login, user_password, staging_admin_url, admin_user_login, admin_password, technology, industry, staging_url, feature } = req.body;
    console.log(project_name, live_url, user_login, user_password, staging_admin_url, admin_user_login, admin_password, technology, industry, staging_url, feature)
    const portfolio = new Portfolio({
        project_name : project_name,
        live_url : live_url,
        user_login : user_login,
        user_password : user_password,
        staging_admin_url : staging_admin_url,
        admin_user_login : admin_user_login,
        admin_password : admin_password,
        technology : technology,
        industry : industry,
        staging_url : staging_url,
        feature : feature
    });
    portfolio.save()
    .then(data => {
        const portfolio = portfoliosSerializer(data)
        res.send(portfolio)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Portfolio."
        });
    });
};


exports.update = (req, res) => {
    Portfolio.findByIdAndUpdate(req.params.id, {
        project_name: req.body.project_name,
        live_url: req.body.live_url,
        user_login: req.body.user_login,
        user_password: req.body.user_password,
        staging_admin_url: req.body.staging_admin_url,
        admin_user_login: req.body.admin_user_login,
        admin_password: req.body.admin_password,
        technology: req.body.technology,
        industry: req.body.industry,
        staging_url: req.body.staging_url,
        feature: req.body.feature
        
    
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Portfolio not found with id " + req.params.id
            });
        }
        const portfolio = portfoliosSerializer(data)
        res.send(portfolio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Portfolio not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating portfolio with id " + req.params.id
        });
    });
};

//  //permissions
// exports.permissions = (req, res) => {
      
//     Portfolio.findByIdAndUpdate(req.params.id, {
//         add_permission: req.body.add_permission,
//         view_permission: req.body.view_permission,
//         update_permission: req.body.update_permission,
//         delete_permission: req.body.delete_permission,
//         // module permission
//         add_site: req.body.add_site,
//         view_site: req.body.view_site,
//         update_site: req.body.update_site,
//         delete_site: req.body.delete_site,
//         add_technology: req.body.add_technology,
//         view_technology: req.body.view_technology,
//         update_technology: req.body.update_technology,
//         delete_technology: req.body.delete_technology,
//         add_portfolio: req.body.add_portfolio,
//         view_portfolio: req.body.view_portfolio,
//         update_portfolio: req.body.update_portfolio,
//         delete_portfolio: req.body.delete_portfolio,
//         add_features: req.body.add_features,
//         view_features: req.body.view_features,
//         update_features: req.body.update_features,
//         delete_features: req.body.delete_features,
//         add_portfolio: req.body.add_portfolio,
//         view_portfolio: req.body.view_portfolio,
//         update_portfolio: req.body.update_portfolio,
//         delete_portfolio: req.body.delete_portfolio,
//         site: req.body.site,
//         portfolio: req.body.portfolio,
//         technology: req.body.technology,
//         features: req.body.features,
//         portfolio: req.body.portfolio
//     }, {new: true})
//     .then(data => {
//         return res.status(200).send({
//             msg: " Permissions Updated Successfully! "
//         });

//         if(!data) {
//             return res.status(404).send({
//                 msg: "Portfolio not found with id " + req.params.id
//             });
//         }
//         const portfolio = portfoliosSerializer(data)
//         res.send(portfolio);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 msg: "Portfolio not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating portfolio with id " + req.params.id
//         });
//     });
// };


exports.delete = (req, res) => {
  Portfolio.findByIdAndRemove(req.params.id)
     .then(portfolio => {
         if(!portfolio) {
             return res.status(404).send({
                 message: "Portfolio not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Portfolio deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Portfolio not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete portfolio with id " + req.params.id
         });
     });
};

exports.search = (req, res) => {
    // console.log(req.body.industry)
    // console.log(req.body.technology)
    // console.log("feat",req.body.feature)
    // console.log("aaa",req.body.feature_property_name)
    // const feature_property_name = req.body.feature_property_name
    const feature = req.body.feature
    const checkedFeature = req.body.checkedFeature
    var id = [];
    var propertyName = [];

    for (var i = 0; i < feature.length; i++) {
        // console.log("featurezzz",feature[i].name)
        // console.log("feature2",feature[i]._id)
        if(feature[i].name == req.body.feature_property_name[i]){
            // console.log("feature",feature[i].name)
            // console.log("feature2",feature[i]._id)
            id.push(feature[i]._id)
            propertyName.push(feature[i].name)
        }
    }

   
    console.log("checkedFeature",checkedFeature)
    console.log("id",id)
    console.log("propertyName",propertyName)


    Portfolio.find({$or: [{industry: {$in: req.body.industry}}, {technology: {$in: req.body.technology}},
    {"feature.0.0": `${checkedFeature}`}, {"feature.0.1": propertyName }
    ]})
    .then(data => {
        console.log("data", data)
        res.send(data)
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving portfolios."
        });
    }
    );
};


exports.count = (req, res) => {
Portfolio.aggregate([
    {
        $group: {
            _id: {
                month: { $month: "$register_date" },
                year: { $year: "$register_date" },
                week: { $week: "$register_date" },
                day: { $dayOfMonth: "$register_date" },
            },
            count: { $sum: 1 },
        },
    },
])
    .then((data) => {
        const total = data.reduce((acc, item) => acc + item.count, 0);
        res.send({ data, total });    }
    )
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving features.",
        });
    }
    );
};





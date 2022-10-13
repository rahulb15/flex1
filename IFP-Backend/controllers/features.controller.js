import Features from '../models/features.model'
import { Property } from '../models/features.model';


const featuressSerializer = data => ({
    id: data.id,
    name: data.name,
    register_date: data.register_date,
    property_name: data.property_name,

});
const propertiesSerializer = data => ({
    id: data.id,
    name: data.name,
    register_date: data.register_date,

});

// Retrieve all data
exports.findAll =  (req, res) => {
    Features.find()
    .populate('property_name')
    .then(async data => {
        const featuress = await Promise.all(data.map(featuressSerializer));
        res.send(featuress);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving featuress."
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

    const paginated = await Features.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const featuress = await Promise.all(docs.map(featuressSerializer));
    
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, featuress });
};

exports.findOne = (req, res) => {
    console.log("find one")
    Features.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "features not found with id " + req.params.id
                });
            }
            const features = featuressSerializer(data)
            res.send(features);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Features not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving features with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {

    if(!req.body.name) {
         return res.status(400).send({
             message: "Map name can not be empty"
         });
    }

    const features = new Features({
        name: req.body.name.trim()
    });

    features.save()
    .then(data => {
        const features = featuressSerializer(data)
        res.send(features)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Features."
        });
    });
};

// create property_name and get property_name using populate
exports.createPropertyName = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Map name can not be empty"
        });
    }

    const property = new Property({
        name: req.body.name.trim()
    });

    property.save()
    .then(data => {
        Features.findByIdAndUpdate(req.params.id, {
            $push: { property_name: data._id }
        }, { new: true })
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Features not found with id " + req.params.id
                });
            }
            //populate property_name
            Features.findById(req.params.id)
            .populate('property_name')
            .then(data => {
                if(!data) {

                    return res.status(404).send({
                        message: "Features not found with id " + req.params.id
                    });
                }
                const features = featuressSerializer(data)
                res.send(features);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Features not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving features with id " + req.params.id
                });
            });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Features not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating features with id " + req.params.id
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Features."
        });
    });
};


//get all property name
exports.getAllPropertyName = (req, res) => {
    console.log("get all property name")
    Property.find()
    .then(async data => {
        const properties = await Promise.all(data.map(propertiesSerializer));
        // const properties = await Property.find();
        res.send(properties);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving featuress."
        });
    });
};

// //updTE property_name
// exports.updatePropertyName = (req, res) => {
//     Features.findByIdAndUpdate(req.params.id, {
//         property_name: req.body.property_name,
//     }, {new: true})
//     .then(data => {
//         if(!data) {
//             return res.status(404).send({
//                 message: "Features not found with id " + req.params.id
//             });
//         }
//         const features = featuressSerializer(data)
//         res.send(features);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Features not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating features with id " + req.params.id
//         });
//     });
// };

//populate property_name
exports.populatePropertyName = (req, res) => {
    Features.findById(req.params.id)
    .populate('property_name')
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "features not found with id " + req.params.id
            });
        }
        const features = featuressSerializer(data)
        res.send(features);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Features not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving features with id " + req.params.id
        });
    });
};




exports.update = (req, res) => {
    console.log('req.params.id',req.params.id)
    console.log('req.body',req.body)
    if(!req.body.name) {
        return res.status(400).send({
            message: "Features name can not be empty"
        });
    }

    Features.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim()
    }, {new: true}) 
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Features not found with id " + req.params.id
            });
        }
        const features = featuressSerializer(data)
        res.send(features);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Features not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating features with id " + req.params.id
        });
    });
};


//  //permissions
// exports.permissions = (req, res) => {
      
//     Features.findByIdAndUpdate(req.params.id, {
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
//         add_features: req.body.add_features,
//         view_features: req.body.view_features,
//         update_features: req.body.update_features,
//         delete_features: req.body.delete_features,
//         add_features: req.body.add_features,
//         view_features: req.body.view_features,
//         update_features: req.body.update_features,
//         delete_features: req.body.delete_features,
//         add_portfolio: req.body.add_portfolio,
//         view_portfolio: req.body.view_portfolio,
//         update_portfolio: req.body.update_portfolio,
//         delete_portfolio: req.body.delete_portfolio,
//         site: req.body.site,
//         features: req.body.features,
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
//                 msg: "Features not found with id " + req.params.id
//             });
//         }
//         const features = featuressSerializer(data)
//         res.send(features);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 msg: "Features not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating features with id " + req.params.id
//         });
//     });
// };


exports.delete = (req, res) => {
  Features.findByIdAndRemove(req.params.id)
     .then(features => {
         if(!features) {
             return res.status(404).send({
                 message: "Features not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Features deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Features not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete features with id " + req.params.id
         });
     });
};

exports.count = (req, res) => {
    Features.aggregate([
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
            res.send({ data, total });
        }
        )
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving features.",
            });
        }
        );
};



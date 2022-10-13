import Technology from '../models/technology.model'


const technologysSerializer = data => ({
    id: data.id,
    name: data.name,
    register_date: data.register_date,

});

// Retrieve all data
exports.findAll =  (req, res) => {
    Technology.find()
    .then(async data => {
        const technologys = await Promise.all(data.map(technologysSerializer));
        res.send(technologys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving technologys."
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

    const paginated = await Technology.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const technologys = await Promise.all(docs.map(technologysSerializer));
    
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, technologys });
};

exports.findOne = (req, res) => {
    Technology.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "technology not found with id " + req.params.id
                });
            }
            const technology = technologysSerializer(data)
            res.send(technology);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Technology not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving technology with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {

    if(!req.body.name) {
         return res.status(400).send({
             message: "Map name can not be empty"
         });
    }

    const technology = new Technology({
        name: req.body.name.trim()
    });

    technology.save()
    .then(data => {
        const technology = technologysSerializer(data)
        res.send(technology)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Technology."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name ) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    Technology.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
    
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Technology not found with id " + req.params.id
            });
        }
        const technology = technologysSerializer(data)
        res.send(technology);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Technology not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating technology with id " + req.params.id
        });
    });
};

//  //permissions
// exports.permissions = (req, res) => {
      
//     Technology.findByIdAndUpdate(req.params.id, {
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
//         add_technology: req.body.add_technology,
//         view_technology: req.body.view_technology,
//         update_technology: req.body.update_technology,
//         delete_technology: req.body.delete_technology,
//         add_features: req.body.add_features,
//         view_features: req.body.view_features,
//         update_features: req.body.update_features,
//         delete_features: req.body.delete_features,
//         add_portfolio: req.body.add_portfolio,
//         view_portfolio: req.body.view_portfolio,
//         update_portfolio: req.body.update_portfolio,
//         delete_portfolio: req.body.delete_portfolio,
//         site: req.body.site,
//         technology: req.body.technology,
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
//                 msg: "Technology not found with id " + req.params.id
//             });
//         }
//         const technology = technologysSerializer(data)
//         res.send(technology);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 msg: "Technology not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating technology with id " + req.params.id
//         });
//     });
// };


exports.delete = (req, res) => {
  Technology.findByIdAndRemove(req.params.id)
     .then(technology => {
         if(!technology) {
             return res.status(404).send({
                 message: "Technology not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Technology deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Technology not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete technology with id " + req.params.id
         });
     });
};



exports.count = (req, res) => {
    console.log('count')
    Technology.aggregate([
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

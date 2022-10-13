import Industry from '../models/industry.model'


const industrysSerializer = data => ({
    id: data.id,
    name: data.name,
    register_date: data.register_date,

});

// Retrieve all data
exports.findAll =  (req, res) => {
    Industry.find()
    .then(async data => {
        const industrys = await Promise.all(data.map(industrysSerializer));
        res.send(industrys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving industrys."
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

    const paginated = await Industry.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const industrys = await Promise.all(docs.map(industrysSerializer));
    
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, industrys });
};

exports.findOne = (req, res) => {
    Industry.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "industry not found with id " + req.params.id
                });
            }
            const industry = industrysSerializer(data)
            res.send(industry);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Industry not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving industry with id " + req.params.id
            });
        });
};

exports.create = async (req, res) => {
const {name} = req.body; 
    if(!req.body.name) {
         return res.status(400).send({
             message: "industry name can not be empty"
         });
    }

    try {
        const oldindustry = await Industry.findOne({ name });
        if (oldindustry) throw Error('Industry already exists');

    const industry = new Industry({
        name: name.trim()
    });

    industry.save()
    .then(data => {
        const industry = industrysSerializer(data)
        res.send(industry)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Industry."
        });
    });
}catch (e) {
    res.status(400).json({ error: e.message });
  }

};


exports.update = (req, res) => {
    if(!req.body.name ) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    Industry.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
    
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Industry not found with id " + req.params.id
            });
        }
        const industry = industrysSerializer(data)
        res.send(industry);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Industry not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating industry with id " + req.params.id
        });
    });
};



exports.delete = (req, res) => {
  Industry.findByIdAndRemove(req.params.id)
     .then(industry => {
         if(!industry) {
             return res.status(404).send({
                 message: "Industry not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Industry deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Industry not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete industry with id " + req.params.id
         });
     });
};

exports.count = (req, res) => {
    console.log("count")
    Industry.aggregate([
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
            res.send({ data, total });        }
        )
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving features.",
            });
        }
        );
};



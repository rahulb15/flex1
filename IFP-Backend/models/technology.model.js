import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');


const TechnologySchema = new Schema({
  name: {
    type: String,
    required: true,
    default:""
  },
  register_date: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
},
);



TechnologySchema.plugin(mongoosePaginate);
const Technology = model('technology', TechnologySchema);
export default Technology;

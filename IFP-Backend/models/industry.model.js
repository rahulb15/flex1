import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');


const IndustrySchema = new Schema({
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



IndustrySchema.plugin(mongoosePaginate);
const Industry = model('industry', IndustrySchema);
export default Industry;

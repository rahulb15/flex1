import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');


const FeaturesSchema = new Schema({
  name: {
    type: String,
    required: true,
    default:""
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  property_name: [{
    type: [Schema.Types.ObjectId],
    ref: 'property'
  }],
}, {
  timestamps: true
},
);

const PropertySchema = new Schema({
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




FeaturesSchema.plugin(mongoosePaginate);
PropertySchema.plugin(mongoosePaginate);
const Features = model('features', FeaturesSchema);
export const Property = model('property', PropertySchema);
export default Features;

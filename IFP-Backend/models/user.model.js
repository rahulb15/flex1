import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
const roles = ["admin", "user", "superadmin"];
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: roles,
    default: "admin"
  },
  add_permission: {
    type: Boolean,
    default: false
  },
  view_permission: {
    type: Boolean,
    default: false
  },
  update_permission: {
    type: Boolean,
    default: false
  },
  delete_permission: {
    type: Boolean,
    default: false
  },

  // module permission
  site: {
    type: Boolean,
    default: false
  },
  industry: {
    type: Boolean,
    default: false
  },
  technology: {
    type: Boolean,
    default: false
  },
  features: {
    type: Boolean,
    default: false
  },
  portfolio: {
    type: Boolean,
    default: false
  },
  add_site: {
    type: Boolean,
    default: false
  },
  view_site: {
    type: Boolean,
    default: false
  },
  update_site: {
    type: Boolean,
    default: false
  },
  delete_site: {
    type: Boolean,
    default: false
  },
  add_industry: {
    type: Boolean,
    default: false
  },
  view_industry: {
    type: Boolean,
    default: false
  },
  update_industry: {
    type: Boolean,
    default: false
  },
  delete_industry: {
    type: Boolean,
    default: false
  },
  add_technology: {
    type: Boolean,
    default: false
  },
  view_technology: {
    type: Boolean,
    default: false
  },
  update_technology: {
    type: Boolean,
    default: false
  },
  delete_technology: {
    type: Boolean,
    default: false
  },
  add_features: {
    type: Boolean,
    default: false
  },
  view_features: {
    type: Boolean,
    default: false
  },
  update_features: {
    type: Boolean,
    default: false
  },
  delete_features: {
    type: Boolean,
    default: false
  },
  add_portfolio: {
    type: Boolean,
    default: false
  },
  view_portfolio: {
    type: Boolean,
    default: false
  },
  update_portfolio: {
    type: Boolean,
    default: false
  },
  delete_portfolio: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "created",
    enum: ["created", "active", "inactive"]
  },
}, {
  timestamps: true
},
);

UserSchema.statics = {
  roles
};

UserSchema.plugin(mongoosePaginate);
const User = model('user', UserSchema);
User._roles = roles
export default User;

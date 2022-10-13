import { Schema, model } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

const PortfolioSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    register_date: {
      type: Date,
      default: Date.now,
    },
    project_name: {
      type: String,
      default: "",
    },
    live_url: {
      type: String,
      default: "",
    },
    staging_url: {
      type: String,
      default: "",
    },
    user_login: {
      type: String,
      default: "",
    },
    user_password: {
      type: String,
      default: "",
    },
    staging_admin_url: {
      type: String,
      default: "",
    },
    admin_user_login: {
      type: String,
      default: "",
    },
    admin_password: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      default: "",
    },
    technology: {
      type: String,
      default: "",
    },
    feature: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);



PortfolioSchema.plugin(mongoosePaginate);
const Portfolio = model("Portfolio", PortfolioSchema);
export default Portfolio;

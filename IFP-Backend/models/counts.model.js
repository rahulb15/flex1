import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const CountSchema = new Schema({
    register_count: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    update_count: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    delete_count: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
}, {
    timestamps: true
},
);


CountSchema.plugin(mongoosePaginate);
const Count = model('count', CountSchema);
export default Count;
'use strict'

const { mongoose } = require('../configs/dbConnection');

/* MODEL */

const DepartmentSchema = new mongoose.Schema({
    // _id
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
}, {
    collection: "departments",
    timestamps: true,
});

module.exports = mongoose.model('Department', DepartmentSchema);
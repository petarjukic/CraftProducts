import mongoose from "mongoose";


const company = new mongoose.Schema({
    name: {type: String},
    establishmentYear: {type: Number},
    country: {type: String},
    description: {type: String},
    logo: {type: String, default: ''},
});

export const Company = mongoose.model("Companie", company);

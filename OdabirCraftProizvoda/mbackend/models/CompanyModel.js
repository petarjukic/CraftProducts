import mongoose from "mongoose";


const Product = new mongoose.Schema({
    price: {type: Number},
    alcoholPercentage: {type: Number},
    color: {type: String},
    type: {type: String},
});

const company = new mongoose.Schema({
    name: {type: String},
    establishmentYear: {type: Number},
    country: {type: String},
    description: {type: String},
    logo: {type: String, default: ''},
    product: [Product]
});

export const Company = mongoose.model("Product", company);

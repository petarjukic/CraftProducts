import mongoose from "mongoose";


const product = new mongoose.Schema({
    price: {type: Number},
    alcoholPercentage: {type: Number},
    productName : {type: String},
    color: {type: String},
    type: {type: String},
    companyName: {type: String},
});

export const Product = mongoose.model("Product", product);
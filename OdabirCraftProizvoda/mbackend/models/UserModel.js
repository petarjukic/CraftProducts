import mongoose from "mongoose";


const userModel = new mongoose.Schema(
    {
    name:{type:String},
    password:{type:String, required: true},
    email:{type:String, unique: true, dropDups: true, required:true},
    }
);

export const UserModel = mongoose.model("User", userModel);
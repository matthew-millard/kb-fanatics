import { Schema, model } from "mongoose";

const UserVerificationSchema = new Schema({
    email: String, //this refers to our user ID in our records
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,


});

const UserVerification = model("UserVerification", UserVerificationSchema);

export default UserVerification;

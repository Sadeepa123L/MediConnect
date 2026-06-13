import { model, Schema } from 'mongoose'

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
 const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles:{
        type: [String],
        default: [UserRole.USER]
    },
    approved: {
        type: Boolean,
        default: true
    }
 });

 export const UserModel = model("User", userSchema);
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true
    },

    email: {
        type: String, unique: true, required: true
    },

    password: {
        type: String, required: true, minlength: 6
    },

    role: {
        type: String, enum: ["user", "admin"], default: "user"
    }
})

export default mongoose.model("User", UserSchema)
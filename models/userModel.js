const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email id is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: Number,
      required: [true, "Phone no is required"],
      unique: true,
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw06JTfrrySYof9jL19tx4wL&ust=1721821991562000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLj-y42NvYcDFQAAAAAdAAAAABAE",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("User", userSchema);

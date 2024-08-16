const mongoose = require("mongoose");
// Schema
const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Food Title is required"] },
    foodTags: { type: String },
    description: {
      type: String,
      required: [true, "Food Description is required"],
    },
    price: { type: Number, required: [true, "Price is required"] },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGvzbOSoSk5pfE52eh9eZiS9UzOKfCTlyxw&s",
    },
    category: { type: String },
    code: { type: String },
    isAvailable: { type: Boolean, default: true },
    resturant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    ratingCount: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Foods", foodSchema);

const mongoose = require("mongoose");

// Schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is rrequire"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Ffood-logo_8366720.html&psig=AOvVaw3ryoU0TXgZoufavWlld8AB&ust=1722258394352000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiksNvmyYcDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("Category", categorySchema);

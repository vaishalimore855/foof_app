const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category Created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category API",
      error,
    });
  }
};

// GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    // find category
    const categories = await categoryModel.find({});
    if (categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
};

//UPDATE CATEGORY BASE ON ID
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategories = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    if (!updatedCategories) {
      return res.status(500).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error,
    });
  }
};

//Delete By id Category
const deleteByIdCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(500).send({
        success: false,
        message: "Please Provide category id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Found category  with this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Delete category successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete by id category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteByIdCategoryController,
};

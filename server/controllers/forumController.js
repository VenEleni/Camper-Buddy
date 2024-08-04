const forumModel = require("../models/forumModel");

exports.getAllForum = async (req, res) => {
  try {
    const forums = await forumModel.find();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching forums" });
  }
};

exports.getForumById = async (req, res) => {
  const id = req.params.id;
  try {
    const forum = await forumModel.findById(id);
    if (!forum) {
      res.status(404).json({ msg: "forum not found" });
    }
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching forum" });
  }
};

exports.createForum = async (req, res) => {
  const { content } = req.body;
  try {
    const forum = await forumModel.create({ content });
    res.status(201).json(forum);
  } catch (error) {
    res.status(500).json({ msg: "Error creating forum" });
  }
};

exports.updateForumById = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    const forum = await forumModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ msg: "Error updating forum" });
  }
};

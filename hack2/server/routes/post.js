import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async (_, res) => {
  let data = await Post.find({}).sort({ timestamp: "desc" }).exec();
  console.log(data);

  if (data.length > 0) {
    res.status(200).send({
      message: "success",
      data: [data], //alter
    });
  } else {
    res.status(403).send({
      message: "error",
      data: null,
    });
  }
});

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", async (req, res) => {
  let id = req.query.pid; //find the id of the post
  console.log(id);

  let data = await Post.find({ postId: id });
  console.log(data);

  if (data.length > 0) {
    res.status(200).send({
      message: "success",
      post: [data], //alter
    });
  } else {
    res.status(403).send({
      message: "error",
      post: null,
    });
  }
});
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/newPost", (req, res) => {
  let { postId, title, content, timestamp } = req.body;

  console.log(req.body);
  savePost(postId, title, content, timestamp, res);
});

const savePost = async (postId, title, content, timestamp, res) => {
  const existing = await Post.find({ postId });

  if (existing.length === 0) {
    try {
      const newPost = new Post({ postId, title, content, timestamp });
      console.log("Created post", newPost);

      res.status(200).send({
        message: "success",
      });

      return newPost.save();
    } catch (e) {
      res.status(403).send({
        "message": "error",
        "post": null
    })
    }
  } else {
    console.log(`data exists!`);
    console.log(existing);
    res.status(403).send({
        "message": "error",
        "post": null

  })} 
};

// TODO 5-(1): create the 4th API (/api/post)
router.delete("/post", (req, res) => {
    let id = req.query.pid;
    console.log(id);
  deleteDB(id,res);
  //res.json({ message: "Database cleared" });
});

const deleteDB = async (id,res) => {
  try {
    
    await Post.find({ id: id}).deleteOne().exec();
    console.log("Data deleted");
    res.status(200).send({
      message: "success",
    });
  } catch (e) {
    res.status(403).send({
      message: "error",
      post: null,
    });
  }
};

export default router;

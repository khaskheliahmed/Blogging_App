import Like from '../models/like.models.js';
import Post from '../models/post.models.js' ;

// Like or Unlike a post
const likePost = async (req, res) => {
  const { postId } = req.body;

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({ user: req.userId, post: postId });
    
    if (existingLike) {
      // If like exists, unlike the post
      await Like.findByIdAndDelete(existingLike._id);

      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: req.userId } },
        { new: true } // Return updated post
      );

      return res.status(200).json({ message: 'Post unliked', post });
    }

    // If like doesn't exist, like the post
    const like = await Like.create({ user: req.userId, post: postId });

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: req.userId } },
      { new: true } // Return updated post
    );

    res.status(201).json({ message: 'Post liked', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { likePost };

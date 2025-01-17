import Post from "../models/post.models.js"
import User from "../models/user.models.js"

const createPost = async (req, res) => {
    const { title, content,userId } = req.body;
    try {        
        const findUser= await User.findById(userId)
        console.log(findUser);
        const post = await Post.create({
            title,
            content,
            user:findUser._id
        });
        res.status(201).json(post);
    } catch (error) {
        console.log(error,"error");
        
        res.status(400).json({ error: error.message });
    }
}

const getPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user' , 'username')
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export { createPost, getPost }
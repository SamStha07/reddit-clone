import { Request, Response, Router } from 'express';
import Comment from '../entities/Comment';
import Post from '../entities/Post';
import auth from '../middleware/auth';

const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const body = req.body.body;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });
    const comment = new Comment({
      body,
      user: res.locals.user,
      post,
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(404).json({ message: 'Post not found' });
  }
};

const router = Router();

router.post('/:identifier/:slug', auth, commentOnPost);

export default router;

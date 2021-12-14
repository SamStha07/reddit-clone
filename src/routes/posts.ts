import { Request, Response, Router } from 'express';
import Post from '../entities/Post';
import Sub from '../entities/Sub';
import auth from '../middleware/auth';

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  const user = res.locals.user;

  if (title.trim() === '') {
    return res.status(400).json({ title: 'Title must not be empty' });
  }

  if (sub.trim() === '') {
    return res.status(400).json({ title: 'Sub name must not be empty' });
  }

  try {
    // TODO: find sub
    const subRecord = await Sub.findOne({ name: sub });

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const router = Router();

router.post('/', auth, createPost);
// router.post('/login', login);
// router.get('/me', auth, me);
// router.get('/logout', auth, logout);

export default router;

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

    if (!subRecord) {
      return res.status(404).json({ message: 'Sub doesnot exists' });
    }

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
      // relations: ['comments'],
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const posts = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ['sub'] }
    );

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Post not found' });
  }
};

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:identifier/:slug', getPost);

export default router;

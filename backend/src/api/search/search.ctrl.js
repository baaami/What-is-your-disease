import Post from '../../models/post';
import sanitizeHtml from 'sanitize-html';

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered;
};

export const searchAll = async (ctx) => {
  const q = ctx.query.q;

  try {
    const posts = await Post.find({
      $or: [{ body: { $regex: q } }, { title: { $regex: q } }],
    });
    if (!posts) {
      console.log('Post not Exit in ', q);
      ctx.status = 200;
      return;
    }

    ctx.body = posts.map((post) => ({
      ...post.toJSON(),
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (err) {
    ctx.throw(500, err);
  }
};

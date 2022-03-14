import Post from '../../models/post';
import sanitizeHtml from 'sanitize-html';
import {
  getLatestPosts,
  getOldestPosts,
  getHotPosts,
} from '../posts/posts.ctrl';

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered;
};

export const searchAll = async (ctx) => {
  const { q, orderBy, diseasePeriod } = ctx.query;

  const postNum = parseInt(ctx.query.postNum || '10', 10);
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  let posts;
  const query = {
    $or: [
      { body: { $regex: q } },
      { title: { $regex: q } },
      { tags: { $regex: q } },
    ],
    ...(diseasePeriod ? { diseasePeriod: diseasePeriod } : {}),
  };

  switch (orderBy) {
    case 'latest': {
      try {
        posts = await getLatestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case 'oldest': {
      try {
        posts = await getOldestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case 'hotest': {
      try {
        posts = await getHotPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    default: {
      try {
        posts = await getLatestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
    }
  }

  const postCount = await Post.countDocuments(query).exec();
  const responseData = {
    postTotalCnt: postCount,
    data: {
      post: posts.map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      })),
    },
  };

  ctx.body = responseData;
};

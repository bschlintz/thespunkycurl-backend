import GhostContentAPI, { 
  GhostContentAPIOptions, 
  PostOrPage, 
} from '@tryghost/content-api';
import adminConfig from '../admin.config';
import { log } from './logger';

const api = new GhostContentAPI(adminConfig.ghost as GhostContentAPIOptions);
const coreFields = ['id', 'title', 'slug', 'published_at', 'updated_at', 'created_at', 'feature_image', 'meta_description'];

export const getAllGhostPosts =  async (): Promise<PostOrPage[]> => {
  log(`[GHOST] GetAllPosts`);
  const posts = await api.posts.browse({
    fields: [...coreFields],
    include: ['tags'],
    limit: 'all',
    order: 'published_at DESC',
  });
  return posts.map((p) => {
    p.page = false; // polyfill; Ghost API no longer sends this as of v5
    return p;
  });
};

export const getAllGhostPostsMetaOnly = async (): Promise<PostOrPage[]> => {
  log(`[GHOST] GetAllPostsMetaOnly`);
  const posts = await api.posts.browse({
    fields: [...coreFields],
    limit: 'all',
    order: 'published_at DESC',
  });
  return posts.map((p) => {
    p.page = false; // polyfill; Ghost API no longer sends this as of v5
    return p;
  });
};

export const getAllGhostPostSlugs = async (): Promise<string[]> => {
  log(`[GHOST] GetAllPostSlugs`);
  const posts = await api.posts.browse({
    fields: ['slug'],
    limit: 'all',
    order: 'published_at DESC',
  });
  return posts.map((post) => post.slug);
};

export const getGhostPostsWithTags = async (tagSlugs: string[]): Promise<PostOrPage[]> => {
  log(`[GHOST] GetPostsWithTags with '${tagSlugs.join(',')}'`);
  const postsWithTag = await api.posts.browse({
    filter: `tags:[${tagSlugs.join(',')}]`,
    fields: [...coreFields],
    include: ['tags'],
    limit: 'all',
    order: 'published_at DESC',
  });
  return postsWithTag.map((p) => {
    p.page = false; // polyfill; Ghost API no longer sends this as of v5
    return p;
  });
};

export const getGhostPostBySlug = async (slug: string): Promise<PostOrPage> => {
  log(`[GHOST] GetPostBySlug with '${slug}'`);
  const post = await api.posts.read({ slug }, {
    include: ['tags'],
  });
  post.page = false; // polyfill; Ghost API no longer sends this as of v5
  return post;
};

export const getGhostPageBySlug = async (slug: string): Promise<PostOrPage> => {
  log(`[GHOST] GetPageBySlug with '${slug}'`);
  const page = await api.pages.read({ slug });
  page.page = true; // polyfill; Ghost API no longer sends this as of v5
  return page;
};

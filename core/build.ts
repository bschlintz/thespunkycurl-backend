import { getAllGhostPostSlugs } from '../services/ghost';
import { log } from '../services/logger';

export const build = async (): Promise<void> => {
  const slugs = await getAllGhostPostSlugs();
  log('[BUILD] slugs', { data: { slugs }});
};

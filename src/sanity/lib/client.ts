import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: unknown) => {
  if (typeof source === 'object' && source !== null && 'asset' in source) {
    return builder.image(source);
  }
  throw new Error('Invalid source passed to urlFor');
};

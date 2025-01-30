import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/src/sanity/lib/client";

// Create an image URL builder instance
const builder = imageUrlBuilder(client);

export function getImageUrl(source: string) {
  return builder.image(source).url();
}

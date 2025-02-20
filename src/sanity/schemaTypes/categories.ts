import { defineType } from "sanity";

export const categorySchema = defineType({
  name: "categories",
  title: "Categories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
    },
    {
      name: "image",
      title: "Category Image",
      type: "image",
    },
    {
      name: "products",
      title: "Number of Products",
      type: "number",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
});

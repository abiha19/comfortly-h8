import { groq } from "next-sanity";

export const allCategory = groq`
  *[_type == "categories"] {
    _id,
    title,
    slug,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    },
    products
  }
`;


export const allProducts = groq`
  *[_type == "products"] {
    _id,
    title,
    description,
    price,
    badge,
    slug,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    }
  }
`;

export const firstSixProducts = groq`
  *[_type == "products"][0..5] {
    _id,
    title,
    description,
    price,
    badge,
    slug,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    }
  }
`;



export const firstEightProducts = groq`
  *[_type == "products"][0..7] {
    _id,
    title,
    description,
    price,
    badge,
    slug,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    }
  }
`;

export const firstFiveProducts = groq`
  *[_type == "products"][0..4] {
    _id,
    title,
    description,
    price,
    badge,
    slug,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    }
  }
`;




export const fourProducts = groq`*[type == "product][0..3]`
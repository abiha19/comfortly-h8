export interface Category {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    image?: {
      asset: {
        _ref: string;
        _type: "image";
      };
      alt?: string;
    };
    products?: number;
  }
  
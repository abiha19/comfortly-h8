export interface Product {
    _id: string;
    title: string;
    _type: "product";
    image?: {
      asset: {
        _ref: string;
        _type: "image";
      };
      alt?: string;
    };
    price: number;
    badge?: string;
    category?: {
      _ref: string;
      _type: "reference";
      to: {
        _type: "category";
        _ref: string;
      };
    };
    description?: string;
    slug: {
      _type: "slug";
      current: string;
    };
    inventory: number;
    priceWithoutDiscount: number;
    tags?: ("featured" | "instagram" | "gallery")[];
  }
  
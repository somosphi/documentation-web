export interface Product {
  id: string;
  categoryName: string;
  categorySlug: string;
  slug: string;
  title: string;
  price: number | null;
  detail: string | null;
  detailImgHref: string | null;
  imgHref: string | null;
}

export interface Capture {
  id: string;
  href: string;
  processed: boolean;
  categories?: string[];
  errMessage: string;
  createdAt: Date;
}

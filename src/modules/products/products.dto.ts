export type createProduct = {
  categoryId: number;
  controlId?: number;
  originId: number;
  roomId: number;
  name: string;
  sku: string;
  brokenAt?: boolean;
};

export type useProduct = {
  userHash: string;
  productHash: string;
};

export type deleteProduct = {
  hash: string;
};

export type updateProduct = {
  hash: string;
};

export type listProduct = {
  category: string;
  controlId: number;
  origin: string;
  room: string;
  name: string;
  sku: string;
  hash: string;
  brokenAt: Date;
};

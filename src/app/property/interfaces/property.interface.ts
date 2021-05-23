export interface Property {
  id: number;
  name: string;
  description: string;
  type: [string];
  imageUrl: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  categories: [string];
  active: boolean;
  status: string;
}

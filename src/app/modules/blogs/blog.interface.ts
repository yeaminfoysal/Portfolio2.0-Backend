export interface IBlog {
  _id?: string;
  title: string;
  author?: string;
  thumbnail: string;
  category: string;
  views?: number;
  description: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
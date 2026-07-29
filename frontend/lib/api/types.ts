// Base API response shapes

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  next_page: number | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

// Auth
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// Product
export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  imgURL: string;
  kategori: string;
  created_at: string;
  updated_at: string;
}

// Partner
export interface Partner {
  id: number;
  nama: string;
  imgURL: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

// Project
export interface Project {
  id: number;
  nama: string;
  deskripsi: string;
  imgURL: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}

// Message
export interface Message {
  id: number;
  nama: string;
  email: string;
  pesan: string;
  created_at: string;
}

export interface MessagePayload {
  nama: string;
  email: string;
  pesan: string;
}

// News
export interface News {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  imgURL: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

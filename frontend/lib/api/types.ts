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
  access_token: string;
  id: number;
  email: string;
  name: string;
}

// Product
export interface Product {
  id: number;
  kategori: string;
  nama: string;
  imgURL: string;
  deskripsi: string;
  logos: string;
}

// Partner
export interface Partner {
  id: number;
  nama: string;
  imgURL: string;
}

// Project
export interface Project {
  id: number;
  nama: string;
  imgURL: string;
}

// Message
export interface Message {
  id: number;
  nama: string;
  email: string;
  pesan: string;
  isNew: boolean;
  created_at: string;
  updated_at: string | null;
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
  kategori: string;
  news: string;
  imgURL: string;
  created_at: string;
  updated_at: string | null;
}

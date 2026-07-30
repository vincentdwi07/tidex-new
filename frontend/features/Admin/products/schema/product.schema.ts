import { KATEGORI_OPTIONS } from "../constant/products.constant";

export interface ProductFormValues {
  nama: string;
  deskripsi: string;
  kategori: string;
  logos: string; // comma-separated partner IDs
  imageFile?: File;
}

export const defaultProductForm: ProductFormValues = {
  nama: "",
  deskripsi: "",
  kategori: KATEGORI_OPTIONS[0],
  logos: "",
  imageFile: undefined,
};

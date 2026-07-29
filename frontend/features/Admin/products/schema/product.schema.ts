export interface ProductFormValues {
  nama: string;
  deskripsi: string;
  kategori: string;
  imageFile?: File;
}

export const defaultProductForm: ProductFormValues = {
  nama: "",
  deskripsi: "",
  kategori: "",
  imageFile: undefined,
};

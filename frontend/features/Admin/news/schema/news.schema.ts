export interface NewsFormValues {
  judul: string;
  kategori: string;
  news: string;
  imageFile?: File;
}

export const defaultNewsForm: NewsFormValues = {
  judul: "",
  kategori: "",
  news: "",
  imageFile: undefined,
};

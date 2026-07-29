export interface NewsFormValues {
  judul: string;
  konten: string;
  is_published: boolean;
  imageFile?: File;
}

export const defaultNewsForm: NewsFormValues = {
  judul: "",
  konten: "",
  is_published: false,
  imageFile: undefined,
};

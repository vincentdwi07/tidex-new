export interface ProjectFormValues {
  nama: string;
  deskripsi: string;
  company_name: string;
  imageFile?: File;
}

export const defaultProjectForm: ProjectFormValues = {
  nama: "",
  deskripsi: "",
  company_name: "",
  imageFile: undefined,
};

export interface ProjectFormValues {
  nama: string;
  imageFile?: File;
}

export const defaultProjectForm: ProjectFormValues = {
  nama: "",
  imageFile: undefined,
};

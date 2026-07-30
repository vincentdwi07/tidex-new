export interface PartnerFormValues {
  nama: string;
  imageFile?: File;
}

export const defaultPartnerForm: PartnerFormValues = {
  nama: "",
  imageFile: undefined,
};

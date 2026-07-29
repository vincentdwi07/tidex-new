export interface PartnerFormValues {
  nama: string;
  website_url: string;
  imageFile?: File;
}

export const defaultPartnerForm: PartnerFormValues = {
  nama: "",
  website_url: "",
  imageFile: undefined,
};

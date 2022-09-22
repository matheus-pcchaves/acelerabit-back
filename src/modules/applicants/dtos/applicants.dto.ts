export type ApplicantsDTO = {
  id?: string;
  userId: string;
  jobId: string;
  name: string;
  skills: string;
  experience: string;
  curriculum: string;
  approved?: boolean;
};

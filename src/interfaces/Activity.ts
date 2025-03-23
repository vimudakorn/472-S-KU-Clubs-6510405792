export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: string;
  clubId: string;
  fee: string;
  deadline: string;
  maxParticipants: number;
  benefits: {
    certificate: boolean;
    other: string;
  };
  requirements: string;
  detailedDescription: string;
  summary?: string;
  images?: string[];
}
export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface JobInput {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface JobPosting {
    company: string;
    logo: string;
    title: string;
    salary: {
      min: number;
      max: number;
    };
    description: string;
    location: string;
    postedDate: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    icon?: any;
  }
  
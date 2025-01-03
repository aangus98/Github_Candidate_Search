
// Define the interface for a Candidate object
export interface Candidate {
    id: number; // Unique identifier for the candidate
    image: string; // URL to the candidate's profile picture
    name: string; // Full name of the candidate
    location: string; // Location of the candidate
    email: string; // Email address of the candidate
    company: string; // Current employer
    bio: string; // Short bio of the candidate
    rejected: boolean; // Whether the candidate has been rejected
  }
  
  
  
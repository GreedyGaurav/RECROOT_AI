import mongoose, { Document, Schema } from 'mongoose';

export interface IJobDescription extends Document {
  userId: string;
  jobTitle: string;
  techStack: string[];
  experienceLevel: string;
  workMode: string;
  aboutCompany?: string;
  generatedContent: {
    aboutUs: string;
    responsibilities: string[];
    requiredSkills: string[];
    benefits: string[];
  };
  isDraft: boolean;
  isCompetitorJD?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobDescriptionSchema = new Schema<IJobDescription>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  techStack: [{
    type: String,
    default: [],
  }],
  experienceLevel: {
    type: String,
    required: true,
  },
  workMode: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
  },
  generatedContent: {
    aboutUs: {
      type: String,
      required: true,
    },
    responsibilities: [{
      type: String,
      default: [],
    }],
    requiredSkills: [{
      type: String,
      default: [],
    }],
    benefits: [{
      type: String,
      default: [],
    }],
  },
  isDraft: {
    type: Boolean,
    default: true,
  },
  isCompetitorJD: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.JobDescription || mongoose.model<IJobDescription>('JobDescription', jobDescriptionSchema); 
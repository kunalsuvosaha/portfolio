import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
      default: '',
      trim: true,
    },
    liveLink: {
      type: String,
      required: true,
      trim: true,
    },
    githubLink: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

ProjectSchema.index(
  { rank: 1 },
  {
    unique: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

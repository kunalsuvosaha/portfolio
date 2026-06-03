import mongoose from 'mongoose';

const ImageAssetSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: '',
      trim: true,
    },
    publicId: {
      type: String,
      default: '',
      trim: true,
    },
    alt: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: false }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    profileImage: {
      type: ImageAssetSchema,
      default: () => ({}),
    },
    heroBackgroundImage: {
      type: ImageAssetSchema,
      default: () => ({}),
    },
    schoolImage: {
      type: ImageAssetSchema,
      default: () => ({}),
    },
    bcaImage: {
      type: ImageAssetSchema,
      default: () => ({}),
    },
    mcaImage: {
      type: ImageAssetSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

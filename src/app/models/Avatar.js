import mongoose from 'mongoose';

class Avatar {
  static init() {
    const AvatarSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    return mongoose.model('Avatar', AvatarSchema);
  }
}

export default Avatar.init();

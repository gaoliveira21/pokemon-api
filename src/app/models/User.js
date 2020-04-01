import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

class User {
  static init() {
    const UserSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    // eslint-disable-next-line func-names
    UserSchema.pre('save', async function (next) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;

      next();
    });

    return mongoose.model('User', UserSchema);
  }
}

export default User.init();

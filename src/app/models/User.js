import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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

    const generateHash = async (password) => {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    };

    // eslint-disable-next-line func-names
    UserSchema.pre('save', async function (next) {
      this.password = await generateHash(this.password);
      return next();
    });

    const UserModel = mongoose.model('User', UserSchema);

    // eslint-disable-next-line func-names
    UserModel.prototype.generateToken = function (authConfig) {
      // eslint-disable-next-line dot-notation
      return jwt.sign({ id: this['_id'] }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });
    };

    return UserModel;
  }
}

export default User.init();

import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    await schema
      .validate(req.body)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ success: false, error: 'User not found' });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ success: false, error: 'Password does not match' });

    const { _id, name } = user;

    return res.status(201).json({
      user: { _id, name, email },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

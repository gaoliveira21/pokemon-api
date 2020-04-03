import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    });

    await schema.validate(req.body).catch((err) =>
      res.status(400).json({
        success: false,
        error: err.name,
        details: err.errors,
      })
    );

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, error: 'User already exists' });

    const { _id, name } = await User.create(req.body);

    return res.status(201).json({ success: true, user: { _id, name, email } });
  }

  async update(req, res) {
    if (!Object.keys(req.body).length)
      return res
        .status(400)
        .json({ success: false, error: 'No request body sent' });

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    await schema
      .validate(req.body)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const { email, oldPassword } = req.body;

    const user = await User.findById(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists)
        return res
          .status(400)
          .json({ success: false, error: 'User already exists' });
    }

    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password)))
      return res
        .status(400)
        .json({ success: false, error: 'Password does not match' });

    const { password } = req.body;

    if (password) req.body.password = await bcrypt.hash(password, 10);

    const { _id, name, email: userEmail } = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      {
        new: true,
      }
    );

    return res.json({ _id, name, email: userEmail });
  }
}

export default new UserController();

import * as yup from 'yup';

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
}

export default new UserController();

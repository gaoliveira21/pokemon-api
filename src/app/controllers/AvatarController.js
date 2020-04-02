import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const avatar = await Avatar.create({
      name,
      path,
      url: `http://localhost:3333/avatar/${path}`,
    });

    const { _id, url } = avatar;

    return res.status(201).json({ _id, path, url });
  }
}

export default new AvatarController();

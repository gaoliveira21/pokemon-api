import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const avatar = await Avatar.create({
      name,
      path,
      url: `http://localhost:3333/avatar/${path}`,
    });

    return res.status(201).json(avatar);
  }
}

export default new AvatarController();

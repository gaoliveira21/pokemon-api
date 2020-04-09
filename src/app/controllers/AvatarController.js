import * as yup from 'yup';
import multer from 'multer';
import multerConfig from '../../config/multer';
import Avatar from '../models/Avatar';

const uploads = multer(multerConfig).single('avatar');

class AvatarController {
  async store(req, res) {
    uploads(req, res, async (err) => {
      const schema = yup.object().shape({
        file: yup.object().required(),
      });

      await schema
        .validate(req)
        .catch((error) =>
          res.status(400).json({ error: error.name, details: error.errors })
        );

      if (err) return res.status(400).json({ error: err });

      const { originalname: name, filename: path } = req.file;
      const avatar = await Avatar.create({
        name,
        path,
        url: `http://localhost:3333/avatar/${path}`,
      });

      const { _id, url } = avatar;

      return res.status(201).json({ _id, path, url });
    });
  }
}

export default new AvatarController();

import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(14, (err, res) => {
        if (err) return cb(err);

        const permittedExt = ['.jpg', '.png'];

        if (permittedExt.indexOf(extname(file.originalname)) === -1)
          return cb('file extension is not permitted');

        return cb(
          null,
          res.toString('hex') +
            new Date().getTime() +
            extname(file.originalname)
        );
      });
    },
  }),
};

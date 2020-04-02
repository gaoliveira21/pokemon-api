import * as yup from 'yup';

import Pokemon from '../models/Pokemon';
import Avatar from '../models/Avatar';

class PokemonController {
  async index(req, res) {
    const schema = yup.object().shape({
      page: yup.number().positive(),
      limit: yup.number().positive(),
    });

    await schema
      .validate(req.query)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const { page = 1, limit = 10 } = req.query;

    const pokemons = await Pokemon.paginate(
      {},
      {
        page,
        limit,
        populate: { path: 'avatar', select: ['_id', 'path', 'url'] },
      }
    );

    return res.json(pokemons);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      avatar: yup.string(),
      attributes: yup.object().shape({
        atk: yup.number().positive().required(),
        def: yup.number().positive().required(),
        spd: yup.number().positive().required(),
        spAtack: yup.number().positive().required(),
        spDef: yup.number().positive().required(),
        hp: yup.number().positive().required(),
      }),
      skills: yup
        .array()
        .max(3)
        .min(1)
        .of(
          yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            force: yup.number().positive().max(120).min(15),
          })
        ),
      type: yup.string().required(),
    });

    await schema
      .validate(req.body)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const { avatar: avatar_id, name } = req.body;

    if (avatar_id) {
      try {
        await Avatar.findById(avatar_id);
      } catch (error) {
        return res
          .status(404)
          .json({ success: false, error: 'Avatar not found' });
      }
    }

    const pokemonExists = await Pokemon.findOne({ name });

    if (pokemonExists)
      return res
        .status(400)
        .json({ success: false, error: 'Pokemon already exists' });

    const pokemon = await Pokemon.create(req.body);

    return res.status(201).json(pokemon);
  }
}

export default new PokemonController();

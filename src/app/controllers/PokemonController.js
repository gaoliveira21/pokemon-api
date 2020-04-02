import * as yup from 'yup';

import Pokemon from '../models/Pokemon';

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

    const pokemons = await Pokemon.paginate({}, { page, limit });

    return res.json(pokemons);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      skills: yup.array().max(3).min(1),
      type: yup.string().required(),
    });

    await schema
      .validate(req.body)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const pokemon = await Pokemon.create(req.body);

    return res.status(201).json(pokemon);
  }
}

export default new PokemonController();
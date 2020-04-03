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
        select: ['attributes', 'name', 'description', 'skills', 'type'],
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
        .required()
        .of(
          yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            force: yup.number().positive().max(120).min(15).required(),
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

  async show(req, res) {
    const { id } = req.params;

    try {
      const pokemon = await Pokemon.findById(id)
        .populate('avatar', ['_id', 'path', 'url'])
        .select(['attributes', 'name', 'description', 'skills', 'type']);
      return res.json(pokemon);
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, error: 'Pokemon not found' });
    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      description: yup.string(),
      avatar: yup.string(),
      attributes: yup.object().shape({
        atk: yup.number().positive(),
        def: yup.number().positive(),
        spd: yup.number().positive(),
        spAtack: yup.number().positive(),
        spDef: yup.number().positive(),
        hp: yup.number().positive(),
      }),
      skills: yup
        .array()
        .max(3)
        .min(1)
        .of(
          yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            force: yup.number().positive().max(120).min(15).required(),
          })
        ),
      type: yup.string(),
    });

    await schema
      .validate(req.body)
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, error: err.name, details: err.errors })
      );

    const { id } = req.params;
    const { avatar, name, attributes } = req.body;

    try {
      const pokemon = await Pokemon.findById(id);

      if (name && name !== pokemon.name) {
        const pokemonExists = await Pokemon.findOne({ name });

        if (pokemonExists)
          return res
            .status(400)
            .json({ success: false, error: 'Pokemon already exists' });
      }

      if (avatar && avatar !== pokemon.avatar) {
        try {
          const avatarExists = await Avatar.findById(avatar);

          if (!avatarExists)
            return res
              .status(404)
              .json({ success: false, error: 'Avatar not found' });
        } catch (error) {
          return res
            .status(404)
            .json({ success: false, error: 'Avatar not found' });
        }
      }

      if (attributes && attributes !== pokemon.attributes) {
        req.body.attributes = Object.assign(pokemon.attributes, attributes);
      }

      const newPokemon = await Pokemon.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate('avatar', ['_id', 'path', 'url']);

      return res.json(newPokemon);
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: 'Pokemon not found',
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Pokemon.findByIdAndRemove(id);
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, error: 'Pokemon not found' });
    }

    return res.json({ success: true, msg: 'Pokemon was removed' });
  }
}

export default new PokemonController();

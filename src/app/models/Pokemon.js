import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

class Pokemon {
  static init() {
    const PokemonSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        description: {
          type: String,
          required: true,
        },
        avatar: {
          type: mongoose.Schema.ObjectId,
          ref: 'Avatar',
        },
        skills: [
          {
            name: {
              type: String,
              required: true,
            },
            force: {
              type: Number,
              min: 15,
              max: 120,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
          },
        ],
        attributes: {
          atk: { type: Number, required: true },
          def: { type: Number, required: true },
          spd: { type: Number, required: true },
          spAtack: { type: Number, required: true },
          spDef: { type: Number, required: true },
          hp: { type: Number, required: true },
        },
        type: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    mongoose.plugin(mongoosePaginate);

    return mongoose.model('Pokemon', PokemonSchema);
  }
}

export default Pokemon.init();

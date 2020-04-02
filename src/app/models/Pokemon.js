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

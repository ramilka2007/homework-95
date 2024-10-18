import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2] = await User.create(
    {
      username: 'user@shop.local',
      password: '1qaz@WSX',
      role: 'user',
      displayName: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@shop.local',
      password: '1@345qWert',
      role: 'admin',
      displayName: 'admin',
      token: crypto.randomUUID(),
    },
  );

  await Cocktail.create(
    {
      user: user1,
      name: 'Vodka',
      recipe: 'Просто налейте водку',
      ingredients: [
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
      ],
      image: null,
      isPublished: true,
    },
    {
      user: user2,
      name: 'Пиво',
      recipe: 'Просто налейте пиво',
      ingredients: [
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
      ],
      image: 'fixtures/пиво.jpeg',
      isPublished: false,
    },
    {
      user: user1,
      name: 'Другое пиво',
      recipe: 'Просто налейте другое пиво',
      ingredients: [
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
        {
          name: 'Спирт',
          amount: '10 мл',
        },
      ],
      image: null,
      isPublished: false,
    },
  );

  await db.close();
};

run().catch(console.error);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const getCocktails = createAsyncThunk('cocktails/get-all', async () => {
  const { data: cocktails } = await axiosApi.get(`/cocktails`);
  return cocktails ?? [];
});

export const getCocktailById = createAsyncThunk(
  'cocktails/get-by-id',
  async (id: string) => {
    const { data: cocktail } = await axiosApi.get(`/cocktails/${id}`);
    return cocktail ?? null;
  },
);

export const addCocktail = createAsyncThunk(
  'cocktails/add-new-cocktail',
  async (newAlbum) => {
    const data = new FormData();
    data.append('name', newAlbum.name);

    if (newAlbum.image !== null) {
      data.append('image', newAlbum.image);
    }
    data.append('recipe', newAlbum.recipe);
    data.append('ingredients', JSON.stringify(newAlbum.ingredients));

    return await axiosApi.post('/cocktails', data);
  },
);

export const cocktailPublish = createAsyncThunk(
  'cocktails/publish-cocktail',
  async (id: string) => {
    await axiosApi.patch(`/cocktails/${id}/togglePublished`);
  },
);

export const deleteCocktail = createAsyncThunk(
  'cocktails/delete-cocktail',
  async (id: string) => {
    await axiosApi.delete(`/cocktails/${id}`);
  },
);

import { createSlice } from '@reduxjs/toolkit';
import { Cocktail } from '../../types.ts';
import {
  addCocktail,
  cocktailPublish,
  deleteCocktail,
  getCocktailById,
  getCocktails,
} from './cocktailsThunk.ts';

interface cocktailsState {
  cocktails: Cocktail[];
  unpublishedCocktails: Cocktail[];
  cocktail: Cocktail | null;
  isLoading: boolean;
  addLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  isError: boolean;
}

const initialState: cocktailsState = {
  cocktails: [],
  unpublishedCocktails: [],
  cocktail: null,
  isLoading: false,
  addLoading: false,
  publishLoading: false,
  deleteLoading: false,
  isError: false,
};

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCocktails.pending, (state) => {
        state.addLoading = true;
        state.isError = false;
      })
      .addCase(getCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.addLoading = false;
        state.cocktails = cocktails.filter(
          (cocktail) => cocktail.isPublished === true,
        );
        state.unpublishedCocktails = cocktails.filter(
          (cocktail) => cocktail.isPublished === false,
        );
      })
      .addCase(getCocktails.rejected, (state) => {
        state.addLoading = false;
        state.isError = true;
      });

    builder
      .addCase(getCocktailById.pending, (state) => {
        state.addLoading = true;
        state.isError = false;
      })
      .addCase(getCocktailById.fulfilled, (state, { payload: cocktail }) => {
        state.addLoading = false;
        state.cocktail = cocktail;
      })
      .addCase(getCocktailById.rejected, (state) => {
        state.addLoading = false;
        state.isError = true;
      });

    builder
      .addCase(addCocktail.pending, (state) => {
        state.addLoading = true;
        state.isError = false;
      })
      .addCase(addCocktail.fulfilled, (state) => {
        state.addLoading = false;
        state.isError = false;
      })
      .addCase(addCocktail.rejected, (state) => {
        state.addLoading = false;
        state.isError = true;
      });
    builder
      .addCase(cocktailPublish.pending, (state) => {
        state.publishLoading = true;
        state.isError = false;
      })
      .addCase(cocktailPublish.fulfilled, (state) => {
        state.publishLoading = false;
        state.isError = false;
      })
      .addCase(cocktailPublish.rejected, (state) => {
        state.publishLoading = false;
        state.isError = true;
      });

    builder
      .addCase(deleteCocktail.pending, (state) => {
        state.deleteLoading = true;
        state.isError = false;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deleteLoading = false;
        state.isError = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.deleteLoading = false;
        state.isError = true;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectUnpublishedCocktails: (state) => state.unpublishedCocktails,
    selectCocktail: (state) => state.cocktail,
    selectCocktailsIsLoading: (state) => state.isLoading,
    selectCocktailAddLoading: (state) => state.isLoading,
    selectCocktailPublishLoading: (state) => state.publishLoading,
    selectCocktailDeleteLoading: (state) => state.deleteLoading,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
  selectCocktails,
  selectUnpublishedCocktails,
  selectCocktail,
  selectCocktailsIsLoading,
  selectCocktailAddLoading,
  selectCocktailPublishLoading,
  selectCocktailDeleteLoading,
} = cocktailsSlice.selectors;

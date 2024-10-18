import { createSlice } from '@reduxjs/toolkit';
import {Cocktail} from "../../types.ts";
import {addCocktail, getCocktailById, getCocktails} from "./cocktailsThunk.ts";

interface cocktailsState {
    cocktails: Cocktail[];
    unpublishedCocktails: Cocktail[];
    cocktail: Cocktail | null;
    isLoading: boolean;
    addLoading: boolean;
    isError: boolean;
}

const initialState: cocktailsState = {
    cocktails: [],
    unpublishedCocktails: [],
    cocktail: null,
    isLoading: false,
    addLoading: false,
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
                state.cocktails = cocktails.filter((cocktail) => cocktail.isPublished === true);
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

        builder.addCase(addCocktail.pending, (state) => {
            state.addLoading = true
            state.isError = false
        }).addCase(addCocktail.fulfilled, (state) => {
            state.addLoading = false
            state.isError = false
        }).addCase(addCocktail.rejected, (state) => {
            state.addLoading = false
            state.isError = true
        })
    },
    selectors: {
        selectCocktails: (state) => state.cocktails,
        selectUnpublishedCocktails: (state) => state.unpublishedCocktails,
        selectCocktail: (state) => state.cocktail,
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
    selectCocktails,
    selectUnpublishedCocktails,
    selectCocktail
} = cocktailsSlice.selectors;

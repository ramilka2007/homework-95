import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../UI/FileInput/FileInput';
import { CocktailForm } from '../../types';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addCocktail } from '../../features/cocktails/cocktailsThunk.ts';
import { selectCocktailAddLoading } from '../../features/cocktails/cocktailsSlice.ts';
import { toast } from 'react-toastify';

const CocktailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addLoading = useAppSelector(selectCocktailAddLoading);
  const [newCocktail, setNewCocktail] = useState<CocktailForm>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [
      {
        name: '',
        amount: '',
      },
    ],
  });

  const addIngredient = () => {
    setNewCocktail((cocktail) => ({
      ...cocktail,
      ingredients: [...cocktail.ingredients, { name: '', amount: '' }],
    }));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addCocktail(newCocktail));
    toast.success('The cocktail is under review by the moderator!');
    navigate('/');
  };

  const changeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewCocktail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setNewCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index,
  ) => {
    const { name, value } = event.target;
    setNewCocktail((prev) => {
      const ingredientsCopy = [...prev.ingredients];
      ingredientsCopy[index] = { ...ingredientsCopy[index], [name]: value };
      return {
        ...prev,
        ingredients: ingredientsCopy,
      };
    });
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit} className="w-50 mx-auto">
        <h2 className="text-center my-4">Create new item card</h2>
        <div className="mb-3 mx-auto">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="form-control"
            value={newCocktail.name}
            onChange={changeForm}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          {newCocktail.ingredients.map((ingredient, index) => (
            <div key={`ingredient${index}`} className="d-flex gap-5 mb-3">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ingredient name"
                required
                className="form-control"
                value={ingredient.name}
                onChange={(event) => onIngredientChange(event, index)}
              />
              <input
                type="text"
                name="amount"
                id="amount"
                placeholder="Ingredient amount"
                required
                className="form-control"
                value={ingredient.amount}
                onChange={(event) => onIngredientChange(event, index)}
              />
              {index > 0 && (
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              )}
            </div>
          ))}
          <Button className="btn btn-primary" onClick={addIngredient}>
            Add ingredient
          </Button>
        </div>
        <div className="mb-3 mx-auto">
          <label htmlFor="name" className="form-label">
            Recipe
          </label>
          <textarea
            name="recipe"
            id="recipe"
            className="form-control"
            value={newCocktail.recipe}
            onChange={changeForm}
            required
          ></textarea>
        </div>
        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <LoadingButton
          type="submit"
          className="btn btn-primary mt-3"
          loading={addLoading}
        >
          Create
        </LoadingButton>
      </form>
    </div>
  );
};

export default CocktailForm;

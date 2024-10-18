import React, { useEffect } from 'react';
import {
  cocktailPublish,
  deleteCocktail,
  getCocktails,
} from '../../features/cocktails/cocktailsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectCocktails,
  selectCocktailsIsLoading,
} from '../../features/cocktails/cocktailsSlice.ts';
import CocktailItem from '../../components/CocktailItem/CocktailItem.tsx';
import Spinner from '../../UI/Spinner/Spinner.tsx';

const Home = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectCocktailsIsLoading);

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  const cocktailDeleter = async (id: string) => {
    try {
      await dispatch(deleteCocktail(id));
      await dispatch(getCocktails());
    } catch (e) {
      console.log(e);
    }
  };

  const togglePublishCocktail = async (id: string) => {
    await dispatch(cocktailPublish(id));
    await dispatch(getCocktails());
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {cocktails.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
              {cocktails.map((cocktail) => (
                <CocktailItem
                  key={cocktail._id}
                  cocktail={cocktail}
                  cocktailDelete={cocktailDeleter}
                  cocktailPublish={togglePublishCocktail}
                />
              ))}
            </div>
          ) : (
            <h1>No published cocktails.</h1>
          )}
        </>
      )}
    </>
  );
};

export default Home;

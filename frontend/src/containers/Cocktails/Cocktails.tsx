import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  cocktailPublish,
  deleteCocktail,
  getCocktails,
} from '../../features/cocktails/cocktailsThunk.ts';
import {
  selectCocktails,
  selectCocktailsIsLoading,
  selectUnpublishedCocktails,
} from '../../features/cocktails/cocktailsSlice.ts';
import CocktailItem from '../../components/CocktailItem/CocktailItem.tsx';
import { selectUser } from '../../features/users/usersSlice.ts';
import Spinner from '../../UI/Spinner/Spinner.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);
  const unpublishedCocktails = useAppSelector(selectUnpublishedCocktails);
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
    user && (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div>
              {cocktails.length > 0 ? (
                <>
                  <h3>Published cocktails:</h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                    <>
                      {cocktails.map((cocktail) => (
                        <>
                          {user._id === cocktail.user._id ||
                          user.role === 'admin' ? (
                            <>
                              <CocktailItem
                                key={cocktail._id}
                                cocktail={cocktail}
                                cocktailDelete={cocktailDeleter}
                                cocktailPublish={togglePublishCocktail}
                              />
                            </>
                          ) : null}
                        </>
                      ))}
                    </>
                  </div>
                </>
              ) : null}
            </div>
            <div>
              {unpublishedCocktails.length > 0 ? (
                <>
                  <h3>Unpublished cocktails:</h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                    <>
                      {unpublishedCocktails.map((cocktail) => (
                        <>
                          {user._id === cocktail.user._id ||
                          user.role === 'admin' ? (
                            <>
                              <CocktailItem
                                key={cocktail._id}
                                cocktail={cocktail}
                                cocktailDelete={cocktailDeleter}
                                cocktailPublish={togglePublishCocktail}
                              />
                            </>
                          ) : null}
                        </>
                      ))}
                    </>
                  </div>
                </>
              ) : null}
            </div>
          </>
        )}
      </>
    )
  );
};

export default Cocktails;

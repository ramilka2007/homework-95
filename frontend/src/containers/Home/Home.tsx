import React, {useEffect} from 'react';
import {getCocktails} from "../../features/cocktails/cocktailsThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCocktails} from "../../features/cocktails/cocktailsSlice.ts";
import CocktailItem from "../../components/CocktailItem/CocktailItem.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch]);
    return (
        <>
            {cocktails.length > 0 ?
                <>
                    {cocktails.map((cocktail) => {
                        <CocktailItem key={cocktail._id} cocktail={cocktail}/>
                    })}
                </> : <h1>No cocktails</h1>}
        </>
    );
};

export default Home;
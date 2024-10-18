import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getCocktailById} from "../../features/cocktails/cocktailsThunk.ts";
import {useParams} from "react-router-dom";
import {selectCocktail} from "../../features/cocktails/cocktailsSlice.ts";
import NoImage from "../../assets/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
import {API_URL} from "../../constants.ts";

const OneCocktail = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const cocktail = useAppSelector(selectCocktail);

    useEffect(() => {
        dispatch(getCocktailById(params.id))
    }, [dispatch])
    return cocktail && (
        <div className="container">
            <div className="d-flex gap-5 text-start">
                <div>
                    <img src={cocktail.image ? API_URL + '/' + cocktail.image : NoImage} alt="" width="400px" height="auto" />
                </div>
                <div>
                    <h1 className="fs-1 text-decoration-underline">{cocktail.name}</h1>
                    <h2>Ingredients:</h2>
                    <ul>
                        {cocktail.ingredients.map(ingredient => (
                            <li key={ingredient.id}>{ingredient.name} - {ingredient.amount}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-start mt-5">
                <h1>Recipe:</h1>
                <p>{cocktail.recipe}</p>
            </div>
        </div>
    );
};

export default OneCocktail;
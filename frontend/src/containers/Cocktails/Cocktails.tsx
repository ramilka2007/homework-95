import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks.ts";
import {getCocktails} from "../../features/cocktails/cocktailsThunk.ts";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch]);
    return (
        <div>
            
        </div>
    );
};

export default Cocktails;
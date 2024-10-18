import React, {useEffect} from 'react';
import {Cocktail} from "../../types.ts";
import { Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {API_URL} from "../../constants.ts";
import NoImage from "../../assets/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
import {selectUser} from "../../features/users/usersSlice.ts";
import {NavLink} from "react-router-dom";

interface Props {
    cocktail: Cocktail;
    cocktailDelete: (id: string) => void;
    cocktailPublish: (id: string) => void;
}

const CocktailItem: React.FC<Props> = ({cocktail, cocktailDelete, cocktailPublish}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    useEffect(() => {
    }, [dispatch])
    return (
        <Card sx={{ maxWidth: 345 }}>
            <NavLink to={`/cocktails/${cocktail._id}`} className="text-decoration-none text-dark">
                <CardHeader
                    avatar={
                        <img
                            src={API_URL + '/' + cocktail.user.avatar}
                            alt=""
                            width="50px"
                            height="50px"
                            className="rounded-circle ms-2"
                        />
                    }
                    title={cocktail.user.displayName}
                    subheader={cocktail.isPublished ? null : "Cocktail hasn't published yet."}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={cocktail.image ? API_URL + '/' + cocktail.image : NoImage}
                    alt=""
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {cocktail.recipe}
                    </Typography>
                </CardContent>
            </NavLink>
            {user.role === 'admin' && (
                <div className="mb-3">
                    <button
                        className="btn btn-danger me-2"
                        onClick={() => cocktailDelete(cocktail._id)}
                    >
                        Delete
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => cocktailPublish(cocktail._id)}
                    >
                        {cocktail.isPublished ? <>Unpublish</> : <>Publish</>}
                    </button>
                </div>
            )}
        </Card>
    );
};

export default CocktailItem;
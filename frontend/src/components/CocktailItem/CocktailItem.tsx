import React, { useEffect } from 'react';
import { Cocktail } from '../../types.ts';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { API_URL } from '../../constants.ts';
import NoImage from '../../assets/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
import { selectUser } from '../../features/users/usersSlice.ts';
import { NavLink } from 'react-router-dom';
import {
  selectCocktailDeleteLoading,
  selectCocktailPublishLoading,
} from '../../features/cocktails/cocktailsSlice.ts';
import { LoadingButton } from '@mui/lab';

interface Props {
  cocktail: Cocktail;
  cocktailDelete: (id: string) => void;
  cocktailPublish: (id: string) => void;
}

const CocktailItem: React.FC<Props> = ({
  cocktail,
  cocktailDelete,
  cocktailPublish,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectCocktailDeleteLoading);
  const publishLoading = useAppSelector(selectCocktailPublishLoading);

  useEffect(() => {}, [dispatch]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <NavLink
        to={`/cocktails/${cocktail._id}`}
        className="text-decoration-none text-dark"
      >
        <CardHeader
          avatar={
            <img
              src={
                cocktail.user.avatar
                  ? API_URL + '/' + cocktail.user.avatar
                  : NoImage
              }
              alt=""
              width="50px"
              height="50px"
              className="rounded-circle ms-2"
            />
          }
          title={cocktail.user.displayName}
          subheader={
            cocktail.isPublished ? null : "Cocktail hasn't published yet."
          }
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
          <LoadingButton
            className="btn btn-danger me-2"
            loading={deleteLoading}
            onClick={() => cocktailDelete(cocktail._id)}
          >
            Delete
          </LoadingButton>

          <LoadingButton
            className="btn btn-primary"
            loading={publishLoading}
            onClick={() => cocktailPublish(cocktail._id)}
          >
            {cocktail.isPublished ? <>Unpublish</> : <>Publish</>}
          </LoadingButton>
        </div>
      )}
    </Card>
  );
};

export default CocktailItem;

import express from "express";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";
import parseIngredients from "../helpers/parseIngredients";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const userCocktails = req.query.user;
        let cocktail;

        if (userCocktails) {
            cocktail = await Cocktail.find({user: userCocktails});
        } else {
            cocktail = await Cocktail.find()
        }
        return res.send(cocktail);
    } catch (error) {
        return next(error);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({ error: 'Id params must be in url' });
        }

        const cocktail = await Cocktail.findById(req.params.id);
        return res.send(cocktail);
    } catch (e) {
        return next(e);
    }
});

cocktailsRouter.post(
    '/',
    auth,
    imagesUpload.single('image'),
    async (req: RequestWithUser, res, next) => {
        try {
            const ingredients = parseIngredients(req.body.ingredients)
            const cocktailData = {
                user: req.user,
                name: req.body.name,
                image: req.file ? req.file.filename : null,
                ingredients: ingredients,
                recipe: req.body.recipe,
            };

            const cocktail = new Cocktail(cocktailData);
            await cocktail.save();
            return res.send(cocktail);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

cocktailsRouter.patch(
    '/:id/togglePublished',
    auth,
    permit('admin'),
    async (req: RequestWithUser, res, next) => {
        try {
            if (!req.params.id) {
                res.status(400).send({ error: 'Id items params must be in url' });
            }

            const cocktail = await Cocktail.findById(req.params.id);

            if (cocktail) {
                if (cocktail.isPublished === true) {
                    await Cocktail.findByIdAndUpdate(req.params.id, { isPublished: false });
                } else {
                    await Cocktail.findByIdAndUpdate(req.params.id, { isPublished: true });
                }
            }

            return res.send('Item was success updated');
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

export default cocktailsRouter;
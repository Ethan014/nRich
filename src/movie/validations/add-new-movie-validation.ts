import * as Joi from 'joi';

export class FilterValidations {
 static addNewMovieSchema(): Joi.ObjectSchema<unknown> {
 return Joi.object({
    genre: Joi.array().items(Joi.string()).required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    year: Joi.number().integer().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required()
});
 }
}
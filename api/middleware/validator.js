import Joi from "joi"

const signupSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email(),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
});

const acceptCodeSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email(),
    providedCode: Joi.number().required()
});

export default { signupSchema, acceptCodeSchema };
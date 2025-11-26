import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // Configuración de la aplicación
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  // Configuración de Base de Datos
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().allow('').required(), // Permite cadena vacía para desarrollo local
  DB_NAME: Joi.string().required(),

  // Configuración de JWT
  JWT_SECRET: Joi.string().required(),
});

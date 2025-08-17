import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const docsPath = path.join(__dirname, './src/docs');
const swaggerYaml = fs.readFileSync(path.join(docsPath, 'base.yaml'), 'utf8');
const swaggerDefinition = yaml.load(swaggerYaml) as swaggerJSDoc.OAS3Definition;

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [`${docsPath}/**/*.yaml`],
};

export const swaggerSpec = swaggerJSDoc(options);
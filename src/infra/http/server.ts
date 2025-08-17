import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from '../../infra/http/routes/routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../../swagger.config';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
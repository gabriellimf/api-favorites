import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from '../../infra/http/routes/routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
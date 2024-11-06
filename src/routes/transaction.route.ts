import { Router } from 'express';

import {
    getAll,
    getOne,
    queryTransaction,
} from '../controllers/transaction.controller';

import { protect } from '../controllers/auth.controller';

const TransactionRouter = Router();

TransactionRouter.use(protect)

TransactionRouter.get('/all', getAll);

TransactionRouter.get('/one-transaction/:id', getOne);

export default TransactionRouter;

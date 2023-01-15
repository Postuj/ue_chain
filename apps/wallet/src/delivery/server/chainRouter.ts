import { Request, Response, Router } from 'express';
import { ChainProvider } from '../../domain/interfaces/chainProvider';
import { ChainProviderImpl } from '../chain/chainProvider';

const chainProvider = new ChainProviderImpl() as ChainProvider;
export const chainRouter = Router();

const getAddress = (req: Request, res: Response) => {
  try {
    const address = Buffer.from(chainProvider.getAddress(), 'utf-8').toString('hex');
    res.json({ address });
  } catch (_) {
    res.status(500).json();
  }
};

const getBalance = async (req: Request, res: Response) => {
  try {
    const balance = await chainProvider.getBalance();
    res.json({ balance });
  } catch (_) {
    res.status(500).json();
  }
};

type TransactionRequest = {
  to: string;
  amount: number;
};

const sendTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, to }: TransactionRequest = req.body;
    const toUtf = Buffer.from(to, 'hex').toString('utf-8');
    await chainProvider.sendTransaction(amount, toUtf);
    res.status(200).json();
  } catch (_) {
    res.status(500).json();
  }
};

chainRouter.get('/address', getAddress);
chainRouter.get('/balance', getBalance);
chainRouter.post('/transaction', sendTransaction);

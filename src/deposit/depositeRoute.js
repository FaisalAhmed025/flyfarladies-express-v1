import express from 'express';
const router = express.Router();

import { imageHandler } from "../tourpackage/imageHandler";
import { upload } from "../tourpackage/imageUpload.midleware";
import { depositeControlller } from "./depositeController";

router.post(
  '/create-bank-deposit/:id',
  upload.single('attachment'),
  imageHandler,
  depositeControlller.createBankDeposit
);

router.post(
  '/create-check-deposit/:id',
  upload.single('attachment'),
  imageHandler,
  depositeControlller.CheckDepositController
);

router.post(
  '/create-cash-deposit/:id',
  upload.single('attachment'),
  imageHandler,
  depositeControlller.cashDepositController
);

router.put(
  '/approved/:deposit_id',
  depositeControlller.updateDepositStatus
);

router.put(
  '/approved/cash/:deposit_id',
  depositeControlller.approvedCashDEposit
);

router.put(
  '/approved/cheque/:deposit_id',
  depositeControlller.approvedCheckDeposit
);

export default router;
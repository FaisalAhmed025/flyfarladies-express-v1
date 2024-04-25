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
  '/create-mobile-deposit/:id',
  upload.single('attachment'),
  imageHandler,
  depositeControlller.createMobilebankDeposit
);

router.put(
  '/approved/:deposit_id',
  depositeControlller.approvedBankDEposit
);

router.put(
  '/approved/cash/:deposit_id',
  depositeControlller.approvedCashDEposit
);

router.put(
  '/approved/cheque/:deposit_id',
  depositeControlller.approvedCheckDeposit
);

router.get(
  '/depositlist/:requested_by',
  depositeControlller.getuserdeposit
);

export default router;
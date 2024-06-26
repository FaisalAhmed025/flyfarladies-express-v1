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

router.post(
  '/create-cash-deposit/:id',
  upload.single('attachment'),
  imageHandler,
  depositeControlller.createCashDeposit
);

router.patch(
  '/approved/cash/:deposit_id',
  depositeControlller.approvedCashDEposit
);

router.patch(
  '/reject/cash/:deposit_id',
  depositeControlller.rejectCashDeposit
);


router.put(
  '/approved/:deposit_id',
  depositeControlller.approvedBankDEposit
);

router.put(
  '/rejectdeposit/:deposit_id',
  depositeControlller.rejectBankDeposit
);


router.put(
  '/rejectcheque/:deposit_id',
  depositeControlller.rejectChequeDeposit
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

router.get(
  '/alldeposit',
  depositeControlller.getAlldeposit
);

export default router;
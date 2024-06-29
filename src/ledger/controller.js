import { ledgerService } from "./service"


const getLedgerLast1Days =async (req,res)=>{
  await ledgerService.getLedgerLast1Day(req,res)
}

const getLedgerLast7Days =async (req,res)=>{
  await ledgerService.getLedgerLast7Days(req,res)
}

const getLedgerLast30Days =async (req,res)=>{
  await ledgerService.getLedgerLast30Days(req,res)
}


export const ledgercontroller ={
  getLedgerLast1Days,
  getLedgerLast7Days,
  getLedgerLast30Days

}
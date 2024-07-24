import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length == 0) {
      return res.status(404).send("No records found for the user .");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) {
      res.status(404).send();
    }

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
   const record = await FinancialRecordModel.findByIdAndDelete(id)
    if (!record) {
      res.status(404).send();
    }

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

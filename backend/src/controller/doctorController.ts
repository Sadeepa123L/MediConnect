import { Request, Response } from "express";
import Doctor from "../model/doctorModel";

export const saveDoctor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      specialty,
      phone,
      consultationFee,
      availableDays,
      availableTime,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ phone });
    if (existingDoctor) {
      res.status(400).json({
        message: "Doctor with this email already exists",
      });
      return;
    }
    const doctor = await Doctor.create({
      name,
      specialty,
      phone,
      consultationFee,
      availableDays,
      availableTime,
    });
    res.status(201).json({
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

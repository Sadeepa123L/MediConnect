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
      error: error,
    });
  }
};

export const getAllDoctors = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      message: "Doctors retrieved successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving items",
      error: error,
    });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving doctor",
      error: error,
    });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Doctor update successfully",
      data: updateDoctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating doctor",
      error: error,
    });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: "doctor not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Doctor delete successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting doctor",
      error: error,
    });
  }
};

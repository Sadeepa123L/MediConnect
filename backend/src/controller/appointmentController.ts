import { Request, Response } from "express";
import appointmentModel, { AppointmentStatus } from "../model/appointmentModel";
import doctorModel from "../model/doctorModel";
import { sendConfirmationEmail } from "../service/emailService";

export const bookAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      date,
      timeSlot,
      notes,
    } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    const appointment = await appointmentModel.create({
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully. Please wait for confirmation.",
      data: {
        appointmentNumber: appointment.appointmentNumber,
        status: appointment.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const searchAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const phone = req.query.phone as string | undefined;
    const email = req.query.email as string | undefined;

    if (!phone && !email) {
      res
        .status(400)
        .json({ message: "Please provide phone or email to search" });
      return;
    }

    const query = phone ? { patientPhone: phone } : { patientEmail: email };

    const appointments = await appointmentModel
      .find(query)
      .sort({ createdAt: -1 });

    if (appointments.length === 0) {
      res.status(404).json({ message: "No appointments found" });
      return;
    }

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAppointmentByNumber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const appointment = await appointmentModel.findOne({
      appointmentNumber: req.params.appointmentNumber,
    });

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllAppointments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const appointments = await appointmentModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateAppointmentStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    if (status === AppointmentStatus.CONFIRMED) {
      await sendConfirmationEmail(
        appointment.patientEmail,
        appointment.patientName,
        appointment.appointmentNumber,
        appointment.doctorName,
        appointment.date,
        appointment.timeSlot,
      );
    }

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const appointment = await appointmentModel.findByIdAndDelete(req.params.id);

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

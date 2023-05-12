import { FastifyRequest } from 'fastify';
import { AddDoc, AddUser, BodyType } from './types';
import db from '../lib/index.js';
import Doctor from '../lib/models/Doctor.js';
import User from '../lib/models/User.js';

export const addDoctor = async (request:FastifyRequest<{ Body: AddDoc }>, response) => {
  const connection = await db();
  const {
    id, name, spec, slots, appointments,
  } = request.body;
  try {
    const newDoc = new Doctor({
      id,
      name,
      spec,
      slots,
      appointments,
    });
    await newDoc.save();
    response.code(200);
  } catch (err) {
    console.log(err);
    response.code(500).send({ error: err });
  } finally {
    await connection.close();
  }
};

export const regNewUser = async (request:FastifyRequest<{ Body: AddUser }>, response) => {
  const connection = await db();
  const {
    id, fullName, email, phoneNumber,
  } = request.body;
  try {
    const newUser = new User({
      id,
      fullName,
      email,
      phoneNumber,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
    response.code(500).send({ error: err });
  } finally {
    await connection.close();
  }
};

export const addAppointment = async (request: FastifyRequest<{ Body: BodyType }>, response) => {
  const { user_id, doctor_id, date_time } = request.body;
  const connection = await db();
  const patient = await User.findOne({ id: user_id });
  const doctor = await Doctor.findOne({ id: doctor_id });
  try {
    if (!patient) {
      response.code(404).send({ error: 'Patient not found' });
    }

    if (!doctor) {
      response.code(404).send({ error: 'Doctor not found' });
    }
    const index = doctor.slots.findIndex(
      (slot) => new Date(slot).getTime() === new Date(date_time).getTime(),
    );

    if (index === -1 || !index) {
      response.code(400).send({ error: 'Appointment not available' });
    } else {
      await doctor.appointments.push({ patientID: patient._id, date: doctor.slots[index] });
      await doctor.slots.splice(index, 1);
      console.log(doctor.slots[index]);
    }
    await doctor.save();
    response.code(200).send({ message: `${doctor}, ${patient}, ${user_id}` });
  } catch (err) {
    response.code(500).send({ error: err });
  } finally {
    await connection.close();
  }
};

import mongoose, { Schema } from 'mongoose';

const DoctorShema = new Schema({
  id: Schema.Types.UUID,
  name: String,
  spec: String,
  slots: [{ type: Date }],
  appointments: [{
    patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    date: Date,
  }],
});

export default mongoose.model('Doctors', DoctorShema, 'Doctors');

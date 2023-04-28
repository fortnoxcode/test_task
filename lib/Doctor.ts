import { Schema, model } from 'mongoose';

const DoctorShema = new Shema({
  id: Schema.Types.UUID,
  name: String,
  spec: String,
  slot: [Date],
});

export default model('Doctors', DoctorShema, 'Doctors');

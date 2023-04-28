import { Schema, model } from 'mongoose';

const UserShema = new Schema({
  id: Schema.Types.UUID,
  phone: String,
  name: String,
  age: Number,
});

export default model('Users', UserShema, 'Users');

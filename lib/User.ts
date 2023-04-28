import { Schema, model } from 'mongoose';

const UserShema = new Shema({
  id: Schema.Types.UUID,
  phone: String,
  name: String,
  age: Number,
});

export default model('Users', UserShema, 'Users');

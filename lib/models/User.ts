import mongoose, { Schema } from 'mongoose';

const UserShema = new Schema({
  id: Schema.Types.UUID,
  fullName: String,
  email: String,
  phoneNumber: String,
});

export default mongoose.model('Users', UserShema, 'Users');

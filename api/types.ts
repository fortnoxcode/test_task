export interface AddDoc {
  id: string,
  name: string,
  spec: string,
  slots: Array<Date>,
  appointments: Array<Object>
}

export interface AddUser {
  id: string,
  fullName: string,
  email: string,
  phoneNumber: string
}

export interface BodyType {
  user_id: string;
  doctor_id: string;
  date_time: Date;
}

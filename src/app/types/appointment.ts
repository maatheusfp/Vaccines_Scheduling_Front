export type AppointmentDTO = {
    id: number,
    date: string,
    time: string,
    status: string,
};

export type MakeAppointment ={
    patientName: string,
    birthday: string,
    date: string,
    time: string
};

export type AppointmentsReturn = AppointmentDTO[];

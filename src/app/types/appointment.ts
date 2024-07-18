export type AppointmentDTO = {
    id: number,
    date: string,
    time: string,
    status: string,
};

export type AppointmentsReturn = AppointmentDTO[];

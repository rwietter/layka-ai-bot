type ErrorResponse = {
  response: {
    status: number;
    data: {
      message: string;
    }
  };
}


export type HttpReponseError = ErrorResponse & Error;

type ErrorResponse = {
  response: {
    status: number;
    data: {
      error: {
        message: string;
        type: string;
        param: string | null;
        code: string;
      }
    }
  };
}


export type HttpReponseError = ErrorResponse & Error;

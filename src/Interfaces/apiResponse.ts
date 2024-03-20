// This is for the common response that we will get when we invoke any API from our RedMango_API !
// We combine the API with TypeScript to undrestand the response of the API

export default interface apiResponse {
  data?: {
    // this will be included in suggestions so if possible use the format if you know that.
    statusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result: {
      // this will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
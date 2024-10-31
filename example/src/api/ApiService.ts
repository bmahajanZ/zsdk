// import axios, { AxiosResponse } from 'axios';

import { RequestType } from '../contexts/RequestContext';

// Define types for success and error responses
type ResponseData = {
  data: string; // Replace `any` with your expected data structure
};

// The function returns either `ResponseData` or `FetchError`
export async function fetchData(
  url: string,
  requestType: RequestType
): Promise<ResponseData> {
  /** @Fetch basesd */
  try {
    var method = '';
    switch (requestType) {
      case RequestType.POST:
        method = RequestType.POST;
        break;
      default:
        method = RequestType.GET;
    }
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Throw an error if response status is not OK
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    var responseData = '';

    switch (requestType) {
      case RequestType.WEB:
        responseData = await response.text();
        break;
      default:
        responseData = await response.json();
        break;
    }
    return { data: responseData };
  } catch (error) {
    // Return the error in a structured format
    throw new Error(error as string);
  }
  /** @Axios basesd */
  // try {
  //     const response: AxiosResponse = await axios({
  //         url,
  //         method,
  //     });

  //     return response.data;
  // } catch (error) {
  //     throw new Error(`Error making HTTP request: ${error.message}`);
  // }
}

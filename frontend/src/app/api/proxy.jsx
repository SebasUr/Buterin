import { getAuthToken } from "@/lib/auth";


export default class ApiProxy{
  static async getHeaders(requiredAuth) {
    const auth = await getAuthToken();
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    if (requiredAuth && auth) {
      headers["Authorization"] = `Bearer ${auth}`;
    }
    return headers;
  }

  static async handleFetch(endpoint, requestOptions)  {
    let response = {};
    let status = 500;
    try {
      const res = await fetch(endpoint, requestOptions);
      response = await res.json();
      status = res.status;
    } catch (error) {
      response = {message: "Cannot connect to the API server" , error: error};
      status = 500;
    }
    return {response, status};
  }

  static async post(endpoint, object, requiredAuth) {
    return await this.handleFetch(endpoint, {
      method: "POST",
      headers: await this.getHeaders(requiredAuth),
      body: JSON.stringify(object),
    })
  }

  static async get(endpoint, requiredAuth) {
    return await this.handleFetch(endpoint, {
      method: "GET",
      headers: await this.getHeaders(requiredAuth),
    })
  }
}
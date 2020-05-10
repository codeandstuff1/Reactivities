import axios, { AxiosResponse } from "axios";
import { IActivity } from "../app/models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activities/"),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities/", activity),
  update: (activity: IActivity) => request.put(`/Activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/Activities/${id}`),
};

export default { Activities };

import axios from "axios";
import type { Job } from "../types/job";

const API_URL = "http://localhost:8000";

export async function getJobs(id: number): Promise<Job[]> {
    const response = await axios.get(`${API_URL}/job/${id}`);
    return response.data;
}
export async function getJobById(id: number): Promise<Job> {
    const response = await axios.get(`${API_URL}/job/${id}`);
    return response.data;
}   

export async function createJob(job: Job): Promise<Job> {
    const response = await axios.post(`${API_URL}/job`, job );
    return response.data;
}

export async function updateJob(id:number, job: Job): Promise<Job> {
    const response = await axios.put(`${API_URL}/job/${id}`, job);
    return response.data;
}  

export async function deleteJob(id: number): Promise<Job> {
    const response = await axios.delete(`${API_URL}/job/${id}`);
    return response.data;
}
import type {Job} from "../types/job";
import type {Company} from "../types/company";
import "./JobCard.css";
import {useState} from "react";

type Props = {
    jobs:Job[];
    companies:Company[];
    onEdit: (job:Job)=>void;
    onDelete: (id:number)=>void;
    onAdd: (job:Job)=>void;
}

function JobCard({
    jobs,companies,onEdit,onDelete,onAdd}:Props){
        const [editJobId, setEditJobId] = useState<number | null>(null);
        const [addform,setAddform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:0,
            company_id:0
        });
        const [editform,setEditform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:0,
            company_id:0
        });
        const handleAdd = () => {
            onAdd(addform);
            setAddform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id:0
            })
        }
        const handleSave = () => {
            onEdit(editform);
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id:0
            })
        }
        const handlecancel = () => {
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id:0
            })
        }

    return(
        <div className="jobs-container">
            <div className="job-grid">
            {jobs.map((job) => (
                <div key={job.id} className="job-card">
                    {editJobId === job.id ? (
                        <>
                    <input type="text" value={editform.title} onChange={(e)=>setEditform({...editform,title:e.target.value})} placeholder="Title" />
                    <input type="text" value={editform.description} onChange={(e)=>setEditform({...editform,description:e.target.value})} placeholder="Description" />
                    <input type="number" value={editform.salary} onChange={(e)=>setEditform({...editform,salary:Number(e.target.value)})} placeholder="Salary" />
                    <input type="number" value={editform.company_id} onChange={(e)=>setEditform({...editform,company_id:Number(e.target.value)})} placeholder="Company ID" />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handlecancel}>Cancel</button>
                    </>
                    ):
                    <>
                    <h2 className="job-title">{job.title}</h2>
                    <p className="job-info">
    📝 {job.description}
</p>
                    <p className="job-info">
    💰 ₹{job.salary.toLocaleString()}
</p>
                   <p className="job-info">
    🏢 {companies.find(c => c.id === job.company_id)?.name || "Unknown"}
</p>
                    <button
                        onClick={() => {
                            setEditJobId(job.id);
                            setEditform({
                                id: job.id,
                                title: job.title,
                                description: job.description,
                                salary: job.salary,
                                company_id: job.company_id,
                            });
                        }}
                    >Edit</button>
                    <button onClick={() => onDelete(job.id)}>Delete</button>
                    </>}
                    <hr></hr>
                </div>
            ))}</div>
            <div className="add-job">
            <h2>Add Job</h2>
            <input type="text" value={addform.title} onChange={(e)=>setAddform({...addform,title:e.target.value})} placeholder="Title" />
            <input type="text" value={addform.description} onChange={(e)=>setAddform({...addform,description:e.target.value})} placeholder="Description" />
            <input type="number" value={addform.salary} onChange={(e)=>setAddform({...addform,salary:Number(e.target.value)})} placeholder="Salary" />
            <input type="number" value={addform.company_id} onChange={(e)=>setAddform({...addform,company_id:Number(e.target.value)})} placeholder="Company ID" />
            <button onClick={handleAdd}>Add</button></div>
        </div>
    )
}

export default JobCard
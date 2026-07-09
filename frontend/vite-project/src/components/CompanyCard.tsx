import type {Company} from "../types/company";
import type {Job} from "../types/job";
import {useState} from "react";
import "./CompanyCard.css";

type Props = {
    companies:Company[];
    jobs:Job[];
    onEdit: (company:Company)=>void;
    onDelete: (id:number)=>void;
    onAdd: (company:Company)=>void;
}


function CompanyCard({
    companies,jobs,onAdd,onEdit,onDelete}:Props){
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [addform,setAddform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const [editform,setEditform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const handleAdd = () => {
        onAdd(addform);
        setAddform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    }
    const handleSave = () => {
        onEdit(editform);
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 
    const handlecancel = () => {
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 

    return(
        <div className="companies-container">
            <div className="company-list">
                {companies.map((company) => (
                    <div key={company.id} className={editCompanyId === company.id ? "company-card company-edit-form" : "company-card"}>
                        {editCompanyId === company.id ? (
                            <>
                                <h3>Edit Company</h3>
                                <input type="text" value={editform.name} onChange={(e)=>setEditform({...editform,name:e.target.value})} placeholder="Company Name" />
                                <input type="email" value={editform.email} onChange={(e)=>setEditform({...editform,email:e.target.value})} placeholder="Email" />
                                <input type="tel" value={editform.phone} onChange={(e)=>setEditform({...editform,phone:e.target.value})} placeholder="Phone" />
                                <input type="text" value={editform.location} onChange={(e)=>setEditform({...editform,location:e.target.value})} placeholder="Location" />
                                <div className="company-edit-form-actions">
                                    <button className="save-btn" onClick={handleSave}>Save Changes</button>
                                    <button className="cancel-btn" onClick={handlecancel}>Cancel</button>
                                </div>
                            </>
                        ):(
                            <>
                                <h2>{company.name}</h2>
                                <p><strong>Email:</strong> {company.email}</p>
                                <p><strong>Phone:</strong> {company.phone}</p>
                                <p><strong>Location:</strong> {company.location}</p>
                                <p><strong>Job Openings:</strong> {jobs.filter(j => j.company_id === company.id).length} opening{jobs.filter(j => j.company_id === company.id).length === 1 ? '' : 's'}</p>
                                <div className="company-actions">
                                    <button
                                        className="edit-company-btn"
                                        onClick={() => {
                                            setEditCompanyId(company.id);
                                            setEditform({
                                                id: company.id,
                                                name: company.name,
                                                email: company.email,
                                                phone: company.phone,
                                                location: company.location,
                                                jobs: company.jobs,
                                            });
                                        }}
                                    >Edit</button>
                                    <button className="delete-company-btn" onClick={() => onDelete(company.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="add-company-section">
                <h2>Add New Company</h2>
                <div className="add-company-form">
                    <input type="text" value={addform.name} onChange={(e)=>setAddform({...addform,name:e.target.value})} placeholder="Company Name" />
                    <input type="email" value={addform.email} onChange={(e)=>setAddform({...addform,email:e.target.value})} placeholder="Email Address" />
                    <input type="tel" value={addform.phone} onChange={(e)=>setAddform({...addform,phone:e.target.value})} placeholder="Phone Number" />
                    <input type="text" value={addform.location} onChange={(e)=>setAddform({...addform,location:e.target.value})} placeholder="Location" />
                    <button onClick={handleAdd}>Add Company</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard
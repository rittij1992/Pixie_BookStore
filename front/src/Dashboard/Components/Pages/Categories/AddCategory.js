import { useContext, useEffect, useState } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddCategory = () => {

    const navigate = useNavigate();
    const { setPageTitle } = useContext(PageDetailContext);
    const [newCategory, setNewCategory] = useState('');


    useEffect(() => {
        setPageTitle("Add Category");
    }, [])

    const addCategory = async (e) => {
        e.preventDefault();
        const catData = {name: newCategory};
        const response = await axios.post("http://localhost:4000/categories/add/", catData)
        const data = response.data;
        console.log(data);
        navigate("/dashboard/categories");
    }

    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Category</h3>
                </div>
                {/* <!-- /.card-header --> */}
                {/* <!-- form start --> */}
                <form onSubmit={addCategory}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >Category Name</label>
                            <input onChange={(e)=>setNewCategory(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    {/* <!-- /.card-body --> */}

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">ADD</button>
                    </div>
                </form>
            </div>
            {/* <!-- /.card --> */}
        </>
    )
}

export default AddCategory;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";




const EditCategory = ()=>{

    const{id} = useParams();
    const navigate = useNavigate();
    const { setPageTitle } = useContext(PageDetailContext);
    const [updateCategory, setUpdateCategory] = useState();

    const getCategoryById = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`);
        const data = response.data;
        console.log(data);
        setUpdateCategory(data.category.name);
    }

    useEffect(() => {
        getCategoryById();
        setPageTitle("Edit Category");
    }, []);

const updateCat = async (e) => {
    e.preventDefault();
    const catUpdateData = {name: updateCategory};
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/categories/update/${id}`, catUpdateData);
    const data = response.data;
    console.log(data);
    navigate("/categories");
}


    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Edit Category</h3>
                </div>
                {/* <!-- /.card-header --> */}
                {/* <!-- form start --> */}
                <form onSubmit={updateCat}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >Category Name</label>
                            <input value={updateCategory} onChange={(e)=>setUpdateCategory(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    {/* <!-- /.card-body --> */}

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">EDIT</button>
                    </div>
                </form>
            </div>
            {/* <!-- /.card --> */}
        </>
    )
}

export default EditCategory;
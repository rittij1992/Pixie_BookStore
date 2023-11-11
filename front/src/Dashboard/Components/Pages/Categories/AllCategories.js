import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import axios from "axios";


const Allcategories = () => {

    const navigate = useNavigate();
    const { setPageTitle } = useContext(PageDetailContext);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const [categoryList, setCategoryList] = useState([]);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


    const getAllCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories?page=${currentPageId}`);
        const data = response.data;
        console.log(data);
        setCategoryList(data.AllCategories);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        getAllCategories();
        setPageTitle("Category List");
    }, [currentPageId]);

    const getPageId = (pageId) => {
        console.log(pageId);
        setCurrentPageId(pageId);
    }

    const deleteCategory = async (id) => {
        if (window.confirm("Delete this category?")) {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/categories/delete/${id}`);
            const data = response.data;
            console.log(data);
            navigate("/categories");
        } else {
            navigate("/categories");
        }
    }


    return (
        <>
            {/* <!-- /.row --> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Category Listing Table</h3>

                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ "width": "150px" }}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        categoryList.map((category, index) => (
                                            <tr key={index}>
                                                <td>{category.name}</td>
                                                <td>
                                                    <Link to={`/categories/edit/${category._id}`}>
                                                        Edit
                                                    </Link>
                                                    <Link onClick={() => deleteCategory(category._id)} className="mx-2 text-danger">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}
                </div>
            </div>
            {/* <!-- /.row --> */}
            <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                    <li className="page-item"><Link className="page-link" >&laquo;</Link></li>
                    {
                        pages.map((page, index) => (
                            <li onClick={() => getPageId(page)} key={index} className="page-item">
                                <Link className="page-link" >{page}</Link>
                            </li>
                        ))
                    }

                    <li className="page-item"><Link className="page-link" >&raquo;</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Allcategories;
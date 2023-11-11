import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";


const Allbooks = () => {

    const navigate = useNavigate();
    const { setPageTitle } = useContext(PageDetailContext);
    const [booksList, setbooksList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);



    const allBooksUrl = `${process.env.REACT_APP_API_URL}/books?page=${currentPageId}`
    const getAllBooks = async () => {
        const response = await axios.get(allBooksUrl);
        const data = response.data;
        console.log(data)
        setbooksList(data.AllBooks);
        setTotalPages(data.totalPage);
    }


    useEffect(() => {
        // console.log(process.env.REACT_APP_API_URL)
        getAllBooks()
        setPageTitle("Book List")
    }, [currentPageId]);


    const getPageId = (pageId) => {
        console.log(pageId);
        setCurrentPageId(pageId);
    }

    const deleteBook = async (id) => {
        if(window.confirm("Delete this book?")){
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/books/delete/${id}`);
            const data = response.data;
            navigate("/dashboard/books");
        } else {
            navigate("/dashboard/books");
        }
    }

    return (
        <>
            {/* <!-- /.row --> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Book List Table</h3>

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
                                        <th>Book Cover</th>
                                        <th>Book Name</th>
                                        <th>Price</th>
                                        <th>Book Author Name</th>
                                        <th>Release Date</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Quantity Avlb</th>
                                        <th>Feature</th>
                                        <th>Order</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        booksList.map((book, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    {
                                                        (book.coverImage) ?
                                                            <img
                                                                height={100}
                                                                width={70}
                                                                src={`${process.env.REACT_APP_API_URL}/${book.coverImage.replace('public', '')}`} />
                                                            :
                                                            <img
                                                                height={100}
                                                                width={70}
                                                                src={`/dummy-image-square.jpg`} />
                                                    }
                                                </th>
                                                <td>{book.name}</td>
                                                <td>{book.price}</td>
                                                <td>{book.author}</td>
                                                <td>{book.release}</td>
                                                <td>{book.category.name}</td>
                                                <td>{book.description}</td>
                                                <td>{book.available_qty}</td>
                                                <td>{book.feature}</td>
                                                <td>{book.order}</td>
                                                <td><Link to={`/books/edit/${book._id}`}>Edit</Link>
                                                    <Link onClick={() => deleteBook(book._id)} className="mx-2 text-danger">Delete</Link></td>
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
                        pages?.map((page, index) => (

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

export default Allbooks;
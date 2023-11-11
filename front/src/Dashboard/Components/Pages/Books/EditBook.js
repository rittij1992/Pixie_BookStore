import { useContext, useEffect, useState } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditBook = () => {

    const navigate = useNavigate();
    const { setPageTitle } = useContext(PageDetailContext);
    const {id} = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [bookName, setBookName] = useState("");
    const [bookPrice, setBookPrice] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [bookRelease, setBookRelease] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookQuantityAvailable, setBookQuantityAvailable] = useState("");
    const [bookCategory, setBookCategory] = useState("");
    const [bookFeature, setBookFeature] = useState(false);
    const [bookOrder, setBookOrder] = useState("");
    const [bookCover, setBookCover] = useState(null);


    const getAllCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/`);
        const data = response.data;
        // console.log(data);
        setCategoryList(data.AllCategories);
    }

    const getBookById = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`);
        const data = response.data;
        // console.log(data);
        setBookName(data.Book.name);
        setBookPrice(data.Book.price);
        setAuthorName(data.Book.author);
        setBookRelease(data.Book.release);
        setBookDescription(data.Book.description);
        setBookQuantityAvailable(data.Book.available_qty);
        setBookCategory(data.Book.category);
        setBookFeature(data.Book.feature);
        setBookOrder(data.Book.order);
        setBookCover(data.Book.coverImage);
    }

    useEffect(() => {
        getAllCategories();
        getBookById();
        setPageTitle("Edit Book")
    }, [])


    const updateBook = async (e) => {
        e.preventDefault();
        const bookUpdateData = {
            name: bookName, 
            price: bookPrice,
            author: authorName,
            release: bookRelease,
            description: bookDescription,
            available_qty: bookQuantityAvailable,
            category: bookCategory,
            feature: bookFeature,
            order: bookOrder,
            coverImage: bookCover
        };
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/books/update/${id}`, bookUpdateData);
        const data = response.data;
        console.log(data, "update");
        navigate("/dashboard/books");
    }



    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Book Details</h3>
                </div>
                {/* <!-- /.card-header --> */}
                {/* <!-- form start --> */}
                <form onChange={updateBook}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >Book Name</label>
                            <input value={bookName} className="form-control" onChange={(e)=>setBookName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Price</label>
                            <input value={bookPrice}  className="form-control" onChange={(e)=>setBookPrice(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Author Name</label>
                            <input value={authorName}  className="form-control" onChange={(e)=>setAuthorName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Release Date</label>
                            <input value={bookRelease}  className="form-control" onChange={(e)=>setBookRelease(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Description</label>
                            <input value={bookDescription} className="form-control" onChange={(e)=>setBookDescription(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Quantity Available</label>
                            <input value={bookQuantityAvailable} className="form-control" onChange={(e)=>setBookQuantityAvailable(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Feature</label>
                            <input  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Order</label>
                            <input value={bookOrder} className="form-control" onChange={(e)=>setBookOrder(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Book Cover Upload</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" onChange={(e)=>setBookCover(e.target.value)}/>
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">Upload Image</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Select Category</label>
                            <select value={bookCategory} className="form-control" onChange={(e)=>setBookCategory(e.target.value)}>
                                <option>Select Category</option>
                                {
                                    categoryList.map((category, index)=>(
                                        <option key={index} value={category._id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* <!-- /.card-body --> */}

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            {/* <!-- /.card --> */}
        </>
    )
}

export default EditBook;
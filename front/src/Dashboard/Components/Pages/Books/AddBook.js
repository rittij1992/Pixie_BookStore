import { useContext, useEffect, useState } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddBook = () => {

 const navigate = useNavigate()
    const { setPageTitle } = useContext(PageDetailContext);
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


    const getAllCategories = async ()=> {
        const response = await axios.get('http://localhost:4000/categories/');
        const data = response.data;
        // console.log(data);
        setCategoryList(data.AllCategories);
    }

    useEffect(() => {
        getAllCategories();
        setPageTitle("Add Book");
    }, []);


    const addBook = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", bookName);
        formData.append("coverImage", bookCover);
        formData.append('price', bookPrice);
        formData.append('author', authorName);
        formData.append('release', bookRelease);
        formData.append('description', bookDescription);
        formData.append('available_qty', bookQuantityAvailable);
        formData.append('category', bookCategory);
        formData.append('feature', bookFeature);
        formData.append('order', bookOrder);
        const response = await axios.post("http://localhost:4000/books/add/", formData);
        const data = response.data;
        console.log(data);
        navigate("/dashboard/books");
    }


    const uploadImageFile = (e) => {
        setBookCover(e.target.files[0])
    }



    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Book Details</h3>
                </div>
                {/* <!-- /.card-header --> */}
                {/* <!-- form start --> */}
                <form onSubmit={addBook}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >Book Name</label>
                            <input onChange={(e)=>setBookName(e.target.value)}  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Price</label>
                            <input onChange={(e)=>setBookPrice(e.target.value)}  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Author Name</label>
                            <input onChange={(e)=>setAuthorName(e.target.value)}  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Release Date</label>
                            <input onChange={(e)=>setBookRelease(e.target.value)}  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Description</label>
                            <input onChange={(e)=>setBookDescription(e.target.value)}  className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Quantity Available</label>
                            <input onChange={(e)=>setBookQuantityAvailable(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Feature</label>
                            <input onChange={(e)=>setBookFeature(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Order</label>
                            <input onChange={(e)=>setBookOrder(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Book Cover Upload</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input onChange={uploadImageFile} type="file" className="custom-file-input"  />
                                    <label className="custom-file-label">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">Upload Image</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Select Category</label>
                            <select onChange={(e)=>setBookCategory(e.target.value)} className="form-control">
                            <option value="">Select Category</option>
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

export default AddBook;
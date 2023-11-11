import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
// import { AddToCartContext } from "../../../../../ContextAPI/AddToCartContext";

const ProductPage = () => {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    // const {totallCartItems} = useContext(AddToCartContext);

    const getBooks = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books?page=${currentPageId}`);
        const data = response.data;
        console.log(data)
        setBooks(data.AllBooks);
        setTotalPages(data.totalPage);
    }

    useEffect(() => {
        getBooks();
    }, [currentPageId]);

    const getPageId = (pageId) => {
        console.log(pageId);
        setCurrentPageId(pageId);
    }

    return (
        <>
            <div className="featured-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Library</h1>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div id="filters" className="button-group">
                                <button className="btn btn-primary" data-filter=".new">Newest</button>
                                <button className="btn btn-primary" data-filter=".low">Low Price</button>
                                <button className="btn btn-primary" data-filter=".high">Hight Price</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="featured container no-gutter">

                <div className="row posts">
                    {
                        books.map((book, index) => (
                            <div key={index} className="col-sm-4">
                                <Card product={book} gridColumb={4} />
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className="page-navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                <li style={currentPageId == 1 ? { display: "none" } : { display: "contents" }}>
                                    <Link onClick={()=>setCurrentPageId(currentPageId - 1)}>
                                        <i
                                            className="fa fa-angle-left"></i>
                                    </Link>
                                </li>
                                {
                                    pages?.map((page, index) => (
                                        <li onClick={() => getPageId(page)} key={index} className="current-page mx-2">
                                            <Link>{page}</Link>
                                        </li>
                                    ))
                                }
                                <li style={currentPageId == totalPages ? { display: "none" } : { display: "contents" }}>
                                    <Link onClick={()=>setCurrentPageId(currentPageId + 1)}>
                                        <i className="fa fa-angle-right"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Featred Page Ends Here --> */}
        </>
    )
}

export default ProductPage;
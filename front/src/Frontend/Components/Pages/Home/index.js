import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css"; //Allows for server-side rendering.
import "react-owl-carousel2/src/owl.theme.default.css"; //Allows for server-side rendering.
import { useEffect, useState } from "react";
import Card from "./Product/Card";
import axios from "axios";

const HomePage = () => {

    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
        const data = response.data.AllBooks;
        console.log(data)
        setBooks(data);
    }

    const options = {
        items: 4,
        nav: true,
        rewind: true,
        autoplay: true
    };

    const events = {
        
    };

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <>
            {/* <!-- Page Content --> */}
            {/* <!-- Banner Starts Here --> */}
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            {/* <div className="caption">
                                <h2>Ecommerce HTML Template</h2>
                                <div className="line-dec"></div>
                                <p>
                                    Pixie HTML Template can be converted into your desired CMS theme. Total <strong>5 pages</strong> included. You can use this Bootstrap v4.1.3 layout for any CMS.
                                    <br></br>Please tell your friends about
                                    <a rel="nofollow" href="https://www.facebook.com/tooplate/">Tooplate</a>
                                    free template site. Thank you. Photo credit goes to
                                    <a rel="nofollow" href="https://www.pexels.com">Pexels website</a>.
                                </p>
                                <div className="main-button">
                                    <a href="#">Order Now!</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Banner Ends Here --> */}

            {/* <!-- Featured Starts Here --> */}
            <div className="featured-items ">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Featured Items</h1>
                            </div>
                        </div>

                        <div className="d-flex">
                            <OwlCarousel options={options} >
                                {/* <div className="owl-carousel owl-theme"> */}
                                {
                                    books.map((book, index) => (
                                        <div key={index}>
                                            <Card product={book} gridColumb={10} />
                                        </div>
                                    ))
                                }
                                {/* </div> */}
                            </OwlCarousel>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- Featred Ends Here --> */}
        </>
    )
}

export default HomePage;
import axios from "axios";
import { useState } from "react";

const SubscribeBar = () => {
    const [loader, setLoader] = useState(false);
    const [subscriberEmail, setSubscriberEmail] = useState("");

    const Subscribe = async (e) => {
        e.preventDefault();
        setLoader(true);
        const subscribeData = { subscriber_email: subscriberEmail };
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/contactAndSubscribe/sent`, subscribeData);
        const data = response.data;
        if (data) {
            setLoader(false);
            window.alert(data.message);
        }

    }


    return (
        <>
            <div class="loading-overlay"
                style={loader ? { display: "flex" } : { display: "none" }}>
                <div class="loading-spinner"></div>
            </div>
            {/* <!-- Subscribe Form Starts Here --> */}
            <div className="subscribe-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Subscribe on PIXIE now!</h1>
                            </div>
                        </div>
                        <div className="col-md-8 offset-md-2">
                            <div className="main-content">
                                <p>Integer vel turpis ultricies, lacinia ligula id, lobortis augue. Vivamus porttitor dui id dictum efficitur. Phasellus vel interdum elit.</p>
                                <div className="container">
                                    <form onSubmit={Subscribe}>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <input type="text" className="form-control"
                                                    onChange={(e) => setSubscriberEmail(e.target.value)} />
                                            </div>
                                            <div className="col-md-5">
                                                <button type="submit" className="button" >Subscribe Now!</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Subscribe Form Ends Here --> */}
        </>
    )
}

export default SubscribeBar;
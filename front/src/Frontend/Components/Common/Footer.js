const Footer = () => {
    return (
        <>
            {/* <!-- Footer Starts Here --> */}
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="logo">
                                <img src="assets/images/header-logo.png" alt="" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="footer-menu">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Help</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">How It Works ?</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="social-icons">
                                <ul>
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-rss"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer Ends Here --> */}


            {/* <!-- Sub Footer Starts Here --> */}
            <div className="sub-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2019 Company Name

                                    - Design: <a rel="nofollow" href="https://www.facebook.com/tooplate">Tooplate</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Sub Footer Ends Here --> */}
        </>
    )
}

export default Footer;
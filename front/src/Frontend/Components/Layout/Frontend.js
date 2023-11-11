import Header from "../Common/Header";
import SubscribeBar from "../Common/SubscribeBar";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";


const FrontendLayout = () => {
    return (
        <>
            <div>
                <Header></Header>
                <section>
                    <Outlet></Outlet>
                </section>
                <div>
                    <SubscribeBar></SubscribeBar>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default FrontendLayout;
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import Footer from "../Common/Footer";
import Breadcums from "../Common/Breadcums";

const DashboardLayout = () => {
    return (
        <div className="wrapper">
            <Header></Header>
            <Sidebar></Sidebar>
            <div className="content-wrapper">
                <Breadcums></Breadcums>
                {/* <!-- Main content --> */}
                <section className="content">
                    <Outlet />
                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default DashboardLayout;
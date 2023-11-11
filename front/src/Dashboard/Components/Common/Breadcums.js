import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageDetailContext } from "../../../ContextAPI/PageDetailContext";


const Breadcums = () => {

    const {pageTitle} = useContext(PageDetailContext);

    return (
        <>
            {/* <!-- Content Header (Page header) --> */}
            < div className="content-header" >
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h1 className="m-0">{pageTitle}</h1>
                        </div>
                        {/* <!-- /.col --> */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            </ol>
                        </div>
                        {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </div >
        </>
    )
}
export default Breadcums;
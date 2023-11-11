import { Outlet } from "react-router-dom";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import { useContext, useEffect } from "react";

const OrderPageLayout = () => {
    
 const { setPageTitle } = useContext(PageDetailContext);

useEffect(() => {
    setPageTitle("Orders");
  }, [])

    return (
        <>
        <Outlet></Outlet>
        </>
    )
};

export default OrderPageLayout;
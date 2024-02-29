import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderDetailPage = () => {
  const [orderDetiails, setOrderDetails] = useState([]);
  const [guestUser, setGuestUser] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
    const data = response.data;
    console.log(data);
    setOrderDetails(data.orderList);
    setGuestUser(data.guest);
  }



  useEffect(() => {
    getOrders();
  }, [])
  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Responsive Hover Table</h3>

              <div class="card-tools">
                <div class="input-group input-group-sm" style={{ "width": "150px" }}>
                  <input type="text" name="table_search" class="form-control float-right" placeholder="Search"></input>

                  <div class="input-group-append">
                    <button type="submit" class="btn btn-default">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.card-header --> */}
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Purchase Price</th>
                    <th>Product Details</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderDetiails.map((order, index) => (

                      <tr key={index}>
                        <td>{order._id}</td>
                        {
                          guestUser.map((user) => (
                            <td>{user.user_firstName} {user.user_lastName}</td>
                          ))
                        }
                        <td>{order.order_date.substring(0, 10)}</td>
                        <td><span class="tag tag-success">{order.order_status}</span></td>
                        <td>$ {order.order_total}</td>
                        <td><Link to={`/dashboard/orders/${order._id}`}>Click Here</Link></td>
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
            {/* <!-- /.card-body --> */}
          </div>
          {/* <!-- /.card --> */}
        </div>
      </div>
    </>
  )
}

export default OrderDetailPage;
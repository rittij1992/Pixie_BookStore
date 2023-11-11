import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderProducts = () => {

    const [orderItems, setOrderItems] = useState([]);
    const { id } = useParams();

    const getOrderItems = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${id}`);
        const data = response.data;
        console.log(data);
        const items = data.itemsA;
        setOrderItems(items);

    }

    useEffect(() => {
        getOrderItems();
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
                                        <th>Book Cover</th>
                                        <th>Book Name</th>
                                        <th>Qty Purchased</th>
                                        <th>Book Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderItems.map((item) => (
                                            <tr>
                                                <td>
                                                    {
                                                        (item.book_cover) ?
                                                            <img
                                                                height={100}
                                                                width={70}
                                                                src={`${process.env.REACT_APP_API_URL}/${item.book_cover.replace('public', '')}`} />
                                                            :
                                                            <img
                                                                height={100}
                                                                width={70}
                                                                src={`/dummy-image-square.jpg`} />
                                                    }
                                                    </td>
                                                <td>{item.book_name}</td>
                                                <td>{item.quantity}</td>
                                                <td>$ {item.unit_price}</td>
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

export default OrderProducts;
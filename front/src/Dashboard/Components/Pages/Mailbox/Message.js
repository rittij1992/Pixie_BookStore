import { useContext, useEffect, useState } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";
import axios from "axios";

const MessageList = () => {
  const { setPageTitle } = useContext(PageDetailContext);
  const [allMessageList, setAllMessageList] = useState([]);

  const getAllMessageList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/contactAndSubscribe/allContactMessage`);
    const data = response.data;
    const messageData = data.allContacUsDetail;
    setAllMessageList(messageData);
  }

  useEffect(() => {
    setPageTitle("Inbox Messages");
    getAllMessageList();
  }, [])
  return (
    <>
      <div class="col-md-12">
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">Inbox</h3>

            <div class="card-tools">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="Search Mail"></input>
                <div class="input-group-append">
                  <div class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.card-tools --> */}
          </div>
          {/* <!-- /.card-header --> */}
          <div class="card-body p-0">
            <div class="mailbox-controls">
              {/* <!-- Check all button --> */}
              <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="far fa-square"></i>
              </button>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm">
                  <i class="far fa-trash-alt"></i>
                </button>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-reply"></i>
                </button>
              </div>
              {/* <!-- /.btn-group --> */}
              
              <div class="float-right">
                1-50/200
                <div class="btn-group">
                  <button type="button" class="btn btn-default btn-sm">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button type="button" class="btn btn-default btn-sm">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
                {/* <!-- /.btn-group --> */}
              </div>
              {/* <!-- /.float-right --> */}
            </div>
            <div class="table-responsive mailbox-messages">
              <table class="table table-hover table-striped">
                <tbody>
                  {
                    allMessageList.map((message, index) => (
                      <tr key={index}>
                        <td>
                          <div class="icheck-primary">
                            <input type="checkbox"></input>
                            <label for="check1"></label>
                          </div>
                        </td>
                        <td class="mailbox-star"><a href="#"><i class="fas fa-star text-warning"></i></a></td>
                        <td class="mailbox-name"><a href="read-mail.html">{message.fullName}</a></td>
                        <td class="mailbox-subject"><b>{message.subject}</b> - {message.message_details.substring(0, 27)}...
                        </td>
                        <td class="mailbox-attachment"></td>
                        <td class="mailbox-date text-center">{message.createdAt.substring(0, 10)}</td>
                      </tr>
                    ))

                  }
                </tbody>
              </table>
              {/* <!-- /.table --> */}
            </div>
            {/* <!-- /.mail-box-messages --> */}
          </div>
          {/* <!-- /.card-body --> */}
          <div class="card-footer p-0">
            <div class="mailbox-controls">
              {/* <!-- Check all button --> */}
              {/* <!-- /.btn-group --> */}
              <div class="float-right">
                1-50/200
                <div class="btn-group">
                  <button type="button" class="btn btn-default btn-sm">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button type="button" class="btn btn-default btn-sm">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
                {/* <!-- /.btn-group --> */}
              </div>
              {/* <!-- /.float-right --> */}
            </div>
          </div>
        </div>
        {/* <!-- /.card --> */}
      </div>
    </>
  )
}

export default MessageList;
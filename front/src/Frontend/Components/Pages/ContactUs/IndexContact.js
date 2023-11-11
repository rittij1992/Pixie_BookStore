import axios from "axios";
import { useState } from "react";

const ContactUsPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const submitContactUs = async (e) => {
    e.preventDefault();
    setLoader(true);
    const contactData = { fullName: name, contact_email: email, subject, message_details: message };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/contactAndSubscribe/newContactMessage`, contactData);
    const data = response.data;
    console.log(data);
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
      {/* <!-- Page Content --> */}
      {/* <!-- Contact Page Starts Here --> */}
      <div class="contact-page">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-heading">
                <div class="line-dec"></div>
                <h1>Contact Us</h1>
              </div>
            </div>
            <div class="col-md-6">
              <div id="map">
                {/* <!-- How to change your own map point
                           1. Go to Google Maps
                           2. Click on your location point
                           3. Click "Share" and choose "Embed map" tab
                           4. Copy only URL and paste it within the src="" field below
                    --> */}

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0107022694074!2d88.34528327450889!3d22.503781635490625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0270c6040bd86d%3A0x8ce0994191a67e24!2s71c%2C%20Purna%20Chandra%20Mitra%20Ln%2C%20Badam%20Talla%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033!5e0!3m2!1sen!2sin!4v1697099739675!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div class="col-md-6">
              <div class="right-content">
                <div class="container">
                  <form onSubmit={submitContactUs}
                    id="contact" action="" method="post">
                    <div class="row">
                      <div class="col-md-6">
                        <fieldset>
                          <input onChange={(e) => setName(e.target.value)}
                            name="name" type="text" class="form-control" id="name" placeholder="Your name..." required="" />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <input onChange={(e) => setEmail(e.target.value)}
                            name="email" type="text" class="form-control" id="email" placeholder="Your email..." required="" />
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <fieldset>
                          <input onChange={(e) => setSubject(e.target.value)}
                            name="subject" type="text" class="form-control" id="subject" placeholder="Subject..." required="" />
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <fieldset>
                          <textarea onChange={(e) => setMessage(e.target.value)}
                            name="message" rows="6" class="form-control" id="message" placeholder="Your message..." required=""></textarea>
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <fieldset>
                          <button type="submit" id="form-submit" class="button">Send Message</button>
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <div class="share">
                          <h6>You can also keep in touch on: <span><a><i class="fa fa-facebook"></i></a><a><i class="fa fa-linkedin"></i></a><a><i class="fa fa-twitter"></i></a></span></h6>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact Page Ends Here --> */}
    </>
  )
}

export default ContactUsPage;
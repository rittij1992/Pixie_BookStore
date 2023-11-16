import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css"; //Allows for server-side rendering.
import "react-owl-carousel2/src/owl.theme.default.css"; //Allows for server-side rendering.

const Slider = () => {
    const options = {
        items: 2,
        nav: true,
        rewind: true,
        autoplay: true
    };

    const events = {

    };
    return (
        <>
            <p>Slider</p>
            <OwlCarousel options={options} events={events} >
                <div><img src="/logo192.png" alt="The Last of us" /></div>
                <div><img src="/logo512.png" alt="GTA V" /></div>
                <div><img src="/logo512.png" alt="Mirror Edge" /></div>
            </OwlCarousel>
        </>
    )
}

export default Slider;
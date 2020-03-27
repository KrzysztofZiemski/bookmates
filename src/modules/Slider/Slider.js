import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import noBookImage from '../assets/book-not-found.png';

import './Slider.scss';

const Slider = ({ content }) => {

    const renderSlideElements = () => {
        return content.map(element => {
            return (
                <Link to={`/book/${element.bookId}`} key={element.bookId}>

                    < div className="slide-element" >
                        <img src={element.imageUrl && element.imageUrl !== 'http://vrephotels.com/images/NoImageFound.png' ? element.imageUrl : noBookImage} alt={`book ${unescape(element.title)} `} />
                        <div className="slide-element-data">
                            <h4>{unescape(element.title)}</h4>
                            <div>
                                <p>{element.authors}</p>
                                <p>{element.categories}</p>
                                <p>{element.publishedYear}</p>
                            </div>
                        </div>
                    </div >
                </Link >
            )
        })
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 641 },
            items: 3,
        },
        largeMobile: {
            breakpoint: { max: 640, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };


    return (

        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "largeMobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            renderButtonGroupOutside={true}
        >
            {renderSlideElements()}
        </Carousel>
    )
}

export default Slider;
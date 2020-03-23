import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import noBookImage from '../assets/book-not-found.png';

import './Slider.scss';

const Slider = ({ content }) => {
    console.log(content)

    const renderSlideElements = () => {
        return content.map(element => {
            return (
                <Link to={`/book/${element.bookId}`} >

                    < div className="slide-element" key={element.bookId} >
                        <img src={element.imageUrl && element.imageUrl !== 'http://vrephotels.com/images/NoImageFound.png' ? element.imageUrl : noBookImage} alt={`book ${unescape(element.title)} `} />
                        <div className="slide-element-data">
                            <h3>{unescape(element.title)}</h3>
                            <p>{element.authors}</p>
                            {/* <p>{element.categories}</p> */}
                            <p>{element.publishedYear}</p>
                        </div>
                    </div >
                </Link >
            )
        })
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };


    return (

        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={55000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            renderButtonGroupOutside={true}
        >
            {renderSlideElements()}
        </Carousel>
    )
}

export default Slider;
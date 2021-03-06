import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ButtonBasic } from '../../Button/Button';
import noBookImage from '../../assets/book-not-found.png';
import './Slider.scss';

const Slider = ({ content, onClick, id }) => {
    const renderSlideElements = () => {
        return content.map(element => {
            return (
                <div className="slideElement" key={element.bookId}>
                    <div>
                        <Link to={`/book/${element.bookId}`} >
                            <img src={element.imageUrl && element.imageUrl !== 'http://vrephotels.com/images/NoImageFound.png' ? element.imageUrl : noBookImage} alt={`book ${element.title ? unescape(element.title) : 'Brak'} `} />
                            <div className="slideElementData">
                                <h4>{unescape(element.title)}</h4>
                                <div>
                                    <p>{element.authors === 'not found' ? null : element.authors}</p>
                                    <p>{element.categories ? element.categories : 'Brak określonej kategorii'}</p>
                                    <p>{element.publishedYear === '0000' ? null : element.publishedYear}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {onClick ? <ButtonBasic handleClick={() => onClick(id, element)} content={'Usuń książkę'} /> : null}
                </div>
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
            items: 1,
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
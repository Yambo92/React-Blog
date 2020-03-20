import React from 'react'
import "./style.scss"
import {Carousel} from 'antd'

const carouselImgs = [
    require('./banner_1.png'),
    require('./banner_2.png'),
    require('./banner_3.png'),
]

export default function Banner(props) {
    
    const renderCarousel = (imgs) =>{
        return imgs.map((item) => (
            <div key={item.default} className="carouselImgContainer">
                <img src={item.default}/>
            </div>
        ))
    }

    return (
        <Carousel autoplay dots={false}>
            {renderCarousel(carouselImgs)}
        </Carousel>
    )
}
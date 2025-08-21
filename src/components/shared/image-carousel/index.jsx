import { useState } from 'react'
import './index.css'




const ImageCarousel = ({slides, onClick}) => {
    // Img index
    const [currentIndex, setCurrentIndex] = useState(0)

    // ----------Arrow Functions--------------
    // Left Arrow
    const previous = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }
    // Right Arrow
    const next = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    // Dots
    const selectSlide = slideIndex => {
        setCurrentIndex(slideIndex)
    }

    const handleClick = () => {
        onClick(slides[currentIndex].slug)
        
    }

    // Display
    return (
        <div className='carousel-wrapper w-full' >
            <div className="left-arrow" onClick={previous}>&#8678;</div>
            <div className="right-arrow" onClick={next}>&#8680;</div>
            
            <a onClick={handleClick}>
                <div className='carousel-img' style = {{backgroundImage: `url(${slides[currentIndex].imgURL})`}}>
                    <h1 className="img-title p mx">{slides[currentIndex].title}</h1>
                </div>
            </a>
            <div className="dots-container">
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className={`dots ${slideIndex === currentIndex ? "active" : "" }`} onClick={() => selectSlide(slideIndex)}>&#x2022;</div>
                ))}
            </div>
        </div>
    )
}

// Export------------------------------------------------------------------------------------------------------
export default ImageCarousel
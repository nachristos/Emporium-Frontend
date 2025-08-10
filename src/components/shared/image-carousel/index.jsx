import {useState} from 'react'
import './index.css'




const ImageCarousel = ({slides}) => {
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

    // Display
    return (
        <div className='carousel-wrapper' >
            <div className="left-arrow" onClick={previous}>&#8678;</div>
            <div className="right-arrow" onClick={next}>&#8680;</div>
            
            <div className='carousel-img' style = {{backgroundImage: `url(${slides[currentIndex].imgURL})`}}>
                <div className="img-title">{slides[currentIndex].title}</div>
            </div>
            <div className="dots-container">
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className="dots" onClick={() => selectSlide(slideIndex)}>&#x2022;</div>
                ))}
            </div>
        </div>
    )
}

// Export------------------------------------------------------------------------------------------------------
export default ImageCarousel
import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ children, settings = {} }) => (
  <Slider {...settings}>
    {children}
  </Slider>
);

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object,
};

export default Carousel;


// https://react-slick.neostack.com/docs/api/#methods

// Settings / Configurations
// accessibility
// Type: bool
// Default: true
// Description: Enable tabbing and arrow key navigation
// adaptiveHeight
// Type: bool
// Default: false
// Description: Adjust the slide's height automatically
// afterChange
// Type: func
// Default: Default
// Description: Index change callback. `index => ...`
// appendDots
// Type: func
// Default: dots => <ul>{dots}</ul>
// Description: Custom dots templates. Works same as customPaging
// arrows
// Type: bool
// Default: true
// Description:
// asNavFor
// Type: ref
// Default: undefined
// Description: provide ref to another slider and sync it with current slider
// autoplaySpeed
// Type: int
// Default: 3000
// Description: Delay between each auto scroll (in milliseconds)
// autoplay
// Type: bool
// Default: false
// Description:
// beforeChange
// Type: func
// Default: null
// Description: Index change callback. `(oldIndex, newIndex) => ...`
// centerMode
// Type: bool
// Default: false
// Description: Center current slide
// centerPadding
// Type: string
// Default: '50px'
// Description:
// className
// Type: string
// Default: ''
// Description: CSS class for inner slider div
// customPaging
// Type: func
// Default: i => <button>{i + 1}</button>
// Description: Custom paging templates. [Example](examples/CustomPaging.js)
// dotsClass
// Type: string
// Default: 'slick-dots'
// Description: CSS class for dots
// dots
// Type: bool
// Default: Default
// Description:
// draggable
// Type: bool
// Default: true
// Description: Enable scrollable via dragging on desktop
// easing
// Type: string
// Default: 'linear'
// Description:
// fade
// Type: bool
// Default: Default
// Description:
// focusOnSelect
// Type: bool
// Default: false
// Description: Go to slide on click
// infinite
// Type: bool
// Default: true
// Description: Infinitely wrap around contents
// initialSlide
// Type: int
// Default: 0
// Description: Index of first slide
// lazyLoad
// Type: ondemand`/`progressive
// Default: null
// Description: Load images or render components on demand or progressively
// onEdge
// Type: func
// Default: null
// Description: Edge dragged event in finite case, `direction => {...}`
// onInit
// Type: func
// Default: null
// Description: componentWillMount callback. `() => void`
// onLazyLoad
// Type: func
// Default: null
// Description: Callback after slides load lazily `slidesLoaded => {...}`
// onReInit
// Type: func
// Default: null
// Description: componentDidUpdate callback. `() => void`
// onSwipe
// Type: func
// Default: null
// Description: Callback after slide changes by swiping
// pauseOnDotsHover
// Type: bool
// Default: false
// Description: Prevents autoplay while hovering on dots
// pauseOnFocus
// Type: bool
// Default: false
// Description: Prevents autoplay while focused on slides
// pauseOnHover
// Type: bool
// Default: true
// Description: Prevents autoplay while hovering on track
// responsive
// Type: array
// Default: null
// Description: Customize based on breakpoints (see the demo example for better understanding)
// rows
// Type: integer
// Default: 1
// Description: number of rows per slide in the slider, (enables grid mode)
// rtl
// Type: bool
// Default: false
// Description: Reverses the slide order
// slide
// Type: string
// Default: 'div'
// Description: Slide container type
// slidesPerRow
// Type: int
// Default: 1
// Description: number of slides to display in grid mode, this is useful with rows option
// slidesToScroll
// Type: int
// Default: 1
// Description: How many slides to scroll at once
// slidesToShow
// Type: int
// Default: 1
// Description: How many slides to show in one frame
// speed
// Type: int
// Default: 500
// Description: Animation speed in milliseconds
// swipeToSlide
// Type: bool
// Default: false
// Description: Enable drag/swipe irrespective of `slidesToScroll`
// swipe
// Type: bool
// Default: true
// Description: Enable/disable swiping to change slides
// touchMove
// Type: bool
// Default: true
// Description:
// touchThreshold
// Type: int
// Default: 5
// Description:
// useCSS
// Type: bool
// Default: true
// Description: Enable/Disable CSS Transitions
// useTransform
// Type: bool
// Default: true
// Description: Enable/Disable CSS transforms
// variableWidth
// Type: bool
// Default: false
// Description:
// vertical
// Type: bool
// Default: false
// Description:


// Methods
// slickGoTo
// Args: index, dontAnimate
// Default: null, false
// Description: Go to slide index, if dontAnimate=true, it happens without animation
// slickNext
// Args: none
// Default: none
// Description: Go to the next slide
// slickPause
// Args: none
// Default: none
// Description: Pause the autoplay
// slickPlay
// Args: none
// Default: none
// Description: Start the autoplay
// slickPrev
// Args: none
// Default: none
// Description: Go to the previous slide
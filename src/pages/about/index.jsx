import './index.css';

// Export----------------------------------------------------------------------------------------------------
export const About = () => {
  // Display
  return (
    <div className='scrollable about'>
        <div className="w-full mb center">
            <h1 className="img-title">Our Evil Origins</h1>
        </div>
        <div className="flex p center">
            <div className='flex wrap center'>
                <div className='block'>
                    <img src="about-1.png" alt="Dr. Nefario" className="about-image" />
                </div>
                <div className='pxs'/>
                <div className='block'>
                    <h3 className='text'>
                        Before the gadgets, before the chaos, there was just one genius in a lab coat and a dream to disrupt the world.
                        Founded by the one and only Dr. Nefario, our lab was built on explosive ambition and a questionable number of safety violations. From prototype ray guns to chicken-powered hoverboards, every step was a leap toward greatness (and mild destruction).
                    </h3>
                </div>
            </div>
        </div>
        <div className='p w-full center'>
            <div className='w-full'c>
                <div>
                    <h2 className='sec pt'>Our mission statement</h2>
                </div>
                <div className='w-full pt'>
                    <img src="about-2.png" alt="Dr. Nefario" className="minions-image" />
                </div>
            </div>
        </div>
        <div className='w-full center wrap p'>
            <div className='block'>
                <h3 className='text'>
                    We believe the world doesn’t need more rules — it needs more tools for creative rebellion. That’s why we dedicate our brains, beakers, and bots to building gadgets that challenge the norm. Whether you’re toppling empires or just want to prank your neighbour, we’ve got tech for that.
                </h3>
            </div>
            <div className='pxs'/>
            <div className='block'>
                <h3 className='text'>
                    Behind every diabolical plan is an army of overenthusiastic yellow interns. Our loyal Minions power the lab with energy, laughter, and the occasional accidental explosion. They're not just assistants — they’re part of the chaos.
                </h3>
            </div>
        </div>
        <div className='w-full center wrap p'> 
            <h2 className='sec'>
              “Every villain needs a vision. Mine just happened to come with lasers.”  
            </h2>
            <h2 className='sec'>
              — Dr. Nefario 
            </h2>
        </div>
    </div>
  );
}
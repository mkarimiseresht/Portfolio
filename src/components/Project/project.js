import React from 'react';
import './project.css'

const Project = () => {
  return (
    <section id='project'>
        <span className='projectTitle'>What I have done?</span>
        <span className='projectDesc'>I have done several projects.</span>
        <div className='projectBars'>
            <div className='projectBar'>
                <div className='projectBarText'>
                    <h2>Title</h2>
                    <p>Text</p>
                </div>
            </div>
        </div>
        <div className='projectBars'>
            <div className='projectBar'>
                <div className='projectBarText'>
                    <h2>Title</h2>
                    <p>Text</p>
                </div>
            </div>
        </div>
        <div className='projectBars'>
            <div className='projectBar'>
                <div className='projectBarText'>
                    <h2>Title</h2>
                    <p>Text</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Project;
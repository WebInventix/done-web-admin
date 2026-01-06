import React from 'react'
import './index.css'
import { FaStar } from "react-icons/fa6";

const SliderCard = () => {
    return (
        <div>
            <div className='slider-card-container'>
                <div style={{ padding: '20px', marginTop: "20px", }}>
                    <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
                        <div>
                            <FaStar color='#F15A24' size={30} />
                        </div>
                        <div>
                            <FaStar color='#F15A24' size={30} />
                        </div>
                        <div>
                            <FaStar color='#F15A24' size={30} />
                        </div>
                        <div>
                            <FaStar color='#F15A24' size={30} />
                        </div>
                        <div>
                            <FaStar color='#F15A24' size={30} />
                        </div>
                    </div>
                    <div>
                        <div className='card-discription'>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque sed egestas pharetraol quis pharetra arcu pharetra blandit.”</div>
                        <div className='card-discription-head'>John Carter</div>
                        <div className='card-discription-sub-head'>Web Designer</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SliderCard
import React from 'react'

const Image = ({item}) => {
    return (
        <div className='card-front'>
            <img src={item.img} alt='' />
            <center><b style={{fontSize:'20px'}}>{item.name}</b></center>
        </div>
    )
}
export default Image

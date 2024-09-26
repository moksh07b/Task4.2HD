import React from 'react';

const Circle = ({ color, size, onClick, isGlowing }) => {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        boxShadow: isGlowing ? `0px 0px 30px 10px ${color}` : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
      }}
      onClick={onClick}
    ></div>
  );
};

export default Circle;

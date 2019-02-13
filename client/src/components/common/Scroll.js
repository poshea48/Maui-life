import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{
        overflowY: 'scroll',
        maxHeight: '400px',
        marginBottom: '10px',
        borderRadius: '5px'
      }}
    >
      {props.children}
    </div>
  )
}

export default Scroll;

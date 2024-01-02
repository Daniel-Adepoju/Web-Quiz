import React, { useState, useEffect } from 'react';

function Questions({children}) {
    return ( 
        <div className="question">
            {atob(children)}
        </div>
     );
}

export default Questions;
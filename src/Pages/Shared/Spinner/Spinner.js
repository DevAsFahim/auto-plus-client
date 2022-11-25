import React from 'react';

const Spinner = () => {
    return (
        <div className='h-[300px] w-screen grid place-items-center'>
            <div>
                <div style={{"borderTopColor":"transparent"}}
                    className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"></div>
            </div>

        </div>
    );
};

export default Spinner;
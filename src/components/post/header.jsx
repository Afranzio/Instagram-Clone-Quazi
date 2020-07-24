import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Header = () => {
    return(
        <div className='header'>
            <div className='poster'>
                <Avatar alt='Afranzio' src='/static/images/avatar/1.png' />
                <div>
                    <h5>Afranzio</h5>
                    <h6>Chennai</h6>
                </div>
            </div>
        </div>
    );
}

export default Header;
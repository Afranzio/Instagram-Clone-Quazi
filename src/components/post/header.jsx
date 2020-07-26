import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Header = ( {username, location} ) => {
    return(
        <div className='header'>
            <div className='poster'>
                <Avatar alt={username} src='/static/images/avatar/1.png' />
                <div className="id">
                    <h5>{username}</h5>
                    <h6>{location}</h6>
                </div>
            </div>
        </div>
    );
}

export default Header;
import React,{ useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';

const Footer = ( {username, command} ) => {
    const [like, setLike] = useState(true)

    const liked = () => {
        setLike(!like)
    }

    return(
        <div className='footer'>
            <div>
            {like? <FavoriteBorderIcon onClick={liked} /> : <FavoriteIcon onClick={liked} />}
            <QuestionAnswerTwoToneIcon />
            </div>
            <div>
                <strong>{username}: </strong><span>{command}</span>
            </div>
        </div>
    );
}

export default Footer;
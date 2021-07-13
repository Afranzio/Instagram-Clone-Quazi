import React from 'react'
import Post from '../../components/post/Post';
import ImageUploader from '../../components/ImageUpload/imageUpload';

export default function Home({posts, user, userChange}) {
    return (
        <div>
            <div className='container'>
                <div className="App">
                    <div className='upload-container'>
                        {user ? <ImageUploader username={user.displayName} /> : <h2>Please Login to Upload Photos</h2>}
                    </div>
                    <div className='background'>
                        {
                            posts.map(({ id, post }) => (
                                <Post
                                    key={id}
                                    postId={id}
                                    username={post.username}
                                    location={post.location}
                                    imageURL={post.imageURL}
                                    command={post.command}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

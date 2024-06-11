import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const appId = '986670055970087';

const CommentSection = () => {
    const url = 'https://www.facebook.com/your-post-url';

    return (
        <div>
            <FacebookProvider appId={appId} xfbml={true} version="v13.0">
                <Comments href={url} width="800" />
            </FacebookProvider>
        </div>
    );
};

export default CommentSection;
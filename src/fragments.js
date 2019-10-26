export const USER_FRAGMENT = `
    id
    username
    `;

export const COMMENT_FRAGMENT = `
    id
    text
    user{
        ${USER_FRAGMENT}
    }`;

export const LIKES_FRAGMENT = `
    id
    user{
        ${USER_FRAGMENT}
    }`;

export const FILE_FRAGMENT = `
    id
    url
    `;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }`;

export const FULL_POST_FRAGMENT /*전체감싸는 fragment*/ = `
    fragment PostParts on Post{
        id
        location
        caption
        rating
        likes{
            ${LIKES_FRAGMENT}
        }
        files{
            ${FILE_FRAGMENT}
        }
        comments{
            ${COMMENT_FRAGMENT}
        }
        user{
            ${USER_FRAGMENT}
        }
    }`
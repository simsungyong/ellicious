export const USER_FRAGMENT = `
    id
    username
    avatar
    firstName
    lastName
    `;

export const COMMENT_FRAGMENT = `
    id
    text
    headComment{
        id
        text
        user{
            ${USER_FRAGMENT}
        }
    }
    
    user{
        ${USER_FRAGMENT}
    }`;

export const PICKS_FRAGMENT = `
    id
    user{
        ${USER_FRAGMENT}
    }`

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
    room {
        id
    }
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }`;

export const ROOM_FRAGMENT = `
    fragment Roomparts on Room{
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
        
    }`;

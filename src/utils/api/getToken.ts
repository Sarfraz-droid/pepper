import sha256 from 'crypto-js/sha256';


export const createToken = (username: string, password: string) => {   
    const token = sha256(`${username}:${password}`).toString();
    return token;
}

export const verifyToken = (token: string) => {
    const verified = sha256(`${process.env.NEXT_PUBLIC_ID}:${process.env.NEXT_PUBLIC_PASSWORD}`).toString();
    return token === verified;
}
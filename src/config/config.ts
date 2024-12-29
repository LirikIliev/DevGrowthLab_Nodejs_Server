export const SERVER_PORT = 4000;
export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const URL_REGEX = /^https?:\/{2}/;
export const BCRYPT_SALT = 12;
export const JWT_OPTIONS = {
  secret: '8a4b5c2d1f3e7g9h6j0k5n2p8r4q1z3x7y5v0w2t8u3s999s733',
  expiresIn: '5h',
};

export const USERS_ROLE = {
  ADMIN: 'admin',
  GUEST: 'guest',
};

console.log('test');

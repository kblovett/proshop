import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@me.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Kolin Lovett',
    email: 'kolinl@me.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Django Cat',
    email: 'djcat@me.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Tigger Cat',
    email: 'ticat@me.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

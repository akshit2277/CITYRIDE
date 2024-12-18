// // backend/controllers/auth.controller.js
// const db = require('../models');
// const User = db.user;
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.create({
//       email,
//       password: bcrypt.hashSync(password, 8)
//     });

//     res.send({ message: 'User registered successfully!' });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).send({ message: 'User Not Found.' });
//     }

//     const passwordIsValid = bcrypt.compareSync(password, user.password);

//     if (!passwordIsValid) {
//       return res.status(401).send({
//         accessToken: null,
//         message: 'Invalid Password!'
//       });
//     }

//     const token = jwt.sign({ id: user.id }, 'secret-key', {
//       expiresIn: 86400 // 24 hours
//     });

//     res.status(200).send({
//       id: user.id,
//       email: user.email,
//       accessToken: token
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User Not Found.' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: 86400 });

    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

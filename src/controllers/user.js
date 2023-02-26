const db = require('../models/index');
const User = db.users;
const Role = db.roles;
const Image = db.images;
const UploadController = require('./upload.js');
const cookie = require('cookie-parser');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const {validationResult} = require('express-validator');
const { secret } = require('../config/key.config');


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
        // ! Возвращает токен (2 параметр секретный ключ и 3 параметр - объект опций)
    return jwt.sign(payload, secret, {expiresIn: "24h"} );
}

class UserController {
    async getUsers(req, res) {
        let checkUser = false;

        const users = await User.findAll({ include: Image });

        if (users.length > 0) {
            checkUser = true;

            return res.render('../views/users/users.hbs', {
                users,
                checkUser: checkUser
            });
        }
        return res.render('../views/users/users.hbs');
    }


    async register(req, res) {
        try {
            const images = await Image.findAll();
            const length = await images.length;

            return res.render('../views/users/register.hbs', {
                imagesLength: length
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Register Error Template" });
        }
    }
    
    async registerProcess(req, res) {
        try {

            const { email, pass, imageId, roleId, file } = req.body;
            const user = await User.findOne({ where: { email: email }, include: Role });
            const userss = await User.findAll();
            const userLength = userss.length + 1;

            const token = generateAccessToken(userLength, 'USER');
            const headerToken = req.headers.authorization = "Bearer" + ' ' + token;
            // console.log(headerToken);

            if (user) {
                delete req.body.imageId;    // ! очищаем поле инпута
                delete req.body.email; 
                delete req.body.pass; 
                delete req.body.file; 

                return res.status(400).json({ message: "Такой пользователь существует" })
            }
            const image = await UploadController.uploadFiles(req, res, req.file);

            const Iid = Number(req.body.imageId) + 1;
            const hashPassword = bcrypt.hashSync(pass, 5);

            const users = await User.create({
                email: req.body.email,
                password: hashPassword,
                roleId: req.body.roleId,
                imageId: Iid
            });


            delete req.body.imageId;    // ! очищаем поле инпута
            delete req.body.email; 
            delete req.body.pass; 
            delete req.body.file; 

            return res.redirect('/');

        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Register Error" });
        }
    }


    login(req, res) {
        try {
            return res.render('../views/users/login.hbs');
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Login Error Template" });
        }
    }
    async loginProcess(req, res) {
        try {
            const users = await User.findOne({ where: { email: req.body.email }, include: Role });

            if (!users) {
                res.status(400).json({ message: "Пользователя не существует" });
            } else {
                // ! Проверяем пароли 
                const validPassword = bcrypt.compareSync(req.body.pass, users.password);

                if (!validPassword) {
                    res.status(400).json({ message: "Неверно введен пароль" });
                }

                // ! Генерируем токен
                const token = generateAccessToken(users.id, users.role.name);
                req.headers.authorization = "Bearer" + ' ' + token;

                // return res.json(token)
                return res.redirect('/');
            }

        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Login Error" });
        }
    }

    async logout(req, res) { }
}

module.exports = new UserController();

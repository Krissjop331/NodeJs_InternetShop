// ! ДОСТУП К ОПРЕДЕЛЕННОМУ МЕТОДУ ТОЛЬК НАПРИМЕР У АДМИНИСТРАТОРА

const jwt = require('jsonwebtoken');
const { secret } = require("../config/key.config");
const db = require('../models/index');

module.exports = (rolesss) => {
    // * замыкание
    return async function (req, res, next) {

        // ? проверяем метод запроса
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.cookies.token.split(' ')[1];

            if (!token) {
                return res.status(403).json({ messagee: "Пользователь не авторизован " })
            }
            let hasRole = false;
            const {roles} = jwt.verify(token, secret);

            if(roles === rolesss) {
                hasRole = true;
            }
            if(!hasRole) {
                return res.status(403).json({ messagee: "У вас нет доступа (middleware  RoleMiddleware)" })
            }

            next();
        } catch (error) {
            console.log("authMiddleware" + " " + error);
            return res.status(403).json({ messagee: "Пользователь не авторизован (middleware -catch RoleMiddleware)" })
        }
    }
}
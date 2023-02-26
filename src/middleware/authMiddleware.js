// ! ДАЕТ ДОСТУП К ТОЙ ИЛИ ИНОЙ ФУНКЦИИ ТОЛЬКО ЗАРЕГЕСТРИРОВАННЫМ ПОЛЬЗОВАТЕЛЯМ

const jwt = require('jsonwebtoken')
const {secret} = require('../config/key.config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        } else {
            const decodedData = jwt.verify(token, secret)
            req.user = decodedData
        }
        
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован (catch)"})
    }
};















// const jwt = require('jsonwebtoken');
// const {secret} = require('../config/key.config');

// module.exports = (req, res, next) => {
//     // ? проверяем метод запроса
//     if(req.method === "OPTIONS") {
//         next();
//     }

//     try {
//         // if(typeof req.headers.authorization === "string") {}

//         const token = req.headers.authorization.split(' ')[1];
//         console.log(token);

//         if(!token) {
//             return res.status(403).json({messagee: "Пользователь не авторизован "})
//         }
//         // ! Декодируем токен и проверяем его
//         const decodedData = jwt.verify(token, secret);
//         // ! Чтобы мы могли использовать данные эти внутри других функций
//         req.user = decodedData;
//         next();
//     } catch (error) {
//         console.log("authMiddleware" + " " + error);
//         return res.status(403).json({messagee: "Пользователь не авторизован (middleware -catch)"})
//     }
// }
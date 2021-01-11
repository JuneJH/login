const md5 = require("md5");
const Admin = require("../models/Admin");
const validate = require("validate.js");

//检查username是否存在
validate.validators.isExistUserName = async (value) => {
    if (!value) return;
    const result = await getAdminByUsername(value);
    if (result) {
        return "^%{value}已存在,请选择专属您的用户名"
    };
}
// 检查密码是否符合规定
validate.validators.checkPassword = async (value) => {
    if (!value) return;

    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if (!reg.test(value)) {
        return "^您的密码格式在目前这个危险的世界并不安全"
    }
}
getAdminByUsername = async function (username) {
    const result = await Admin.findOne({where: {username}});
    return result ? result.toJSON() : null;
}
exports.getAdminByUsername = getAdminByUsername;

exports.addAdmin = async function (obj) {
    // 验证是否为标准的格式
    const rules = {
        username: {
            presence: {
                allowEmpty: false,
                message: "^伟人的思想总是有着惊人的相似,但也有着许多的不同"
            },
            type: "string",
            length: {
                minimum: 1,
                maximum: 100,
                message: "^用户名的长度必须在1~100之间"
            },
            isExistUserName: true,
        },
        password: {
            presence: {
                allowEmpty: false,
                message: "^好好想想一个只有你知道的密码"
            },
            type: "string",
            length: {
                minimum: 6,
                maximum: 16,
                message: "^密码的长度必须在6~16之间"
            },
            checkPassword: true
        },
        mobile: {
            type: "string",
            length: {
                is: 11,
                message: "^您的移动电话需要11位"
            }
        },
        email: {
            type: "string",
            email: {
                message: "^邮箱不是这样子滴"
            },
        },
        count: {
            presence: {
                allowEmpty: false,
            },
            type: "number",
        },
    }
    obj.count = 0;
    try {
        const result = await validate.async(obj, rules)
        obj.password = md5(obj.password);
        const succeed = await Admin.create(obj);
        return {isOk: true, succeed};
    } catch (err) {
        return {isOk: false, err};
    }
}
exports.updateAdmin = async function (id, obj) {
    // 验证是否为标准的格式
    const rules = {
        username: {
            type: "string",
            length: {
                minimum: 1,
                maximum: 100,
            },
            isExistUserName: true,
        },
        password: {
            type: "string",
            length: {
                minimum: 6,
                maximum: 16,
            },
            checkPassword: true
        },
        mobile: {
            type: "string",
            length: {
                is: 11,
            }
        },
        email: {
            type: "string",
            email: true,
        },
        headerImg: {
            type: "string",
        },
        count: {
            type: "number",
        },
    }
    try {
        const result = await validate.async(obj, rules)
        if (obj.password) {
            obj.password = md5(obj.password);
        }
        const succeed = await Admin.update(obj, {
            where: {
                id
            }
        });
        return {isOk: true, succeed};
    } catch (err) {
        return {isOk: false, err};
    }
}
exports.getAdminById = async function (id) {
    const result = await Admin.findOne({where: {id}});
    return result ? result.toJSON() : null;
}
exports.login = async function (username, password) {
    password = md5(password);
    return await Admin.findOne({where: {username, password}})
}
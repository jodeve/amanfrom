import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../../models";


async function login(req, res) {
    const {
        email,
        password,
    } = req.body;
    const _user = await user.findOne({
        where: {
            email,
        }
    });
    if (_user && await bcrypt.compare(password, _user.password)) {
        const token = jwt.sign({ id: _user.id }, process.env.TOKEN, { algorithm: "HS256" });
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.send({

        });
    }
    return res.status(401)
        .json({

        });
}

export default login;
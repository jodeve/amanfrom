import { page } from "../../models";


async function index(_, res) {
    try {
        let data = await page.findByPk(1);
        if (data) return res.status(200)
            .json(JSON.parse(data.content))
        else return res.status(404)
            .send({ nothing: "" });
    } catch (e) {
        console.log(e);

    }
}

async function update(req, res) {
    try {
        let id = 1;
        let body = req.body;
        let data = await page.update({
            content: JSON.stringify(body)
        }, {
            where: {
                id
            }
        });
        if (data[0] === 0) {
            return res.status(404)
                .json({})
        } return res.status(200)
            .json({ data })
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({})
    }
}

export default {
    index,
    update,
}
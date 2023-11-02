import { service } from "../../models";


async function index(_, res) {

    try {
        let data = await service.findAll();
        return res.status(200)
            .json(data)
    } catch (e) {
        console.log(e);

    }

}

async function store(req, res) {

    let {
        name,
        sub,
    } = req.body;

    try {

        if(sub) sub = JSON.stringify(sub);

        let data = await service.create({
            name,
            sub
        });
        return res.status(201)
            .json(data)
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({})
    }
}

async function update(req, res) {

    let {
        name,
        sub,
    } = req.body;

    try {

        if(sub) sub = JSON.stringify(sub);

        const id = req.params.id;

        let data = await service.update({
            name,
            sub
        }, {
            where: {
                id
            }
        });
        if (data[0] === 0) {
            return res.status(404)
                .json({})
        }
        let _service = await service.findByPk(id);
        return res.json(_service)
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({})
    }
}

async function destroy(req, res) {

    const id = req.params.id;

    const data = await service.destroy({ where: { id } });;
    return res
        .json(data)

}

export default {
    index,
    store,
    destroy,
    update,
}
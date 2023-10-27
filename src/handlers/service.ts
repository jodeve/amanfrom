import { service } from "../../models";


async function index(_, res) {

    let data = await service.findAll();
    return res.status(200)
        .json(data)

}

async function store(req, res) {

    try {
        let data = await service.create(req.body);
        return res.status(201)
            .json(data)
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({})
    }
}

async function destroy(req, res) {

    const id = req.params.id;

    const data = await service.destroy({ where: { id } });;
    return res.status(201)
        .json(data)

}

export default {
    index,
    store,
    destroy,
}
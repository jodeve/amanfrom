import { image } from "../../models";
import { uploadBase64 } from "../lib";

async function index(_, res) {

    try {
        let data = await image.findAll();
        return res.status(200)
            .json(data)
    } catch (e) {
        console.log(e);

    }

}

async function store(req, res) {

    try {

        let _image = req.body.image;
        let croppedImage = req.body.croppedImage;

        _image = await uploadBase64(_image);


        croppedImage = await uploadBase64(croppedImage, true);

        if (_image == "" || croppedImage == "") {
            return res.status(500)
                .json({})
        }

        let data = await image.create({
            croppedImage,
            image: _image,
        });
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

    const data = await image.destroy({ where: { id } });;
    return res
        .json(data)

}

export default {
    store,
    index,
    destroy,
}
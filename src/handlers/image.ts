import { image } from "../../models";
import { uploadBase64 } from "../lib";

async function index(_, res) {

    let data = await image.findAll();
    return res.status(200)
        .json(data)

}

async function store(req, res) {

    try {

        let _image = req.body.image;
        let croppedImage = req.body.croppedImage;

        _image = uploadBase64(_image);
        croppedImage = uploadBase64(croppedImage);


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

export default {
    store,
    index,
}
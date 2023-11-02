
import * as fs from "fs";
import uniqid from "uniqid";
import sharp from "sharp";
import cloudinary from 'cloudinary';

const upload = (data): Promise<string> => {
    return new Promise((res, rej) => {
        cloudinary.v2.uploader.upload_stream({  }, (err, url) => {
            if (err) {
                console.log(err);
                return res("");
            };
            return res(url.secure_url);
        }).end(data)
    })
}

export const uploadBase64 = async (v, cropped = false) => {
    if (!v) {
        return "";
    }
    try {
        let matches = v.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches.length !== 3) return "";
        const type = matches[1];
        //let ext = mime.getExtension(type);
        let data = Buffer.from(matches[2], "base64");
        if (cropped) {
            data = await sharp(data)
                .resize({
                    width: 640,
                    height: 480
                })
                .toBuffer();
        }
        if (process.env.NODE_ENV != "production") {
            const fileName = `${uniqid()}.jpeg`;
            fs.writeFileSync(`public/images/${fileName}`, data, "utf8");
            return `${process.env.APP_HOST}/images/${fileName}`;
        } else {
            const res = await upload(data);
            return res;
        }
    } catch (e) {
        console.log(e);
        return "";
    }
};
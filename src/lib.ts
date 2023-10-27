
import * as fs from "fs";
import uniqid from "uniqid";

export const uploadBase64 = (v) => {
    if (!v) {
        return "";
    }
    try {
        let matches = v.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches.length !== 3) return "";
        const type = matches[1];
        console.log(type);

        //let ext = mime.getExtension(type);
        const data = Buffer.from(matches[2], "base64");
        const fileName = `${uniqid()}.jpeg`;
        fs.writeFileSync(`public/images/${fileName}`, data, "utf8");
        return `${process.env.APP_HOST}/images/${fileName}`;
    } catch (e) {
        console.log(e);
        return "";
    }
};
import classNames from "classnames"
import Img from "components/Img"

const ServiceFormImage = ({ formik, image }) => {

    const onChangeImage = () => formik.handleChange({ target: { name: "image", value: image.croppedImage } })

    return (
        <div
            className={
                classNames(
                    'border-2',
                    formik.values["image"] == image.croppedImage ? 'border-blue-300' : '',
                    'p-2 rounded-lg'
                )
            }
            onClick={onChangeImage}
        >
            <Img src={image.croppedImage} />
        </div>
    )
}

export default ServiceFormImage;
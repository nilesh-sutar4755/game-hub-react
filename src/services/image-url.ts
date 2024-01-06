import placeholder from "../assets/no-image-placeholder.jpg"

const getCroppedImageUrl = (url: string) => {
    if (!url) return placeholder;
    const index = url.indexOf("media/") + "media/".length;
    return `${url.slice(0, index)}crop/600/400/${url.slice(index)}`
}

export default getCroppedImageUrl;
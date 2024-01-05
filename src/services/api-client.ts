import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "2fa64cba005f441da72e139c4e4500b8"
    }
})
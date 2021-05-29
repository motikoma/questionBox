import { Answer } from "../interfaces/index";
const getDescription = (answer: Answer) => {
    const body = answer.body.trim().replace(/[ \r\n]/g, "");
    if (body.length > 140) {
      return body;
    } else {
      return body.substring(0, 140) + "...";
    }
};

export default getDescription;
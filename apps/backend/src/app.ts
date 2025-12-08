import { mongodbLoader } from "./loaders/db.loader.js";
import { expressLoader } from "./loaders/express.loader.js";

export const createApp = async() => {
  try {
    await mongodbLoader()
    const app = expressLoader();
    
    return {app};
  } catch (error) {
    console.log("Error in app :: ",error)
    throw error;
  }
}
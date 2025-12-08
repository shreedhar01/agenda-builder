import { createApp } from "./app.js";

const start = async () => {
  try {
    const { app } = await createApp();

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (err) {
    console.log("Startup error ::", err);
    process.exit(1);
  }
};

start();
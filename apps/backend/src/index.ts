import { createApp } from "./app.js";

// Cache the app instance for serverless
let appInstance: any = null;

// Export default function for Vercel serverless
export default async (req: any, res: any) => {
  if (!appInstance) {
    const { app } = await createApp();
    appInstance = app;
  }
  return appInstance(req, res);
};

// Local development server (only runs when not in Vercel)
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

// Only start the server if not in Vercel environment
if (!process.env.VERCEL) {
  start();
}
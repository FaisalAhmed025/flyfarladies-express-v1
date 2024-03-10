import config from "./config/index";
import app from "./mainapp";

async function mainserver() {
  app.listen(config.port, () => {
    console.log(`Application listening on port ${config.port}`);
  });
}

mainserver();

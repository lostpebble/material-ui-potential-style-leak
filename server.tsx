import * as Koa from "koa";
import * as React from "react";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { green, red } from "material-ui/colors";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";

const reactDomServer = require("react-dom/cjs/react-dom-server.node.production.min");

const app = new Koa();

function baseReact(sheetsRegistry) {
  const muiTheme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: "light",
    } as any,
  });

  const generateClassName = createGenerateClassName();

  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={muiTheme}>
        <Paper elevation={4}>
          <Typography variant="headline" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </MuiThemeProvider>
    </JssProvider>
  );
}

app.use((ctx) => {
  const sheetsRegistry = new SheetsRegistry();

  const reactHtml = reactDomServer.renderToString(baseReact(sheetsRegistry));
  const css = sheetsRegistry.toString();

  ctx.body = `
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="root">${reactHtml}</div>
        <style id="jss-server-side">${css}</style>
    </body>
</html>
`;
  ctx.status = 200;

  console.log(`SERVER HIT!`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

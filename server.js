"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var React = require("react");
var styles_1 = require("material-ui/styles");
var Paper_1 = require("material-ui/Paper");
var Typography_1 = require("material-ui/Typography");
var jss_1 = require("jss");
var JssProvider_1 = require("react-jss/lib/JssProvider");
var colors_1 = require("material-ui/colors");
var createGenerateClassName_1 = require("material-ui/styles/createGenerateClassName");
var reactDomServer = require("react-dom/cjs/react-dom-server.node.production.min");
var app = new Koa();
function baseReact(sheetsRegistry) {
    var muiTheme = styles_1.createMuiTheme({
        palette: {
            primary: colors_1.green,
            accent: colors_1.red,
            type: "light",
        },
    });
    var generateClassName = createGenerateClassName_1.default();
    return (React.createElement(JssProvider_1.default, { registry: sheetsRegistry, generateClassName: generateClassName },
        React.createElement(styles_1.MuiThemeProvider, { theme: muiTheme },
            React.createElement(Paper_1.default, { elevation: 4 },
                React.createElement(Typography_1.default, { variant: "headline", component: "h3" }, "This is a sheet of paper."),
                React.createElement(Typography_1.default, { component: "p" }, "Paper can be used to build surface or other elements for your application.")))));
}
app.use(function (ctx) {
    var sheetsRegistry = new jss_1.SheetsRegistry();
    var reactHtml = reactDomServer.renderToString(baseReact(sheetsRegistry));
    var css = sheetsRegistry.toString();
    ctx.body = "\n<!DOCTYPE html>\n<html lang=\"en\">\n    <body>\n        <div id=\"root\">" + reactHtml + "</div>\n        <style id=\"jss-server-side\">" + css + "</style>\n    </body>\n</html>\n";
    ctx.status = 200;
    console.log("SERVER HIT!");
});
var port = 3000;
app.listen(port, function () {
    console.log("Server listening on port " + port);
});
//# sourceMappingURL=server.js.map
import * as ko from "knockout";
import rootViewModel from "./appController";
import Router = require("ojs/ojrouter");
import * as Logger from "ojs/ojlogger";
import "ojs/ojknockout";
import "ojs/ojmodule";
import "ojs/ojnavigationlist";

export default class Root {
    constructor() {
        // if running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
        // event before executing any code that might interact with Cordova APIs or plugins.
        if (document.body.classList.contains("oj-hybrid")) {
            document.addEventListener("deviceready", this.init);
        } else {
            this.init();
        }
    }

    init(): void {
        Router.sync().then(
            function (): void {
                rootViewModel.loadModule();
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(rootViewModel, document.getElementById("globalBody"));
            },
            function (error : { message: string }): void {
                Logger.error("Error in root start: " + error.message);
            }
        );
    }
}
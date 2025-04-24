sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller,Filter,FilterOperator,MessageBox) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.DetailView", {
        onInit() {
            
            let oRouter = this.getRouter();
            oRouter.attachRoutePatternMatched(this._onRouteMatched, this);

        },

        _onRouteMatched:function(oEvent){
            this.index = oEvent.getParameter("arguments").indexDetail
            let sPath ="MiningModel>/"+ this.index;
            let oView = this.getView()
            oView.bindElement(sPath)
        },
        onEdit:function(){
            let oRouter = this.getRouter();
            oRouter.navTo("RouteUpdateView",{
                indexUpdate:this.index
            })
        },
        onPress:function(){
            let oRouter = this.getRouter()
            oRouter.navTo("RouteMiningView")
        }
    });
});
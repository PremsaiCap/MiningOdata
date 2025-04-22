sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function(BaseController,MessageBox){
    "use strict";

    return BaseController.extend("app.miningodata.controller.App",{
        onInit:function() {

        },
        getRouter:function(){
            return this.getOwnerComponent().getRouter();
        },

        getModel:function(m){
            return this.getOwnerComponent().getModel(m);
        },
        _getData:function(){
            let oModel = this.getModel()

            let entity ="/Z9231_MIN_SPR_ETSet"

            let that = this
            oModel.read(entity,{
                success:function(odata,resp){
                    let jModel = that.getModel("MiningModel")
                    jModel.setData(odata.results)
                },
                error:function(oError){
                    MessageBox.error("couldn't fetch data")
                }

            })
        },
    })
})
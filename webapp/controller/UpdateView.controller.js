sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.UpdateView", {
        onInit() {
            
            let oRouter = this.getRouter();
            oRouter.attachRoutePatternMatched(this._onRouteMatched, this);            
        },

        _onRouteMatched:function(oEvent){
            let index=oEvent.getParameter("arguments").indexUpdate
            let sPath = "MiningModel>/"+index
            let oView = this.getView()
            oView.bindElement(sPath)
        },

        onUpdate:function(){
            
            // first step get the model
            // we need the entity
            // method(theEntity, payLoad{})

            // PAYLOAD for date use toLocaleString
            // Payload
            // objects of the input fields
            let oLocId=this.getView().byId("idLocIdU")
            let oLocDes=this.getView().byId("idLocDesU")
            let oMinRes=this.getView().byId("idMinResU")
            let oTotCos=this.getView().byId("idTotCosU")
            let oRepOnMin=this.getView().byId("idRepOnMinU")
            let oDrills=this.getView().byId("idDrillsU")
            let oTMin=this.getView().byId("idTMinU")
            let oMdays=this.getView().byId("idMdaysU")
            let oPrOt=this.getView().byId("idPrOtU")
            let oCurrKey=this.getView().byId("idCurrKeyU")
     
            // values
            let sLocId=oLocId.getValue()
            sLocId=sLocId.toUpperCase()
            let sLocDes=oLocDes.getValue().toUpperCase()
            let sMinRes=oMinRes.getValue()
            sMinRes=sMinRes.toUpperCase()
            let sTotCos=oTotCos.getValue()
            let sRepOnMin=oRepOnMin.getValue().toUpperCase()
            let sDrills=oDrills.getValue()
            let sTMin=oTMin.getValue().toUpperCase()
            let sMdays=oMdays.getValue()
            let sPrOt=oPrOt.getValue().toUpperCase()
            let sCurrKey=oCurrKey.getValue().toUpperCase()
            
            if(!sLocId || !sLocDes || !sMdays || !sCurrKey || !sDrills || !sMinRes || !sPrOt || !sRepOnMin || !sTMin || !sTotCos){
                MessageBox.error("All fields are required")
                return
            }
     
            let payload={
                "LocDesc":sLocDes,
                "MinRes":sMinRes,
                "TotCost":sTotCos,
                "RepMin":sRepOnMin,
                "NumDrills":sDrills,
                "MinType":sTMin,
                "ManDays":sMdays,
                "ProbOut":sPrOt,
                "MinCuky":sCurrKey
            }

            
            // first step: get the model
            let oModel=this.getModel()
     
            // second step: we need the entity
            let entity = `/Z9231_MIN_SPR_ETSet(LocId='${sLocId}')`
            let that = this;
            // third step: method (theEntity, payload{})
            oModel.update(entity, payload, {
            success:function(){
                MessageBox.success("Record updated",{
                    onClose:function(){
                        let oRouter = that.getRouter()
                        
                        oRouter.navTo("RouteMiningView")
                        that._getData()
                    }.bind(that)
                })
                
            },
            error:function(error){
                MessageBox.error("Failed to update record")
            }
            })
        },

        onPress:function(){
            let oRouter = this.getRouter()
            oRouter.navTo("RouteMiningView")
        }
    });
});
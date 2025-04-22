sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.CreateView", {
        onInit() {
            
            // this.oRouter = this.getOwnerComponent().getRouter();
            // this.oRouter.getRoute("RouteCreateView").attachPatternMatched(this._onRouteMatched, this);
            
            
    
        },

        onSubmit:function(){
            
            // first step get the model
            // we need the entity
            // method(theEntity, payLoad{})

            // PAYLOAD for date use toLocaleString
            // Payload
            // objects of the input fields
            let oLocId=this.getView().byId("idLocIdC")
            let oLocDes=this.getView().byId("idLocDesC")
            let oMinRes=this.getView().byId("idMinResC")
            let oTotCos=this.getView().byId("idTotCosC")
            let oRepOnMin=this.getView().byId("idRepOnMinC")
            let oDrills=this.getView().byId("idDrillsC")
            let oTMin=this.getView().byId("idTMinC")
            let oMdays=this.getView().byId("idMdaysC")
            let oPrOt=this.getView().byId("idPrOtC")
            let oCurrKey=this.getView().byId("idCurrKeyC")
     
            // values
            let sLocId=oLocId.getValue().toUpperCase()
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
     
     
            let payload={
                "LocId":sLocId,
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
            let entity="/Z9231_MIN_SPR_ETSet"
            let that = this;
            // third step: method (theEntity, payload{})
            oModel.create(entity, payload, {
            success:function(){
                MessageBox.success("Record inserted",{
                    onClose:function(){
                        let oRouter = that.getOwnerComponent().getRouter()
                        oLocId.setValue()
                        oLocDes.setValue()
                        oMinRes.setValue()
                        oTotCos.setValue()
                        oRepOnMin.setValue()
                        oDrills.setValue()
                        oTMin.setValue()
                        oMdays.setValue()
                        oPrOt.setValue()
                        oCurrKey.setValue()
                        oRouter.navTo("RouteMiningView")
                        that._getData()
                    }.bind(that)
                })
                
            },
            error:function(error){
                MessageBox.error("Failed to insert record")
            }
            })
        }
    });
});
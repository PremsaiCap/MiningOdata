sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "app/miningodata/Validate/validate",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox, Validate,JSONModel) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.CreateView", {
        onInit() {
            // Initialization code
            this._getData()
        },

        onSubmit: function() {

            let existingRecords = this.getModel("MiningModel").getData();

            
            if (!existingRecords || existingRecords.length === 0) {
                MessageBox.error("No data available. Please ensure data is loaded.");
                return;
            }
    

            // Get the input fields
            let oLocId = this.getView().byId("idLocIdC");
            let oLocDes = this.getView().byId("idLocDesC");
            let oMinRes = this.getView().byId("idMinResC");
            let oTotCos = this.getView().byId("idTotCosC");
            let oRepOnMin = this.getView().byId("idRepOnMinC");
            let oDrills = this.getView().byId("idDrillsC");
            let oTMin = this.getView().byId("idTMinC");
            let oMdays = this.getView().byId("idMdaysC");
            let oPrOt = this.getView().byId("idPrOtC");
            let oCurrKey = this.getView().byId("idCurrKeyC");

            // Values
            let sLocId = oLocId.getValue().toUpperCase();
            let sLocDes = oLocDes.getValue().toUpperCase();
            let sMinRes = oMinRes.getValue().toUpperCase();
            let sTotCos = oTotCos.getValue();
            let sRepOnMin = oRepOnMin.getValue().toUpperCase();
            let sDrills = oDrills.getValue();
            let sTMin = oTMin.getValue().toUpperCase();
            let sMdays = oMdays.getValue();
            let sPrOt = oPrOt.getValue().toUpperCase();
            let sCurrKey = oCurrKey.getValue().toUpperCase();

            let payload = {
                "LocId": sLocId,
                "LocDesc": sLocDes,
                "MinRes": sMinRes,
                "TotCost": sTotCos,
                "RepMin": sRepOnMin,
                "NumDrills": sDrills,
                "MinType": sTMin,
                "ManDays": sMdays,
                "ProbOut": sPrOt,
                "MinCuky": sCurrKey
            };

            // Get the model
            let oModel = this.getModel();

            // Get existing records to check for unique Location ID
            

            // Validate the form
            let fields = [oLocDes, oMinRes, oTotCos, oRepOnMin, oDrills, oTMin, oMdays, oPrOt, oCurrKey];
            let check=Validate;
            let isValid = Validate.validateForm(fields, oLocId, existingRecords);

            if(!isValid){
                return;
            }

            if (isValid) {
                // Create the record if validation passes
                oModel.create("/Z9231_MIN_SPR_ETSet", payload, {
                    success: function() {
                        MessageBox.success("Record inserted", {
                            onClose: function() {
                                let oRouter = this.getOwnerComponent().getRouter();
                                oLocId.setValue("");
                                oLocDes.setValue("");
                                oMinRes.setValue("");
                                oTotCos.setValue("");
                                oRepOnMin.setValue("");
                                oDrills.setValue("");
                                oTMin.setValue("");
                                oMdays.setValue("");
                                oPrOt.setValue("");
                                oCurrKey.setValue("");
                                oRouter.navTo("RouteMiningView");
                                this._getData();
                            }.bind(this)
                        });
                    }.bind(this),
                    error: function(error) {
                        MessageBox.error("Failed to insert record");
                    }
                });
            }
        },

        onF4Help: function (oEvent) {
            // let myInputField where the popup actually popped up
            this.inputField = oEvent.getSource().getId();
            let enititySet = `/Z9231_MIN_SPR_ETSet`;
            let oModel = this.getModel();
     
            // Fetch data from OData model
            oModel.read(enititySet, {
              success: (oData) => {
                let deepcopy = JSON.parse(JSON.stringify(oData.results));
                let oModelFrag = new JSONModel({ newSupp: deepcopy });
     
                if (!this.oDialog) {
                  this.oDialog = sap.ui.core.Fragment.load({
                    fragmentName: "app.miningodata.fragments.popUp",
                    controller: this
                  }).then((dialog) => {
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog);
                    this.getView().setModel(oModelFrag, "FragModel");
                    this.oDialog.open();
                  });
                } else {
                  this.oDialog.open();
                }
              },
              error: (oError) => {
                // Handle error
                sap.m.MessageToast.show("Error fetching data");
              }
            });
        },
     
        onConfirmSupp: function (oEvent) {
            let oSelectedItems = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItems.getProperty("info");
            let onInput = sap.ui.getCore().byId(this.inputField);
            onInput.setValue(sValue);
        },

        onPress:function(){
            let oRouter = this.getRouter()
            oRouter.navTo("RouteMiningView")
        }
    });
});

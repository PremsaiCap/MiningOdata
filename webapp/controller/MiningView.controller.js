sap.ui.define([
    "./BaseController",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox"
], (Controller, NumberFormat, Filter, FilterOperator, Sorter, MessageBox) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.MiningView", {
        onInit() {
            this._getData();
        },

        onSortChange: function(oEvent) {
            let sKey = oEvent.getParameter("selectedItem").getKey();
            let bDescending = this.getView().byId("sortOrderToggle").getPressed();
            this._applySorter(sKey, bDescending);
        },

        onSortOrderChange: function(oEvent) {
            let bDescending = oEvent.getSource().getPressed();
            let sKey = this.getView().byId("sortSelect").getSelectedKey();
            this._applySorter(sKey, bDescending);
            oEvent.getSource().setText(bDescending ? "Descending" : "Ascending");
        },

        _applySorter: function(sKey, bDescending) {
            let oTable = this.getView().byId("idMiningTab");
            let oBinding = oTable.getBinding("items");
            if (oBinding) {
                let oSorter = new Sorter(sKey, bDescending);
                oBinding.sort(oSorter);
            }
        },

        onCreatePress: function() {
            var oRouter = this.getRouter();
            oRouter.navTo("RouteCreateView");
        },

        onDelete: function(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("MiningModel").getObject();
            MessageBox.confirm("Are you sure you want to delete?", {
                onClose: (choice) => {
                    if (choice === 'OK') {
                        // Call a function over here
                        this._onDeleteCall(oContext);
                    }
                }
            });
        },

        onEdit: function(oEvent) {
            // Get the selected item
            var oSelectedItem = oEvent.getSource().getParent();
            var oBindingContext = oSelectedItem.getBindingContext("MiningModel");

            // Get the index parameter from the binding context
            var sIndex = oBindingContext.getPath().split("/").pop();

            // Get the router instance
            var oRouter = this.getRouter();

            // Navigate to the updateView with the index parameter
            oRouter.navTo("RouteUpdateView", {
                indexUpdate: sIndex
            });
        },

        currencyFormatter: function(value, currencyCode) {
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            var result = oCurrencyFormat.format(value, currencyCode);
            return result;
        },

        _onDeleteCall: function(parm) {
            let LocId = parm.LocId;
            // LocId = LocId.toUpperCase();
            let oModel = this.getModel();

            let entity = `/Z9231_MIN_SPR_ETSet(LocId='${LocId}')`;
            oModel.remove(entity, {
                success: (response) => {
                    MessageBox.success("Record deleted", {
                        onClose: function() {
                            this.onInit();
                        }.bind(this)
                    });
                },
                error: (err) => {
                    MessageBox.error("Deletion failed", err);
                }
            });
        },

        onRowSelection: function(oEvent) {
            let oItem = oEvent.getParameter("listItem");
            let oContext = oItem.getBindingContextPath("MiningModel");
            let aItems = oContext.split("/");
            let index = aItems[aItems.length - 1];
            let oRouter = this.getRouter();
            oRouter.navTo("RouteDetailView", {
                indexDetail: index
            });
        },

        onSearch: function() {
            let aFilter = [];
            let sLocationId = this.getView().byId("Input1").getValue();
            let sLocationDesc = this.getView().byId("Input3").getValue();
            let sMinRes = this.getView().byId("Input4").getValue();
            let sNumDrills = this.getView().byId("Input5").getValue();
            let sTotCost = this.getView().byId("Input6").getValue();
            let sManDays = this.getView().byId("Input7").getValue();
            let sMinType = this.getView().byId("Input8").getValue();
            let sProbOut = this.getView().byId("Input9").getValue();
            let sMinCuky = this.getView().byId("Input10").getValue();

            if (sLocationId) {
                let filterName = new Filter("LocId", FilterOperator.Contains, sLocationId);
                aFilter.push(filterName);
            }
            if (sLocationDesc) {
                let filterName = new Filter("LocDesc", FilterOperator.Contains, sLocationDesc);
                aFilter.push(filterName);
            }
            if (sMinRes) {
                let filterName = new Filter("MinRes", FilterOperator.Contains, sMinRes);
                aFilter.push(filterName);
            }
            if (sNumDrills) {
                let filterName = new Filter("NumDrills", FilterOperator.Contains, sNumDrills);
                aFilter.push(filterName);
            }
            if (sTotCost) {
                let filterName = new Filter("TotCost", FilterOperator.Contains, sTotCost);
                aFilter.push(filterName);
            }
            if (sManDays) {
                let filterName = new Filter("ManDays", FilterOperator.Contains, sManDays);
                aFilter.push(filterName);
            }
            if (sMinType) {
                let filterName = new Filter("MinType", FilterOperator.Contains, sMinType);
                aFilter.push(filterName);
            }
            if (sProbOut) {
                let filterName = new Filter("ProbOut", FilterOperator.Contains, sProbOut);
                aFilter.push(filterName);
            }
            if (sMinCuky) {
                let filterName = new Filter("MinCuky", FilterOperator.Contains, sMinCuky);
                aFilter.push(filterName);
            }
            let oTable = this.getView().byId("idMiningTab");
            let bindingInfo = oTable.getBinding("items");
            if (bindingInfo) {
                bindingInfo.filter(aFilter);
            }
        }
    });
});

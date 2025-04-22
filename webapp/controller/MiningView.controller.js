sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
    
], (Controller,Filter,FilterOperator,MessageBox) => {
    "use strict";

    return Controller.extend("app.miningodata.controller.MiningView", {
        onInit() {
            this._getData()
        },
        onCreatePress:function(){
            var oRouter = this.getRouter()
            oRouter.navTo("RouteCreateView")
        },

        onDelete:function(oEvent){
            let oContext = oEvent.getSource().getBindingContext("MiningModel").getObject()
            MessageBox.confirm("are you sure you want to delete",{
                onClose:(choice)=>{
                    if(choice === 'OK'){
                        //call a function over here
                        this._onDeleteCall(oContext)
                    }
                }
            })
        },

        _onDeleteCall:function(parm){      
            let LocId = parm.LocId
            //LocId=LocId.toUpperCase()
            let oModel = this.getModel()
            
            let entity = `/Z9231_MIN_SPR_ETSet(LocId='${LocId}')`
            oModel.remove(entity,{
                success:(response)=>{
                    MessageBox.success("Record deleted",{
                        onClose:function(){
                            this.onInit();
                        }.bind(this)
                    })
                },
                error:(err)=>{
                    MessageBox.error("Deletion failed",err)
                }
            })
        },

        onRowSelection:function(oEvent){
            let oItem = oEvent.getParameter("listItem");
            let oContext = oItem.getBindingContextPath("MiningModel")
            let aItems = oContext.split("/");
            let index = aItems[aItems.length-1];
            let oRouter = this.getRouter();
            oRouter.navTo("RouteDetailView",{
                indexDetail:index
            })
        },
        onSearch:function(){
            let aFilter=[]
            let sLocationId=this.getView().byId("Input1").getValue()
            let sLocationDesc=this.getView().byId("Input2").getValue()
            if(sLocationId){
                let filterName=new Filter("LocId",FilterOperator.Contains,sLocationId)
                aFilter.push(filterName)
            }
            if(sLocationDesc){
                let filterName=new Filter("LocDesc",FilterOperator.Contains,sLocationDesc)
                aFilter.push(filterName)
            }
            let oTable=this.getView().byId("idMiningTab")
            let bindingInfo=oTable.getBinding("items")
            if(bindingInfo){
                bindingInfo.filter(aFilter);
            }
        }  
    });
});
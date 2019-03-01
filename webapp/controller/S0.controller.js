sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/SelectDialog",
	"sap/m/StandardListItem",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, SelectDialog, StandardListItem, JSONModel) {
	"use strict";

	return Controller.extend("ovly.popups.controller.S0", {
		onInit: function () {

			var aPlantas = [{
				id: "0001",
				nome: "São Paulo"
			}, {
				id: "0002",
				nome: "Rio"
			}, {
				id: "0003",
				nome: "Minas Gerais"
			}];

			var oPlantasModel = new JSONModel(aPlantas);
			this.getView().setModel(oPlantasModel, "plantas");

		},
		onSucesso: function (oEvent) {
			MessageBox.success("Ordem criada!");
		},
		onErro: function (oEvent) {
			MessageBox.error("Ordem não criada!", {
				title: "Falha de sistema",
				onClose: function (resposta) {
					debugger;
				}
			});
		},
		onConfirmar: function (oEvent) {
			/*			MessageBox.confirm("Está certo disto?", {
							title: "Falha de sistema",
							onClose: function (resposta) {
								debugger;
							}
						});*/

			MessageBox.show("Está certo disso?", {
				actions: [
					sap.m.MessageBox.Action.YES,
					sap.m.MessageBox.Action.NO
				],
				onClose: function (resposta) {
					debugger;
				}
			});
		},

		// onValueHelpRequest: function (oEvent) {
		// 	debugger;

		// 	var aItems = [
		// 		new StandardListItem({
		// 			title: "A"
		// 		}),
		// 		new StandardListItem({
		// 			title: "B"
		// 		})
		// 	]

		// 	var oSelectDialog = new SelectDialog({
		// 		noDataText: "Nenhum registro encontrado",
		// 		confirm: function (oEvent) {
		// 			console.log("item selecionado");
		// 		},
		// 		search: this.onSearch, //     <--------------
		// 		items: aItems
		// 	});

		// 	oSelectDialog.setTitle("Plantas");

		// 	oSelectDialog.open();

		// },

		onValueHelpRequest: function (oEvent) {
			//debugger;

			if (!this.oSelectDialog) {
				this.oSelectDialog = new SelectDialog({
					noDataText: "Nenhum registro encontrado",
					confirm: function (oEvent) {
						console.log("item selecionado");
					},
					search: this.onSearch, //     <--------------
					items: {
						path: "/",
						model: "plantas",
						template: new StandardListItem({
							title: {
								model: "plantas",
								path: "id"
							},
							description: {
								model: "plantas",
								path: "nome"
							}
						})
					}
				});

				this.oSelectDialog.setTitle("Plantas");
			}

			this.getView().addDependent(this.oSelectDialog);
			this.oSelectDialog.open();

		},

		onSearch: function (oEvent) {

		},

		onValueHelpRequestFragment: function (oEvent) {
			var oDialog = sap.ui.xmlfragment("ovly.popups.fragment.Plantas", this);
			this.getView().addDependent(oDialog);
			oDialog.open();
		}

	});

});
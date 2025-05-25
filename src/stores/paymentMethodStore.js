import api from "@/service/api";
import { defineStore } from "pinia";
export const usePaymentMethodStore = defineStore("PaymentMethod", {
  actions: {
    detailspaymentmethod(SelectedPaymentMethodId) {
      return api
        .post(`/paymentmethod/search/${SelectedPaymentMethodId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deletepaymentmethod(SelectedPaymentMethodId) {
      return api
        .post(`/paymentmethod/delete/${SelectedPaymentMethodId}`, {})
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    updatepaymentmethod([SelectedPaymentMethodId, MethodName]) {
      return api
        .post(`/paymentmethod/update/${SelectedPaymentMethodId}`, {
          Methods: MethodName,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createPaymentMethod(MethodName) {
      return api
        .post(`/paymentmethod/create`, {
          Methods: MethodName,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    allPaymentMethod() {
      return api
        .get("/paymentmethod/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});

import api from "@/service/api";
import { defineStore } from "pinia";
export const useResourceAllocationStore = defineStore("ResourceAllocation", {
  actions: {
    AllocateResource([SessionIds, ResorceId, Quantity, SingleCoast, Provider]) {
      const requests = SessionIds.map((SessionId) => {
        console.log(SessionId);
        return api
          .post("/resourceallocation/create", {
            Session_id: SessionId,
            Resource_id: ResorceId,
            Quantity: Quantity,
            Single_amount: SingleCoast,
            Provider: Provider,
          })
          .then((res) => res)
          .catch((err) => {
            console.log("Error", err);
            throw err;
          });
        co;
      });
      return Promise.all(requests);
    },

    allResourcesAllocate(TrainigId) {
      return api
        .post("/resourceallocation/allallocatedresource", { tid: TrainigId })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});

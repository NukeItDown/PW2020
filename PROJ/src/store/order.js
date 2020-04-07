export default {
    state:{
        order: {
            'orderNumber': 0,
            orderContend: [
                
            ]
        }
    },
    mutations: {
        addFood (state, data) {
            let elem = {};
            elem.type = data.type;
            elem.name = data.foodData.name;
            elem.cost = data.foodData.cost;
            elem.igred = data.foodData.igred

            elem.amount = 1;
            for(var arrEl in state.order.orderContend){
                if(state.order.orderContend[arrEl].name == elem.name){
                    var isSame = true
                    for(var el in state.order.orderContend[arrEl].igred){
                        if(elem.igred[el].count !== state.order.orderContend[arrEl].igred[el].count){
                            isSame = false;
                            break;
                        }
                    }
                    if(isSame){
                        state.order.orderContend[arrEl].amount += 1;
                        return;
                    }
                } 
            }
            state.order.orderContend.push(elem);
        },
        addAmountToOrd (state, data) {
            data.ref.amount += 1;
        },
        minusAmountToOrd (state, data) {
            if(data.ref.amount > 1){
                data.ref.amount -= 1;
            }
                
        },
        removeFood (state, data) {
            var removeIndex = state.order.orderContend.map(function(item) { return item.name; }).indexOf(data.ref.name);
            state.order.orderContend.splice(removeIndex, 1);
        },
        countUp(state,data){
            if(data.ref.count < data.ref.max){
                data.ref.count += 1;
            }
        },
        countDown(state,data){
            if(data.ref.count > 0){
                data.ref.count -= 1;
            }
        }
    },
    actions: {},
    getters: {
        showOrder(state){
            return state.order.orderContend
        },
        getTotalCost(state){
            let sum = 0;
            for(let elem in state.order.orderContend){
                sum += Number(state.order.orderContend[elem].cost) * Number(state.order.orderContend[elem].amount);
            }
            return sum;
        }
    }
}
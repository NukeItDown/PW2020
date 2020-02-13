let rang = 10;

let initMasiv = (n) => {
    let res = [];
    for(let count = 1; count<=n; count++){
        res.push(Math.ceil(count * Math.random() * 11));
    }

    return res;
};

let medArit = (arr) => {
    let sum = 0;

    for (el of arr){
        sum += el;
    };

    return sum/arr.length;
};

ourMasive = initMasiv(rang);

console.log(ourMasive);

let min = Math.min.apply(null, ourMasive),
    max = Math.max.apply(null, ourMasive);

console.log(min, max);
console.log(medArit(ourMasive));

let sortMasiv = (arr, dir) => {

    if(dir)
        arr.sort(function(a, b){return a-b});
    else
        arr.sort(function(a, b){return b-a});

};

sortMasiv(ourMasive,1);

console.log(ourMasive);

const k = 9;

let rotateL = (arr) => {

    let step = k%arr.length,
    cutArr = arr.slice(0,step),
    rest = arr.slice(step++,arr.length);

    return rest.concat(cutArr);

};

let newMasive = rotateL(ourMasive);

console.log(newMasive);

newMasive.splice(0,5);

console.log(newMasive);


let checkPrice = (arr) => {
    
    let aver = medArit(arr),
    count = 0;

    for (el of arr){
        if (el <= aver)
            count++;
    };

    return count;

};

console.log(checkPrice(ourMasive));

const promise1 = new Promise((resolve, reject) => {
    const number = -1;
    setTimeout(function () {
        if (number > 0.5) {
            resolve("success in promise 1");
        } else {
            reject("error in promise 1");
        }
    }, 5000);
});
const promise2 = new Promise((resolve, reject) => {
    const number = Math.random() +1.5;
    setTimeout(function () {
        if (number > 0.5) {
            resolve("success in promise 2");
        } else {
            reject("error in promise 2");
        }
    }, 3000);
});

const promise3 = new Promise((resolve, reject) => {
    const number = Math.random();
    setTimeout(function () {
        if (number > 0.5) {
            resolve("success in promise 3");
        } else {
            reject("error in promise 3");
        }
    }, 5000);
});


// promise1.then(function () {

// })
//     .catch(function () {

//     })
//     .finally(function () {

//     })

Promise.all([promise1, promise2, promise3]).
    then(function (value) {console.log(value);})
    .catch(function (error) {console.log(error);})
    .finally(function () {console.log("finallyyyyyyyy");});
    // chain promises .then().then().then() if the first then succeed then and so on


function resolveAfter2sec() {
    return new Promise(resolve => setTimeout(() => {
        resolve("Done in 1 second");
    }, 2000));
}
    

function resolveAfter1sec() {
    return new Promise(resolve => setTimeout(() => {
        resolve("Done in 1 second");
    }, 1000));
}

async function main() {
    const result1 = await resolveAfter2sec();
    console.log(result1);
    const result2 = resolveAfter2sec();
    console.log(result2);

}
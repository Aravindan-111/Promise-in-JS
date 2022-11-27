const doWork = (res, rej) => {
    setTimeout(() => { res("Hello World") }, 1000);
};

const someText = new Promise(doWork);

someText.then((val) => {
    console.log("1st log: " + val);
    return new Promise(doWork);
}).then((x) => {
    console.log(x);
})
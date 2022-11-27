const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executer) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  let catches = [];

  function resolve(result) {
    if(state !== PENDING) return;

    state = FULFILLED;
    value = result;

    handlers.forEach((h) => h(value));
  };

  function reject(err) {
    if(state !== PENDING) return;

    state = REJECTED;
    value = err;

    catches.forEach((c) => c(err));
  };

  this.then = function (callback) {
    if(state === FULFILLED) {
      // console.log("first")
      callback(value);
    } else {
      console.log("second")
      handlers.push(callback);
    };
  };

  executer(resolve, reject);

}

const doWork = (res, rej) => {
  setTimeout(() => { res("Hello World") }, 1000);
};

const someText = new CustomPromise(doWork);

someText.then((val) => {
  console.log("1st log: " + val);
});

someText.then((val) => {
  console.log("2st log: " + val);
});

setTimeout(() => {
  someText.then((val) => {
    console.log("3st log: " + val);
  })
}, 3000);

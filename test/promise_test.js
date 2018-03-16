// PromiseオブジェクトはPromiseコンストラクタで生成する
// Promiseコンストラクタは１つのCB関数(以下callback())を引数に取る
// callback()はさらに２つのCB関数(以下、resolve()、reject())を引数にとる。
const promise = new Promise((resolve, reject) => {
  if ('処理が成功') {
    // Promiseコンストラクタの中でresolve()を呼び出すことで
    // promiseの状態がfullfiledになる
    // resolve()の引数はthen()の引数のCB関数の引数として与えられる
    resolve(1);
  } else {
    // Promiseコンストラクタの中でreject()を呼び出すことで
    // promiseの状態がrejectedになる
    // reject()の引数はthen()の引数のCB関数の引数として与えられる
    // rect()の引数には通常、Errorオブジェクトを渡す
    reject(new Error('error'));
  }
});

// promise.then()関数は
// ２つのCB関数(以下onfullfilled()、onrejected())を引数にとり、
// promiseを返り値として返す
// promiseの状態がfullfiledならonfullfilled()が実行され
// rejectedならonrejected()が実行される
// onfullfilled()は１つの引数をとり、それはresolve()関数からresolve()関数の引数が渡される
// onrejected()は１つの引数をとり、それはreject()関数からreject()関数の引数が渡される
// onrejected()は省略することができる
promise.then((value) => {
  console.log(value);  // 1
}, (error) => {
  console.error("error:", error.message);
});

// promiseの状態がfullfilled（エラーが起こっていない）なら
// 第一引数(通常resolve())が実行される
// 第二引数(通常reject())を省略している
new Promise((resolve) => {
  // resolve()の引数はそのまま次のthen()の引数に渡される
  resolve(2);
}).then((value) => {
  // 新しいpromiseを作成する
  // 状態はfullfilledなのでresolve()が実行される
  new Promise((resolve) => {
    // resolve()の引数はそのまま次のthen()の引数に渡される
    resolve(value * 3);
  }).then((value) => {
    // 新しいpromiseを作成する
    // 状態はfullfilledなのでresolve()が実行される
    new Promise((resolve) => {
      // resolve()の引数はそのまま次のthen()の引数に渡される
      resolve(value * 4);
    }).then((value) => {
      console.log(value);
    });
  });
});

// then()関数でもpromiseを返すので
// ネストさせずに書くことができる
// promiseを作成する
new Promise((resolve) => {
  // resolve()の引数はそのまま次のthen()に渡される
  resolve(2);
}).then((value) => {
  // onfullfilled()のなかで新たなpromiseを返すと
  // そのままthen()の返り値となるようだ
  return new Promise((resolve) => {
    resolve(value * 3);
  });
}).then((value) => {
  // onfullfilled()のなかで新たなpromiseを返すと
  // そのままthen()の返り値となるようだ
  return new Promise((resolve) => {
    resolve(value * 4);
  });
}).then((value) => {
  console.log(value);
})

// new Promise((resolve) => {
//   console.info(resolve(1));
//   return resolve(1);
// //  return resolve(2);
// }).then((v1) => { // v1 は 2
//   new Promise((resolve) => {
//     resolve(v1 * 3);
//   }).then((v2) => { // v2 は 6
//     new Promise((resolve) => {
//       resolve(v2 * 4);
//     }).then((v3) => { // v3 は 24
//       console.log(v3); // 24 が出力される
//     });
//   });
// });
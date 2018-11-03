const BotToken = artifacts.require("bottoken");
const Deposit = artifacts.require("Deposit");
const err =require('./exceptions');

var botAccount = ['0x12345000000000000000000000000000','0x123456','0x1234567','0x12345678']

var i = {
  '_name'    : 'botToken',
  '_icon'    :'somefile.jpg',
  '_decimals':'0',
  '_owner'   : botAccount[0],
  '_initialSupply' : 100000
}

contract('BotCoin test', async (accounts) => {
  it("should init w/ 10000 BotToken in the first account(test only, no premine)", async () => {
     let instance = await BotToken.deployed();
     let balance = await instance.balances.call(i._owner);
     assert.equal(balance.valueOf(), i._initialSupply);
  })

  it("should init locked", async () => {
    let instance = await BotToken.deployed();
    let isLocked = await instance.locked.call();
    assert.equal(isLocked.valueOf(), true);
  });

  it("should not send coin while locked", async () => {
    // Get initial balances of first and second account.
    let account_one = accounts[0];
    let account_two = accounts[1];

    let amount = 1000;

    let instance = await BotToken.deployed();

    let balance = await instance.balances.call(botAccount[0]);
    let account_one_starting_balance = balance.toNumber();

    balance = await instance.balances.call(botAccount[1]);
    let account_two_starting_balance = balance.toNumber();
    await err.tryCatch(instance.transfer(
      botAccount[0],
      botAccount[1],
      amount,
      {from: account_one})
     , err.errTypes.revert);

    balance = await instance.balances.call(botAccount[0]);
    let account_one_ending_balance = balance.toNumber();

    balance = await instance.balances.call(botAccount[1]);
    let account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance, "Amount was taken from the sender and should not have been");
    assert.equal(account_two_ending_balance, account_two_starting_balance, "Amount was sent to the receiver and should not have been");
  });

  it("only owner should be able to unlock and lock", async () => {
    let instance = await BotToken.deployed();
    let isLocked = await instance.locked.call();
    assert.equal(isLocked.valueOf(), true);

    let account_one = accounts[0];
    let account_two = accounts[1];

    //account 1 shouldnt be able to unlock
    await err.tryCatch(instance.unlock({from: account_two}), err.errTypes.revert);
    let strangerLockedOut = await instance.locked.call();
    assert.equal(strangerLockedOut.valueOf(), true);

    //account 0 should be able to unlock
    instance.unlock({from: account_one});
    let ownerLockedOut = await instance.locked.call();
    assert.equal(ownerLockedOut.valueOf(), false);

    //account 1 shouldnt be able to lock
    await err.tryCatch(instance.lock({from: account_two}), err.errTypes.revert);
    let strangerCanLock = await instance.locked.call();
    assert.equal(strangerCanLock.valueOf(), false);

    //account 0 should be able to lock
    instance.lock({from: account_one});
    let ownerCanLock = await instance.locked.call();
    assert.equal(ownerCanLock.valueOf(), true);

  });

it("should not let a stranger send coins when unlocked", async () => {
    // Get initial balances of first and second account.

  let account_one = accounts[0];
  let account_two = accounts[1];

  let amount = 1000;

  let instance = await BotToken.deployed();

  await instance.unlock({from: account_one});
  let ownerLockedOut = await instance.locked.call();
  assert.equal(ownerLockedOut.valueOf(), false);

  let balance = await instance.balances.call(botAccount[0]);
  let account_one_starting_balance = balance.toNumber();

  balance = await instance.balances.call(botAccount[1]);
  let account_two_starting_balance = balance.toNumber();
  await err.tryCatch(instance.transfer(
    botAccount[0],
    botAccount[1],
    amount,
    {from: account_two})
   , err.errTypes.revert);

  balance = await instance.balances.call(botAccount[0]);
  let account_one_ending_balance = balance.toNumber();

  balance = await instance.balances.call(botAccount[1]);
  let account_two_ending_balance = balance.toNumber();

  assert.equal(account_one_ending_balance, account_one_starting_balance, "Amount was taken from the sender and should not have been");
  assert.equal(account_two_ending_balance, account_two_starting_balance, "Amount was sent to the receiver and should not have been");

});

  it("should send coin correctly", async () => {
    // Get initial balances of first and second account.

      let account_one = accounts[0];

      let amount = 100;

      let instance = await BotToken.deployed();
      //unlock for next tests
      await instance.unlock({from: account_one});

      let balance = await instance.balances.call(botAccount[0]);
      let account_one_starting_balance = balance.toNumber();
      balance = await instance.balances.call(botAccount[1]);
      let account_two_starting_balance = balance.toNumber();

      await instance.transfer(
        botAccount[0],
        botAccount[1],
        amount,
        {from: account_one});

      balance = await instance.balances.call(botAccount[0]);
      let account_one_ending_balance = balance.toNumber();

      balance = await instance.balances.call(botAccount[1]);
      let account_two_ending_balance = balance.toNumber();


    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });

  it("should take a whole number deposit", async () => {
    // Get initial balances of first and second account.

      let account_one = accounts[0];
      let amount = 5;

      let instance = await BotToken.deployed();
      await instance.unlock({from: account_one});

      let balance = await instance.balances.call(botAccount[2]);
      let account_three_starting_balance = balance.toNumber();
      assert.equal(account_three_starting_balance, 0,"account 3 balance was non-zero");

     //should fail
      await err.tryCatch(instance.deposit(
        0x0,
        {from: account_one,
        value: web3.toWei(amount, "ether")})
       , err.errTypes.revert);

       await err.tryCatch(instance.deposit(
         botAccount[2],
         {from: account_one,
         value: 1050000000000000000})
        , err.errTypes.revert);

       let ownerLockedOut = await instance.locked.call();
       assert.equal(ownerLockedOut.valueOf(), false);

       await instance.deposit(
         botAccount[2],
         {from: account_one,
         value: web3.toWei(amount, "ether")})

      balance = await instance.balances.call(botAccount[2]);
      let account_three_ending_balance = balance.toNumber();

      assert.equal(account_three_ending_balance, amount * 100, "Amount wasn't correctly sent to the receiver");
  });
  it("should not give tokens for free", async () => {
    // Get initial balances of first and second account.

      let account_one = accounts[0];
      let amount = 0;

      let instance = await BotToken.deployed();
      await instance.unlock({from: account_one});

      let balance = await instance.balances.call(botAccount[2]);
      let account_three_starting_balance = balance.toNumber();

     //should fail
      await err.tryCatch(instance.deposit(
        botAccount[2],
        {from: account_one,
        value: web3.toWei(amount, "ether")})
       , err.errTypes.revert);

       balance = await instance.balances.call(botAccount[2]);
       let account_three_final_balance = balance.toNumber();

      assert.equal(account_three_starting_balance, account_three_final_balance ,"account 3 balance was right");

  });
  it("should allow users to withdraw their balance", async () => {
    let account_one = accounts[0];
    let amount = 0;

    let instance = await BotToken.deployed();
    await instance.unlock({from: account_one});

    //bot account 3 should have a balance
    let balance = await instance.balances.call(botAccount[2]);
    let account_three_starting_balance = balance.toNumber();
    assert.isAbove(account_three_starting_balance, 0,"account 3 balance was non-zero");

    //shoud not allow withdraw of more than they have
    let bal = await web3.eth.getBalance(accounts[5]);
    let account_five_bal = bal.toNumber();
    await err.tryCatch(instance.withdraw(
        botAccount[2],
        account_three_starting_balance*2,
        accounts[5],
        {from: account_one})
       , err.errTypes.revert);
     balafter = await web3.eth.getBalance(accounts[5]);
     let account_five_bal_after = balafter.toNumber();
     assert.equal(account_five_bal, account_five_bal_after, 'account 5 was not the same before and after');
     balance = await instance.balances.call(botAccount[2]);
     account_three_after_balance = balance.toNumber();
     assert.equal(account_three_after_balance,account_three_starting_balance, 'the on chain balance changed when it should have failed');

   //shoud allow withdraw lessthan they have
   //before
   //get account ether balance
   bal = await web3.eth.getBalance(accounts[5]);
   account_five_bal = bal.toNumber();

    //getbot balance
   balance = await instance.balances.call(botAccount[2]);
   account_three_starting_balance = balance.toNumber();

   instance.withdraw(
       botAccount[2],
       account_three_starting_balance/2,
       accounts[5],
       {from: account_one});

//after
  //check account balance
   balafter = await web3.eth.getBalance(accounts[5]);
   account_five_bal_after = balafter.toNumber();
   assert.equal(account_five_bal-(account_three_starting_balance/2), account_five_bal_after, 'account 5 was the same before and after withdrawl');

   //check bot balance
   balance = await instance.balances.call(botAccount[2]);
   account_three_final_balance = balance.toNumber();
   assert.equal(account_three_starting_balance-(account_three_starting_balance/2), account_three_final_balance, 'bot account 3 was the same before and after withdrawl');


  });

  it("should allow the owner to add more owners", async () => {
    // Get initial balances of first and second account.

      let account_one = accounts[0];
      let account_two = accounts[2];


      let instance = await BotToken.deployed();

      //account_two shouldnt be an owner
      let result = await instance.owners.call(account_two);
      assert.equal(result, false, 'account two was already an owner');

      //account_two shouldnt be able to add self to owners

      await err.tryCatch(instance.deposit(
        account_two,
        {from: account_two})
       , err.errTypes.revert);

//account_one should be able to add account two to owners
      await instance.addOwner(
        account_two,
        {from: account_one});

      result = await instance.owners.call(account_two);
      assert.equal(result, true, 'account two did not become an owner');

    //owners should be able to rm accounts from owners
      await instance.rmOwner(
        account_two,
        {from: account_one});

      result = await instance.owners.call(account_two);
      assert.equal(result, false, 'account two wasnt removed');
  });

it("should allow users to create a deposit account that adds to their balance", async () => {
  let account_one = accounts[0];
  let account_two = accounts[1];

  let instance = await BotToken.deployed();
  await instance.unlock({from: account_one});
//check bot 3 balances should be zero

  let balance = await instance.balances.call(botAccount[3]);
  let account_four_starting_balance = balance.toNumber();
  assert.equal(account_four_starting_balance, 0,"account 4 balance was non-zero");

//deploy a contract get its address
  let newContract = await instance.newDeposit(botAccount[3],
    {from: account_one});
  let log = newContract.logs[0];
  let depositAddress = log.args.newAddress;

  var remote = await Deposit.at(depositAddress);

  await remote.sendTransaction({
    from: account_one,
   value: web3.toWei("5", "ether")
 });

//balafter transfer should be 500 more
 balance = await instance.balances.call(botAccount[3]);
 let account_four_final_balance = balance.toNumber();
 assert.equal(account_four_final_balance, account_four_starting_balance+500,"account 4 balance did not increase");

});

})

# Bridgette

Bridgette is designed to bridge Ethereum classic discord to a live node.

# Auth Tokens

update `auth.json` with your app specific tokens


## Functions
---

### getBlockNumber
This property is read only and returns the current block number.
#### Format
`!getBlockNumber`

### getBalance
Get the balance of an address at the current block.\
#### Format
`!getBalance 0x123456789`

### getTransaction
Returns a transaction matching the given transaction hash.
#### Format
`!getTransaction 0x1234567`


### sendRawTransaction
Sends an already signed transaction.
#### Format
`!sendRawTransaction 0x123456789`

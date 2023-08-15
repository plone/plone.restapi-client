# Transactions

The `@transactions` endpoint exposes transactions that have been made through the Plone website.
Each change through the Plone website is listed.
It also allows to revert transactions so that the Plone website can be reverted to a previous state.

## Get Transactions

This function returns the list of all transactions in the portal.

- Function name: getTransactionsQuery

## Revert Transactions

This function can be used to revert transactions for the given transaction ids in the portal.

- Function name: revertTransactionsMutation

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    - **transactionIds**: string[]

      - **Required**: Yes

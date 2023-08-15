# Email Send

To send an email to an arbitrary email address use the /@email-send endpoint.

## Send Email

This function sends an email to an arbitrary email address.

- Function name: `emailSendMutation`

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `name: string`

    - **Required:** Yes

    `from: string`

    - **Required:** Yes

    `to: string`

    - **Required:** Yes

    `subject: string`

    - **Required:** Yes

    `message: string`

    - **Required:** Yes

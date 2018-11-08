export const messageTypes = {
  user: {
    ISSUE: 'issueToken',
    CONFIRM: 'confirm',
    CANCEL: 'user_cancel',
  },
  shop: {
    PROVE_TOKEN: 'prove_token',
  },
  deliver: {
    INIT_REQUEST: 'init_request',
    GENERATE_PASS: 'generate_pass',
    PASS_REQUEST: 'pass_request',
    LEAVE_ROOM: 'leave_room'
  },
  //ISSUE: 'issueToken',
  ISSUE_WAIT: 'issueToken_wait',
  TRANSFER_SHOP: 'transfer_token',
  PROVE_TOKEN_WAIT: 'prove_token_wait',
  //PROVE_TOKEN: 'prove_token'
  TRANSFER_DELIVER_WAIT: 'transfer_deliver_wait',
  TRANSFER_DELIVER_FINISH: 'transfer_deliver_finish',

  GENERATE_PASS_WAITING: 'generate_pass_waiting',
  GENERATE_PASS_FINISHED: 'generate_pass_finished',

  PASS_WAITING: 'pass_waiting',
  PASS_FINISHED: 'pass_success',

  ADD_HASH_START: 'add_hash_start',
  ADD_HASH_FINISHED: 'confirm_finished',
  TOKEN_DESTROYED: 'token_destroyed',
}

export const address = '192.168.178.22'
export const port = '1337'

export const listKey = 'receiveList'
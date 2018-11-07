import _ from 'lodash'

const receiverType = {
  SHOP: 'shop',
  USER: 'user',
}

const mode = {
  USER: 'user',
  DELIVER: 'deliver',
}

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

export const messageRouter = (setState, ws, rawMessage) => {
  const sendMessage = message => ws.send(JSON.stringify(message));
  const message = JSON.parse(rawMessage.data)
  // console.log('message is', message)
  // if(!_.includes(message.receiver, mode)) return;
  switch (message.type) {
    case messageTypes.deliver.INIT_REQUEST:
      setState({
        started: true,
        message: 'Your Deliver is sent',
        displayImage: true,
        showAction: true,
        actionYesText: 'Issue Token',
        actionNoText: 'Reject',
        actionYes: () => sendMessage({
          type: messageTypes.user.ISSUE,
        }),
        actionNo: ()=> sendMessage({
          type: messageTypes.user.CANCEL,
        })
      });
      break;
    case messageTypes.ISSUE_WAIT:
      setState({
        message: 'Generating the non fungible token...',
        displayImage: true,
        showAction: false,
        deliverMessage: 'Now user issuing the token...',
      })
      break;
    case messageTypes.TRANSFER_SHOP:
      setState({
        message: 'Generate success, now sending it to data center',
        deliverMessage: 'Generate success, now sending it to data center',
      })
      break;
    case messageTypes.PROVE_TOKEN_WAIT:
      setState({
        message: 'Transfer success, now waiting for prove from data center',
        deliverMessage: 'Transfer success, now waiting for prove from data center',
      })
      break;
    case messageTypes.TRANSFER_DELIVER_WAIT:
      setState({
        message: 'Prove success, now sending the token to deliver',
        deliverMessage: 'Prove success, now waiting for the access token'
      })
      break;
    case messageTypes.TRANSFER_DELIVER_FINISH:
      setState({
        message: 'Token successfully transferred to deliver',
        deliverMessage: 'Receive the token',
        onDeliverAction: ()=> {
          sendMessage({type:messageTypes.deliver.GENERATE_PASS})
          setState({
            showDeliverAction: false,
          })},
        deliverActionText: "Generate Pass",
        showDeliverAction: true,
      })
      break;
    case messageTypes.GENERATE_PASS_WAITING:
      setState({
        message: 'Deliver request to generate access Pass...',
        deliverMessage: 'Generating access pass now...',
      })
      break;
    case messageTypes.GENERATE_PASS_FINISHED:
      setState({
        message: 'Access Pass successfully generated for deliver, waiting for opening the door',
        deliverMessage: 'Access Pass successfully generated',
      })
      break;
    // case messageTypes.PASS_WAITING:
    //   setState({
    //     message: 'Waiting for the deliver to open the door'
    //   })
    //   break;
    case messageTypes.PASS_FINISHED:
      setState({
        message: 'Successful entering the room',
        deliverMessage: 'successful entering the room',
        showAction: true,
        actionYesText: 'Open the video',
        actionNoText: 'Report malice',
        actionYes: () => setState({
          displayVideo: true,
        }),
        actionNo: ()=> setState({
          displayVideo: false,
        })
      })
      break;
    case messageTypes.ADD_HASH_START:
      setState({
        message: 'Video data is adding to the blockchain...',
        deliverMessage: 'Video data is adding to the blockchain...',
        displayImage: false,
        displayVideo: false,
        showAction: false,
      })
      break;
    case messageTypes.ADD_HASH_FINISHED:
      setState({
        message: 'Video data has been recorded on blockchain with Hash' + message.hash,
        deliverMessage: 'Video data has been recorded on blockchain with Hash' + message.hash,
        displayImage: false,
        displayVideo: false,
        showAction: false,
      })
      break;
    case messageTypes.TOKEN_DESTROYED:
      setState({
        message: 'Token successfully destroyed!',
        deliverMessage: 'Delivery task successfully finished!',
      })
  }
}
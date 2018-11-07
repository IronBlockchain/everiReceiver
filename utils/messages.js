import _ from 'lodash'
import {setData} from './data'
import {messageTypes} from "../config";

const receiverType = {
  SHOP: 'shop',
  USER: 'user',
}

const mode = {
  USER: 'user',
  DELIVER: 'deliver',
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
        message: 'Your package is just arrived at the door',
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
        progress:0.2,
      })
      break;
    case messageTypes.PROVE_TOKEN_WAIT:
      setState({
        message: 'Transfer success, now waiting for prove from data center',
        deliverMessage: 'Transfer success, now waiting for prove from data center',
        progress:0.3,
      })
      break;
    case messageTypes.TRANSFER_DELIVER_WAIT:
      setState({
        message: 'Prove success, now sending the token to deliver',
        deliverMessage: 'Prove success, now waiting for the access token',
        progress:0.4,
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
        progress: 0.5,
      })
      break;
    case messageTypes.GENERATE_PASS_WAITING:
      setState({
        message: 'Deliver request to generate access Pass...',
        deliverMessage: 'Generating access pass now...',
        progress: 0.6,
      })
      break;
    case messageTypes.GENERATE_PASS_FINISHED:
      setState({
        message: 'Access Pass successfully generated for deliver, waiting for opening the door',
        deliverMessage: 'Access Pass successfully generated! Now you can use pass',
        progress: 0.6,
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
        }),
        progress: 0.7,
      })
      break;
    case messageTypes.ADD_HASH_START:
      setState({
        message: 'Video data is adding to the blockchain...',
        deliverMessage: 'Video data is adding to the blockchain...',
        displayImage: false,
        displayVideo: false,
        showAction: false,
        progress: 0.8,
      })
      break;
    case messageTypes.ADD_HASH_FINISHED:
      setState({
        message: 'Video data has been recorded on blockchain with Hash' + message.hash,
        deliverMessage: 'Video data has been recorded on blockchain with Hash' + message.hash,
        displayImage: false,
        displayVideo: false,
        showAction: false,
        progress: 0.9,
      })
      break;
    case messageTypes.TOKEN_DESTROYED:
      setState({
        message: 'Token successfully destroyed!',
        deliverMessage: 'Delivery task successfully finished!',
        progress: 1,
      })
  }
}
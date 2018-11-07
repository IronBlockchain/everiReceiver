import _ from 'lodash'

const itemList = [
  {
    key:"1",
    title: 'Wiper blade',
    subTitle: 'Bosch 3397118986 Wischblatt',
    describe: 'Aerotwin Nachrüstungsset AR532S',
    subDescribe:'Länge: 530/500',
    price: '29.34',
    image: require('../assets/images/1.jpg'),
  },
  {
    key:"2",
    title: 'Lamp',
    subTitle: 'Philips 12972XV+S2(Verpackung)',
    describe: ' X-tremeVision +130%',
    subDescribe:'Scheinwerferlampe H7 Set',
    price: '29.10',
    image: require('../assets/images/2.jpg'),
  },
  {
    key:"3",
    title: 'Navigation',
    subTitle: 'AWESAFE Navigationsgerät ',
    describe: ' 7 Zoll Touchsreen 8GB/256M',
    subDescribe:'mit Lebenslang Karten',
    price: '79.32',
    image: require('../assets/images/3.jpg'),
  },
  {
    key:"4",
    title: 'Cook machine',
    subTitle: 'Heißgetränkeautomat mit Auslaufhahn',
    describe: 'für 14 1-Liter-Rundrandgläser',
    subDescribe:'white & black',
    price: '69.99',
    image: require('../assets/images/4.jpg'),
  }
]

const tokenInfo = { domain: 'wohnheimEveriDeliver',
  tokenName: 'AccessToken-Hanwen-201811132024',
  owner: [ 'EVT00000000000000000000000000000000000000000000000000' ],
  transactions: {
    issueToken: '2bf3d2f9bfdca21a10a0bf2bce1ba530e2d75b2f38d728bab9016a781bb8d044',
    transferToken1: '5881519210d6844a70fd1d2d03ff5b4a3197cbfa0e6db63b3208a6b0095765be',
    transferToken2: '25ec2c1f43f083e8cfca3c7ab11775fc286e6b3fc603904584d78dd6c6cd3bb2',
    everiPass: '281aa05c656b2159c36049070084f559c25754b9c060d5d577e053619e2a6445',
    destroyToken: '0457e5c41a13b11f758850602c89704325da3a72b749c1190a12abbbae235e69',
  },
  metas:
    [ { key: 'Taobao',
      value: 'access token validated',
      creator: '[A] EVT79RtRtLRjpSKxMam2VYEYTN21E5Qv6Fb8CJvL5soDsaLQmBxzr' },
      { key: 'user',
        value: 'delivery confirmed',
        creator: '[A] EVT7JsQF7EzgNQuXnZ9SyoJViYbjnQHN7jK31P9RmWs37UWAfnJFR' },
      { key: 'videoHash',
        value: '1b2855c34b31e5f40854452562e04eeaf242e1d146de46965f2fd6c278e3b9dc',
        creator: '[A] EVT7JsQF7EzgNQuXnZ9SyoJViYbjnQHN7jK31P9RmWs37UWAfnJFR' } ] }

export const history = _.map(itemList, (item) => ({
  key: item.key,
  value: _.merge(_.omit(item, ['key', 'image']), tokenInfo)
}))

export const findImage = (key) => {
  return _.find(itemList, {key}).image;
}
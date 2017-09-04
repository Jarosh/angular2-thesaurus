module.exports = {
  arg: {
    port: 3000,
    akey: 'qwerty'
  },
  api: 'https://wordsapiv1.p.mashape.com',
  cors: {
    origin: '*',
    methods: 'OPTIONS, GET',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, X-Mashape-Key'
  },
  dirs: {
    cache: 'cache'
  },
  mocked: [
    'example',
    'work'
  ]
};

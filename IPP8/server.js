const PROTO_PATH = "./app.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/practice8", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db is connected")});

const SubscriberModel = mongoose.model('Subscriber', {
  id: String,
  username: String,
  password: String
});
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const phonebookProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(phonebookProto.SubscriberService.service, {
  getAll: (_, callback) => {
    SubscriberModel.find({}).then((subscribers, error) => {
        callback(null, { subscribers });
    });
  },
  get: (call, callback) => {
    const subscriber = SubscriberModel.findById(call.request.id);
    if (subscriber) {
      callback(null, subscriber);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Не найдено"
      });
    }
  },
  insert: (call, callback) => {
    const subscriber = new SubscriberModel({
      username: call.request.username,
      password: call.request.password
    });
    subscriber.save();
    callback(null, subscriber);
  },
  update: (call, callback) => {
    console.log(call.request);
    const { _id, olderPassword, username, password } = call.request;
    console.log(_id);

    SubscriberModel.findOne({ _id: _id })
    .then((existingSubscriber) => {
      if (!existingSubscriber) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Не найдено"
        });
      }

      if (existingSubscriber.password !== olderPassword) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Пароль не совпадает"
        });
      }

      existingSubscriber.username = username;
      existingSubscriber.password = password;

      return existingSubscriber.save();
    })
    .then((updatedSubscriber) => {
      callback(null, updatedSubscriber);
    })
    .catch((error) => {
      callback(error, null);
    });
  },
  remove: (call, callback) => {
    const { _id, olderPassword } = call.request;
    SubscriberModel.findOne({ _id: _id }).then((existingSubscriber) => {
      if (!existingSubscriber) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Не найдено"
        });
      } else if (existingSubscriber.password !== olderPassword) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Пароль не совпадает"
        });
      } else {
        SubscriberModel.deleteOne({ _id: _id }).then(()=>{callback(null, {});});
      }
    });
  },
  hello: (call, callback) => {
    SubscriberModel.findOne({ username: call.request.username })
      .then((existingSubscriber) => {
        if (!existingSubscriber) {
          return callback({
            code: grpc.status.NOT_FOUND,
            details: "Пользователь не найден"
          });
        }
  
        if (existingSubscriber.password !== call.request.password) {
          return callback({
            code: grpc.status.NOT_FOUND,
            details: "Пароль не совпадает"
          });
        }
  
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Привет " + call.request.username
        });
      })
      .catch((error) => {
        callback(error, null);
      });
  },

});
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:50051");
  server.start();
});
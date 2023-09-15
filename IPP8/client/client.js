const PROTO_PATH = "../app.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
  });


const SubscriberService = grpc.loadPackageDefinition(packageDefinition).SubscriberService;
const client = new SubscriberService(
    "localhost:50051",
    grpc.credentials.createInsecure()
)

module.exports = client;
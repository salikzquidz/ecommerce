import mongoose from "mongoose";
const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  // console.log(mongoose.connections[0].states); // 0 - disconnected , 1 - connected, 2 - connecting, 3 - disconnecting, 99 - uninitialized
  // console.log(mongoose.connections.length);

  console.log("connecting to " + mongoose.connections[0].client.s.url);
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    switch (connection.isConnected) {
      case 0:
        console.log("0 ready state - disconnected");
        break;
      case 1:
        console.log("1 ready state - connected");
        break;
      case 2:
        console.log("2 ready state - connecting");
        break;
      case 3:
        console.log("3 ready state - disconnecting");
        break;
      case 99:
        console.log("99 ready state - uninitialized");
        break;
      default:
        break;
    }
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // await mongoose.disconnect();
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };

export default db;

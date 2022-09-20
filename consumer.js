const { Kafka } = require("kafkajs");

// if I run this script 1 time:
// our consumer will recieve from 2 partitions

// if I run it 2 time from separate terminals
// each one of the consumers will recieve from each partitions

// we can't connect 3 consumers (who belongs to same group) to 2 partitions

const consume = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myTestApp",
      brokers: ["localhost:9092"]
    });

    //
    const consumer = kafka.consumer({
      groupId: "test" // multiple consumers can belong to same group
    });


    console.log("Connecting......");
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: "test-user",
      fromBeginning: true
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved MSG ${result.message.value} on partition ${result.partition}`
        );
      }
    });

    // don't disconnect or exit
    // await consumer.disconnect();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

consume();

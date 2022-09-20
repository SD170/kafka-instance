const { Kafka } = require("kafkajs");
const msg = process.argv[2];

const produce = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myTestApp",
      brokers: ["localhost:9092"]
    });

    const producer = kafka.producer();
    console.log("Connecting......");
    await producer.connect();
    console.log("Connected!");

    // produce a msg
    const res = await producer.send({
      topic: "test-user",
      messages: [
        {
          value: msg,
          partition: getPartition(msg)
        }
      ]
    });

    console.log("Message successfully: ",res);

    await producer.disconnect();
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    process.exit(0);
  }
};

const getPartition = (msg) => {
  const partition = msg <= "m" ? 0 : 1;

  return partition;
};

produce();

const {Kafka} = require('kafkajs');




const createTopic = async () => {
    try {
        const kafka = new Kafka({
            "clientId":"myTestApp",
            "brokers":["localhost:9092"]
        })

        const admin = kafka.admin();
        console.log("Connecting......");
        await admin.connect();
        console.log("Connected!");

        // creating a topic
        await admin.createTopics({
            "topics":[
                {
                    "topic":"test-user",
                    "numPartitions":2   // number of partitions we want
                }
            ]
        });

        console.log("Topic created successfully");

        await admin.disconnect();

    } catch (err) {
        console.log(`Error: ${err}`);
    }finally{
        process.exit(0);
    }
}


createTopic();
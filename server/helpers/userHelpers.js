

export default {
    registerUser : (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // let { password } = data
                // console.log(data, "db function");
                // const db = await getMongoDbConnection();
                // const collection = db.collection(COLLECTION.admin);
                // const checkAdmin = await collection.findOne();
                // if (checkAdmin) {
                //     return reject({ message: "Admin already exists" });
                // } else {
                //     data.password = await bcrypt.hash(password, 10)
                //     const response = await collection.insertOne(data);
                //     if (response.acknowledged) return resolve(response)
                //     return reject({ message: "Admin Data Insertion Failed" });
                // }
            } catch (error) {
                reject(error);
            }
        });
    }
}
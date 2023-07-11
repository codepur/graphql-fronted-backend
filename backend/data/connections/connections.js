import 'dotenv/config'
import mongoose from 'mongoose';

const uri = process.env.db_connection_string
const main = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};

main()
    .then(console.log('🎉 connected to database successfully'))
    .catch(error => console.error(error));

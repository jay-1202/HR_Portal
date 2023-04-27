const mongoose=require('mongoose')
// const url='mongodb+srv://Swasti87:Swasti87@cluster0.buy3hvx.mongodb.net/?retryWrites=true&w=majority'
const url='mongodb+srv://jaychaudhari10126:jay1202@test.ze8rm8a.mongodb.net/?retryWrites=true&w=majority'
const mongooseconnect=async()=>{
    await mongoose.connect(url)
    console.log('mongoose connected')
}

module.exports = mongooseconnect;
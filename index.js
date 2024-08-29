const {MongoClient}=require('mongodb')
const Express=require('express')
const port=3000
var app=Express()
async function main(){
    const uri = "mongodb+srv://mike:michael1234@cluster0.wbmys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client= new MongoClient(uri)
    await client.connect()
    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
app.get('',(req,res)=>{
    main()
})

app.listen(port,()=>{
    console.log("App is running on http://localhost"+port)
})
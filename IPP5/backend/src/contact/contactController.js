let contactService = require("./contactService"); 


let getDataControllerfn = async (req, res) => {
    let details = await contactService.getDataFromDBService();
    res.send({"status":true, "data": details});
}

let createContactControllerfn = async (req, res) => {
    let status = await contactService.createContactDBService(req.body);
    if (status){
        res.send({"status":true, "message": "Contact created succesfully"});
    }else{
        res.send({"status": false, "message": "Error creating contact"});
    }
}


let updateContactController = async (req, res) => {
    let result = await contactService.updateContactDBService(req.params.id, req.body);

    if (result){
        res.send({"status":true, "message": "Updated"});
    }else{
        res.send({"status": false, "message": "Updating failed"});
    }
}

let deleteContactController = async (req, res) => {
    let result = await contactService.deleteContactDBService(req.params.id);

    if (result){
        res.send({"status":true, "message": "Deleted"});
    }else{
        res.send({"status": false, "message": "Deleting failed"});
    }
}
module.exports = {getDataControllerfn, createContactControllerfn, updateContactController, deleteContactController };
let contactModel = require('./contactModel');


module.exports.getDataFromDBService = () => {
    return new Promise(function myFn(resolve, reject){
        contactModel.find({}).then((result, error) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.createContactDBService = (contactDetails) => {
    return new Promise(function myFn(resolve, reject){
        let conctactModelData = new contactModel();
        conctactModelData.username = contactDetails.username;
        conctactModelData.email = contactDetails.email;
        conctactModelData.telephone = contactDetails.telephone;
        conctactModelData.save().then((error) => {
            resolve(true);
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.updateContactDBService = (id, contactDetails) => {
    return new Promise(function myFn(resolve, reject){
        
        contactModel.findByIdAndUpdate(id, contactDetails).then((error) => {
            resolve(true);
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.deleteContactDBService = (id) => {
    return new Promise(function myFn(resolve, reject){
        
        contactModel.findByIdAndDelete(id).then((error) => {
            resolve(true);
        }).catch((error) => {
            reject(error);
        });
    });
}
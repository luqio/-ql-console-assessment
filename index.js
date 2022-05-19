/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys = [], objArray = []) => {
    return objArray.map(obj => {
        const newItem = {};
        for(let [key, value] of Object.entries(obj)){
            if(!(keys.includes(key))){
                newItem[key] = value;
            }
        }
        return newItem;
    });
};
exports.excludeByProperty = (property, objArray = []) => {
    if(!property){
        return objArray;
    }
    const newObjArray = [];
    objArray.forEach(obj => {
        if(!(Object.keys(obj).includes(property))){
            newObjArray.push(obj);
        }
    });
    return newObjArray;
};
exports.sumDeep = (objArray) => {
    return objArray.map(item => {
        const obj = {};
        for(let [key, value] of Object.entries(item)){
            obj[key] = value.reduce((total,obj) => total + (isNaN(obj.val) ? 0 : obj.val), 0);
        }
        return obj;
    });
};
exports.applyStatusColor = (dicts, statusObjArray = []) => {
    const statusColorMap = {};
    let result = [];
    /**
     * { red: [400], green: [200]} => { 400: 'red', 200: 'green'}
    */
    for (const [key, value] of Object.entries(dicts)) {
        value.forEach(status => {
            statusColorMap[status] = key;
        })
    }
    statusObjArray.forEach(item => {
        if(statusColorMap[String(item.status)]){
            result.push({
                ...item,
                color: statusColorMap[String(item.status)]
            }); 
        }
    });
    return result;
};
exports.createGreeting = (actionMethod, words) => {
    return function (name){
        return actionMethod(words, name);
    }
};
exports.setDefaults = (defaultProporty) => {
    return function (obj) {
        return {
            ...defaultProporty,
            ...obj
        }
    }
};
exports.fetchUserByNameAndUsersCompany = (userName, services) => {
    const  { fetchUsers, fetchCompanyById, fetchStatus } = services;
    let result = {};
    return new Promise(resolve => {
        const handleResolve = (obj) => {
            result = {
                ...result,
                ...obj
            }
            if(result.user !== undefined && result.company !== undefined && result.status !== undefined){
                resolve(result);
            }
        }
        fetchStatus().then(status => {
            handleResolve({status: status});
        })
        fetchUsers().then(users => {
            const user = users.filter(item => item.name === userName)[0];
            if(user){
                fetchCompanyById(user.companyId).then(company => {
                    handleResolve({user, company});
                });
            }else{
                handleResolve({user: null, company: null});
            }
        });
    })
};

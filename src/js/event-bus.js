let topics = {};
var callbackID = -1;

let addTopic = (topic) => {
    if(!topic || !!topics[topic]){
        return false;
    }
    topics[topic] = [];
    return true;
};

let removeTopic = (topic) => {
    if(!topic) {
        return false;
    }
    return delete topic[topic];
};

let subscribe = (topic, callback) => {
    if (!topics[topic]) {
        return false;
    }
    callbackID++;
    topics[topic].push({
        token: callbackID.toString(),
        callback: callback
    });
    return callbackID;
};

let publish = (topic, args) => {
    if ( !topics[topic] ) {
        return false;
    }
    topics[topic].forEach((subscriber) => {
        subscriber.callback.apply(null, [args]);
    });
};

let unsubscribe = (token) => {
    for ( var m in topics ) {
        if ( topics[m] ) {
            for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                if ( topics[m][i].token === token ) {
                    topics[m].splice( i, 1 );
                    return token;
                }
            }
        }
    }
    return false;
};

module.exports = {
    addTopic: addTopic,
    removeTopic: removeTopic,
    subscribe: subscribe,
    publish: publish,
    unsubscribe: unsubscribe
};
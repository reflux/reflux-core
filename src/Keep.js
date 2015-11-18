const createdStores = [];

const createdActions = [];

function reset() {
    while(createdStores.length) {
        createdStores.pop();
    }
    while(createdActions.length) {
        createdActions.pop();
    }
}

export default { createdStores, createdActions, reset };

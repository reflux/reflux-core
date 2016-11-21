
// this needs to be set to true before Keep.js starts storing
var use = false;

const createdStores = [];

const createdActions = [];

function addStore(str) {
	if (use) {
		createdStores.push(str);
	}
}

function addAction(act) {
	if (use) {
		createdActions.push(act);
	}
}

function reset() {
    while(createdStores.length) {
        createdStores.pop();
    }
    while(createdActions.length) {
        createdActions.pop();
    }
}

export default { use, addStore, addAction, createdStores, createdActions, reset };

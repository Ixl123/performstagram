import {firebaseDb} from './firebase';
/**
 * Generic list which can be used to handle lists inside a Firebase datatabase.
 */
export class FirebaseList {
    constructor(actions, path = null) {
        this._actions = actions;
        this._path = path;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    push(value) {
        return new Promise((resolve, reject) => {
            firebaseDb
                .ref(this._path + '/')
                .push(value)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    remove(key) {
        return new Promise((resolve, reject) => {
            firebaseDb
                .ref(`${this._path}/${key}`)
                .remove(error => error
                    ? reject(error)
                    : resolve());
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            firebaseDb
                .ref(`${this._path}/${key}`)
                .set(value, error => error
                    ? reject(error)
                    : resolve());
        });
    }

    update(key, value) {
        return new Promise((resolve, reject) => {
            firebaseDb
                .ref(`${this._path}/${key}`)
                .update(value, error => error
                    ? reject(error)
                    : resolve());
        });
    }

    subscribe(emit) {
        let ref = firebaseDb.ref(this._path);
        let initialized = false;
        let list = [];

        ref.once('value', () => {

            initialized = true;
            emit(this._actions.onLoad(list));
        });

        ref.on('child_added', (snapshot) => {

            if (initialized) {
                emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
            } else {
                list.push(this.unwrapSnapshot(snapshot));
            }
        });

        ref.on('child_changed', (snapshot) => {
            emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
        });

        ref.on('child_removed', (snapshot) => {
            emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
        });

        this._unsubscribe = () => ref.off();
    }

    unsubscribe() {
        this._unsubscribe();
    }

    unwrapSnapshot(snapshot) {
        const attrs = snapshot.val();
        const key = snapshot.key;
        attrs['code'] = snapshot.key;
        return attrs;
    }
}
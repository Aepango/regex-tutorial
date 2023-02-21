
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
    constructor() {
        const localData = localStorage.getItem('content');

        // check if CodeMirror is loaded
        if (typeof CodeMirror === 'undefined') {
            throw new Error('CodeMirror is not loaded');
        }

        this.editor = CodeMirror(document.querySelector('#main'), {
            value: '',
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });


        getDb().then((data) => {
            var strData = '';
            data.forEach(element => strData += element.jate);
            console.info('Loaded data from IndexedDB, injecting into editor');
            console.log(data)
            this.editor.setValue(strData);
        });

        this.editor.on('change', () => {
            localStorage.setItem('content', this.editor.getValue());
        });

        // Save the content of the editor when the editor itself is loses focus
        this.editor.on('blur', () => {
            console.log('The editor has lost focus');
            putDb('myEditor', localStorage.getItem('content'));
        });
    }
}
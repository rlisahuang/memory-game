class VisualLogPanel {
    _logPanel = document.getElementById('visual-log');

    log(msg) {
        const json = JSON.stringify(msg);
        this._logPanel.innerText += `${json}\n`;
    }

    clear() {
        this._logPanel.innerText = '';
    }
}

const visual = new VisualLogPanel();
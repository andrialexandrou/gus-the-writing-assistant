import { App, Modal, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

interface LogEntry {
    duration: number;
    activity: string;
    project: string;
}

interface PluginSettings {
    googleSheetId: string;
    serviceAccountKey: string;
    targetFilePath: string;
    timerDuration: number;
}

const DEFAULT_SETTINGS: PluginSettings = {
    googleSheetId: '',
    serviceAccountKey: '',
    targetFilePath: '',
    timerDuration: 25 * 60
};

export default class TimerPlugin extends Plugin {
    settings: PluginSettings;
    timer: NodeJS.Timeout | null = null;
    timeRemaining: number = 0;
    isRunning: boolean = false;

    async onload() {
        await this.loadSettings();

        this.addRibbonIcon('clock', 'Start Timer', () => {
            if (!this.isRunning) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        });

        this.addCommand({
            id: 'gus-log-command',
            name: 'GUS Log Command',
            editorCallback: (editor) => {
                const line = editor.getLine(editor.getCursor().line);
                this.parseAndLog(line);
            }
        });

        this.addSettingTab(new TimerSettingTab(this.app, this));
        this.registerInterval(window.setInterval(() => this.checkTimer(), 1000));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    parseAndLog(command: string) {
        const regex = /gus log (\d+)m (.*?) to project ['"](.*)['"]$/;
        const match = command.match(regex);

        if (match) {
            const [_, duration, activity, project] = match;
            this.logEntry({
                duration: parseInt(duration),
                activity: activity.trim(),
                project: project.trim()
            });
        }
    }

    async logEntry(entry: LogEntry) {
        await this.submitToSheets({
            timestamp: new Date().toISOString(),
            duration: entry.duration,
            activity: entry.activity,
            project: entry.project
        });

        await this.appendToFile(`
## Activity Log
- Project: ${entry.project}
- Activity: ${entry.activity}
- Duration: ${entry.duration} minutes
- Timestamp: ${new Date().toLocaleString()}
`);
    }

    startTimer() {
        this.timeRemaining = this.settings.timerDuration;
        this.isRunning = true;
        this.checkTimer();
    }

    stopTimer() {
        this.isRunning = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    async checkTimer() {
        if (!this.isRunning) return;
        this.timeRemaining--;
        if (this.timeRemaining <= 0) {
            this.isRunning = false;
            await this.onTimerComplete();
        }
    }

    async onTimerComplete() {
        await this.submitToSheets({
            timestamp: new Date().toISOString(),
            duration: this.settings.timerDuration,
            activity: 'Timer Session',
            project: 'Timer'
        });

        await this.appendToFile(`
## Timer Complete
- Duration: ${this.settings.timerDuration / 60} minutes
- Completed: ${new Date().toLocaleString()}
`);
    }

    async submitToSheets(data: any) {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.settings.googleSheetId}/values/A1:append`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.settings.serviceAccountKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [[
                        data.timestamp,
                        data.duration,
                        data.activity || '',
                        data.project || ''
                    ]],
                    majorDimension: 'ROWS',
                }),
            });

            if (!response.ok) {
                console.error('Failed to submit to Google Sheets');
            }
        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
        }
    }

    async appendToFile(content: string) {
        const file = this.app.vault.getAbstractFileByPath(this.settings.targetFilePath);
        if (file instanceof TFile) {
            const currentContent = await this.app.vault.read(file);
            await this.app.vault.modify(file, currentContent + content);
        } else {
            console.error('The target file is not a valid TFile.');
        }
    }
}

class TimerSettingTab extends PluginSettingTab {
    plugin: TimerPlugin;

    constructor(app: App, plugin: TimerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('Google Sheet ID')
            .setDesc('ID of the Google Sheet to update')
            .addText(text => text
                .setPlaceholder('Enter Sheet ID')
                .setValue(this.plugin.settings.googleSheetId)
                .onChange(async (value) => {
                    this.plugin.settings.googleSheetId = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Service Account Key')
            .setDesc('Google Service Account Key')
            .addText(text => text
                .setPlaceholder('Enter key')
                .setValue(this.plugin.settings.serviceAccountKey)
                .onChange(async (value) => {
                    this.plugin.settings.serviceAccountKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Target File Path')
            .setDesc('Path to the file to update')
            .addText(text => text
                .setPlaceholder('Enter file path')
                .setValue(this.plugin.settings.targetFilePath)
                .onChange(async (value) => {
                    this.plugin.settings.targetFilePath = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Timer Duration (minutes)')
            .setDesc('Duration of the timer in minutes')
            .addText(text => text
                .setPlaceholder('25')
                .setValue(String(this.plugin.settings.timerDuration / 60))
                .onChange(async (value) => {
                    this.plugin.settings.timerDuration = parseInt(value) * 60;
                    await this.plugin.saveSettings();
                }));
    }
}
import { App, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { LogModal, LogEntry } from './log-modal';

interface PluginSettings {
    scriptUrl: string;
    apiKey: string;
    targetFilePath: string;
    timerDuration: number;
}

const DEFAULT_SETTINGS: PluginSettings = {
    scriptUrl: '',
    apiKey: '',
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

        // Add timer ribbon icon
        this.addRibbonIcon('clock', 'Start Timer', () => {
            if (!this.isRunning) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        });

        // Add logging ribbon icon
        this.addRibbonIcon('book-heart', 'Log Writing Activity', () => {
            if (!this.settings.targetFilePath) {
                new Notice('Please configure target file path in settings');
                return;
            }
            
            // Check if file exists
            const file = this.app.vault.getAbstractFileByPath(this.settings.targetFilePath);
            if (!file) {
                new Notice('Writing log file not found. Please create it or check the path in settings.');
                return;
            }
        
            new LogModal(this.app, this).open();
        });

        this.addSettingTab(new TimerSettingTab(this.app, this));
        this.registerInterval(window.setInterval(() => this.checkTimer(), 1000));

        this.addCommand({
            id: 'test-sheets-connection',
            name: 'Test Google Sheets Connection',
            callback: async () => {
                try {
                    const testData: LogEntry = {
                        timestamp: new Date().toISOString(),
                        activity: 'test entry',
                        project: 'test project',
                        duration: 5,
                        fluency: 7,
                        wordCount: 100,
                        notes: 'This is a test entry'
                    };
    
                    await this.submitToSheets(testData);
                    new Notice('Test submission successful!');
                } catch (error) {
                    console.error('Test submission failed:', error);
                    new Notice(`Test failed: ${error.message}`);
                }
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async parseAndLog(command: string, project?: string): Promise<void> {
        const regex = /gus log (\d+)m (.+)$/;
        const match = command.match(regex);
        
        if (!match) {
            throw new Error('Invalid format. Use: gus log <minutes>m <activity>');
        }
    
        const [_, duration, activity] = match;
        const durationNum = parseInt(duration);
        
        if (isNaN(durationNum) || durationNum < 1 || durationNum > 480) {
            throw new Error('Duration must be between 1 and 480 minutes');
        }
    
        await this.logEntry({
            duration: durationNum,
            activity: activity.trim(),
            timestamp: new Date().toISOString(),
            project: project
        });
    }

    async logEntry(entry: LogEntry) {
        try {
            // Submit to Google Sheets
            await this.submitToSheets(entry);
            
            // Append to local file
            await this.appendToFile(entry);
        
            new Notice('Activity logged successfully');
        } catch (error) {
            console.error('Error logging activity:', error);
            throw new Error('Failed to log activity. Please check your settings and try again.');
        }
    }

    async submitToSheets(entry: LogEntry) {
        if (!this.settings.scriptUrl || !this.settings.apiKey) {
            throw new Error('Please configure both the Apps Script URL and API key in settings');
        }
    
        try {
            const dataArray = [
                entry.timestamp || new Date().toISOString(),
                entry.activity,
                entry.project || '',
                String(entry.duration),
                String(entry.fluency || ''),
                String(entry.wordCount || ''),
                entry.notes || ''
            ];
    
            const baseUrl = this.settings.scriptUrl;
            const apiKey = this.settings.apiKey;
            const url = `${baseUrl}?apiKey=${encodeURIComponent(apiKey)}`;
            
            // Remove the test GET request
            
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',  // Keep this for CORS handling
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataArray)
            });
    
            // With no-cors mode, we can't read the response
            // So we'll assume success if we get here without throwing
            return { success: true };
    
        } catch (error) {
            console.error('Failed to submit to Google Sheets:', error);
            throw new Error('Failed to submit to Google Sheets');
        }
    }



    async appendToFile(entry: LogEntry): Promise<void> {
        const filePath = this.settings.targetFilePath;
        if (!filePath) {
            throw new Error('Target file path not configured');
        }
    
        const file = this.app.vault.getAbstractFileByPath(filePath);
        if (!(file instanceof TFile)) {
            throw new Error(`File not found: ${filePath}`);
        }
    
        try {
            const content = `
    - Activity: ${entry.activity}
    - Duration: ${entry.duration} minutes
    - Project: ${entry.project || 'No project'}
    - Timestamp: ${new Date(entry.timestamp || Date.now()).toLocaleString()}
    - Fluency: ${entry.fluency || 'Not rated'}/10
    - Word Count: ${entry.wordCount || '0'}
    - Process Notes: ${entry.notes || 'None'}
    
    **
            `;
    
            const currentContent = await this.app.vault.read(file);
            await this.app.vault.modify(file, `${currentContent}\n${content}`);
        } catch (error) {
            console.error('Error writing to file:', error);
            throw new Error('Failed to save log entry to file');
        }
    }

    startTimer() {
        this.timeRemaining = this.settings.timerDuration;
        this.isRunning = true;
        this.checkTimer();
        new Notice(`Timer started: ${Math.floor(this.settings.timerDuration / 60)} minutes`);
    }

    stopTimer() {
        this.isRunning = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        new Notice('Timer stopped');
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
        try {
            await this.logEntry({
                duration: this.settings.timerDuration / 60,
                activity: 'Timer Session',
                timestamp: new Date().toISOString()
            });
            
            new Notice('Timer complete! Session logged.');
        } catch (error) {
            console.error('Error logging timer session:', error);
            new Notice('Timer complete, but failed to log session');
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

        containerEl.createEl('h2', {text: 'Writing Timer Settings'});

        // File Settings Section
        // In TimerSettingTab class, update the display method file settings section:
        new Setting(containerEl)
            .setName('Target File Path')
            .setDesc('Path to your writing log file (e.g. "Writing Log.md" or "Folder/Writing Log.md")')
            .addText(text => text
                .setPlaceholder('Writing Log.md')
                .setValue(this.plugin.settings.targetFilePath)
                .onChange(async (value) => {
                    this.plugin.settings.targetFilePath = value;
                    await this.plugin.saveSettings();
                }));

        // Add file path help text
        const helpList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });
        helpList.createEl('p', {
            text: 'File path examples:'
        });
        const examples = [
            '"Writing Log.md" - In vault root',
            '"Notes/Writing Log.md" - In Notes folder',
            '"Daily Notes/Writing/Log.md" - Nested folders'
        ];
        const ul = helpList.createEl('ul');
        examples.forEach(example => {
            ul.createEl('li', {text: example});
        });
        helpList.createEl('p', {
            text: 'Note: The file must already exist in your vault. Create it first, then enter its path here.'
        });

        // Timer Settings Section
        containerEl.createEl('h3', {text: 'Timer Settings'});

        new Setting(containerEl)
            .setName('Timer Duration')
            .setDesc('Default duration for the writing timer (in minutes)')
            .addText(text => text
                .setPlaceholder('25')
                .setValue(String(this.plugin.settings.timerDuration / 60))
                .onChange(async (value) => {
                    const duration = parseInt(value);
                    if (!isNaN(duration) && duration > 0) {
                        this.plugin.settings.timerDuration = duration * 60;
                        await this.plugin.saveSettings();
                    }
                }));

        // Google Sheets Integration Section
        containerEl.createEl('h3', {text: 'Google Sheets Integration'});
        
        new Setting(containerEl)
            .setName('Apps Script URL')
            .setDesc('URL of your Google Apps Script web app')
            .addText(text => text
                .setPlaceholder('https://script.google.com/...')
                .setValue(this.plugin.settings.scriptUrl)
                .onChange(async (value) => {
                    this.plugin.settings.scriptUrl = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('API Key')
            .setDesc('API key for Google Sheets authentication')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.apiKey)
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));

        // Setup Instructions
        containerEl.createEl('h3', {text: 'Setup Instructions'});
        
        const instructions = [
            '1. Create a copy of the template Google Sheet',
            '2. In the sheet, go to Extensions > Apps Script',
            '3. Copy the Apps Script code into the script editor',
            '4. Click save icon to save to Drive',
            '5. Run the setupApiKey function to generate your API key',
            '6. Deploy as a web app:',
            '\t\t- Execute as: Me',
            '\t\t- Who has access: Anyone with Google Account',
            '7. Copy the deployment URL and API key into these settings'
        ];

        const instructionsList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });

        instructions.forEach(instruction => {
            instructionsList.createEl('div', {text: instruction});
        });
    }
}
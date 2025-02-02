// main.ts
import { App, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { LogModal, LogEntry } from './log-modal';

interface PluginSettings {
    scriptUrl: string;
    apiKey: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
    scriptUrl: '',
    apiKey: ''
};

export default class WritingLoggerPlugin extends Plugin {
    settings: PluginSettings;

    async onload() {
        await this.loadSettings();

        this.addCommand({
            id: 'log-writing-activity',
            name: 'Log Writing Activity',
            callback: () => {
                new LogModal(this.app, this).open();
            }
        });

        // Add logging ribbon icon
        this.addRibbonIcon('book-heart', 'Log Writing Activity', () => {
            new LogModal(this.app, this).open();
        });

        this.addSettingTab(new WritingLoggerSettingTab(this.app, this));

        this.addCommand({
            id: 'test-sheets-connection',
            name: 'Test Google Sheets Connection',
            callback: async () => {
                try {
                    const testData: LogEntry = {
                        timestamp: new Date().toISOString(),
                        startTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                        activity: 'test entry',
                        project: 'test project',
                        duration: 5,
                        fluency: 4,
                        wordCount: 100,
                        notes: 'This is a test entry',
                        stage: 'testing',
                        plan: 'Test plan',
                        nextActions: 'Next steps'
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

    async logEntry(entry: LogEntry) {
        try {
            // Submit to Google Sheets
            await this.submitToSheets(entry);
            
            // Create or append to daily file
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
                new Date(entry.timestamp).toISOString().split('T')[0],
                entry.startTime || '',
                entry.project || '',
                entry.stage || '',
                String(entry.wordCount || ''),
                String(entry.fluency || ''),
                String(entry.duration),
            ];
    
            const url = `${this.settings.scriptUrl}?apiKey=${encodeURIComponent(this.settings.apiKey)}`;
            
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataArray)
            });
    
            return { success: true };
        } catch (error) {
            console.error('Failed to submit to Google Sheets:', error);
            throw new Error('Failed to submit to Google Sheets');
        }
    }

    async appendToFile(entry: LogEntry): Promise<void> {
        const date = new Date(entry.timestamp);
        const dateStr = date.toISOString().split('T')[0];
        
        const sessionNum = await this.getNextSessionNumber(dateStr);
        const fileName = `${dateStr} Session ${sessionNum}.md`;
        
        const content = `
**

**plan**: ${entry.plan || ''}
**start time**: ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
**stage**: ${entry.stage || ''}
**project**: [[${entry.project || 'No project'}]]
**duration**: ${entry.duration}:00
**word count**: ${entry.wordCount || ''}
**process**: ${entry.notes || ''}
**test stat fluency out of 5**: ${entry.fluency || ''}
**next actions**: ${entry.nextActions || ''}

**`.trim();
    
        try {
            // Create the file
            await this.app.vault.create(fileName, content);
            
            // Get the newly created file
            const newFile = this.app.vault.getAbstractFileByPath(fileName);
            if (newFile instanceof TFile) {
                // Open the file in a new leaf
                const leaf = this.app.workspace.getUnpinnedLeaf();
                await leaf.openFile(newFile);
            }
        } catch (error) {
            console.error('Error writing to file:', error);
            throw new Error('Failed to create log entry file');
        }
    }

    private async getNextSessionNumber(dateStr: string): Promise<number> {
        const files = this.app.vault.getFiles();
        const todayFiles = files.filter(file => 
            file.name.startsWith(dateStr) && 
            file.name.includes('Session')
        );
        
        if (todayFiles.length === 0) {
            return 1;
        }
        
        let maxSession = 0;
        todayFiles.forEach(file => {
            const match = file.name.match(/Session (\d+)/);
            if (match) {
                const num = parseInt(match[1]);
                if (num > maxSession) maxSession = num;
            }
        });
        
        return maxSession + 1;
    }
}

class WritingLoggerSettingTab extends PluginSettingTab {
    plugin: WritingLoggerPlugin;

    constructor(app: App, plugin: WritingLoggerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: 'Writing Logger Settings'});

        // Google Sheets Integration Section
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
            '4. Deploy as a web app',
            '5. Copy the deployment URL and API key into these settings'
        ];

        const instructionsList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });

        instructions.forEach(instruction => {
            instructionsList.createEl('div', {text: instruction});
        });
    }
}
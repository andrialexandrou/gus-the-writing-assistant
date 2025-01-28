import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

interface LogEntry {
    duration: number;
    activity: string;
    timestamp?: string;
    project?: string;
}

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

class LogModal extends Modal {
    private plugin: TimerPlugin;
    private inputField: HTMLInputElement;
    private durationField: HTMLInputElement;
    private activityField: HTMLInputElement;
    private projectField: HTMLInputElement;  // New field
    private errorText: HTMLDivElement;
    private submitButton: HTMLButtonElement;
 
    constructor(app: App, plugin: TimerPlugin) {
        super(app);
        this.plugin = plugin;
    }
 
    onOpen() {
        const {contentEl} = this;
        contentEl.empty();
        
        const container = contentEl.createDiv('log-modal-container');
        
        container.createEl('h2', {
            text: 'Log Writing Activity',
            attr: {'aria-label': 'Log Writing Activity Form'}
        });

        const form = container.createEl('form', {
            cls: 'log-form',
            attr: {
                role: 'form',
                'aria-label': 'Writing activity log form'
            }
        });

        form.onsubmit = (e) => e.preventDefault();

        // Duration field
        const durationGroup = form.createDiv('form-group');
        durationGroup.createEl('label', {
            text: 'Duration (minutes)',
            attr: {'for': 'duration-input'}
        });

        this.durationField = durationGroup.createEl('input', {
            type: 'number',
            attr: {
                id: 'duration-input',
                placeholder: '25',
                min: '1',
                max: '480',
                required: 'true',
                'aria-required': 'true'
            }
        });

        // Activity field
        const activityGroup = form.createDiv('form-group');
        activityGroup.createEl('label', {
            text: 'Activity Description',
            attr: {'for': 'activity-input'}
        });

        this.activityField = activityGroup.createEl('input', {
            type: 'text',
            attr: {
                id: 'activity-input',
                placeholder: 'prewriting',
                required: 'true',
                'aria-required': 'true'
            }
        });

        // Project field
        const projectGroup = form.createDiv('form-group');
        projectGroup.createEl('label', {
            text: 'Project',
            attr: {'for': 'project-input'}
        });

        this.projectField = projectGroup.createEl('input', {
            type: 'text',
            attr: {
                id: 'project-input',
                placeholder: 'save the cat',
                'aria-required': 'false'
            }
        });

        // Error message container
        this.errorText = form.createDiv('error-text');
        this.errorText.style.display = 'none';
        this.errorText.setAttribute('role', 'alert');
        this.errorText.setAttribute('aria-live', 'polite');

        // Button container
        const buttonContainer = form.createDiv('button-container');

        this.submitButton = buttonContainer.createEl('button', {
            text: 'Log Activity',
            attr: {
                type: 'submit',
                'aria-label': 'Submit activity log'
            }
        });

        // this.cancelButton = buttonContainer.createEl('button', {
        //     text: 'Cancel',
        //     attr: {
        //         type: 'button',
        //         'aria-label': 'Cancel logging'
        //     }
        // });

        this.setupEventListeners();
        this.durationField.focus();
    }

    private setupEventListeners() {
        this.contentEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                this.handleSubmit();
            }
            if (e.key === 'Escape') {
                this.close();
            }
        });

        this.submitButton.addEventListener('click', () => {
            this.handleSubmit();
        });

        this.durationField.addEventListener('input', () => {
            this.validateInput();
        });

        this.activityField.addEventListener('input', () => {
            this.validateInput();
        });
    }

    private validateInput(): boolean {
        const duration = parseInt(this.durationField.value);
        const activity = this.activityField.value.trim();

        this.errorText.style.display = 'none';
        this.errorText.textContent = '';

        if (!duration || duration < 1 || duration > 480) {
            this.showError('Duration must be between 1 and 480 minutes');
            return false;
        }

        if (!activity) {
            this.showError('Please enter an activity description');
            return false;
        }

        return true;
    }

    private showError(message: string) {
        this.errorText.textContent = message;
        this.errorText.style.display = 'block';
        
        // Make errors more noticeable
        this.errorText.style.padding = '8px';
        this.errorText.style.marginTop = '8px';
        this.errorText.style.marginBottom = '8px';
        
        // Ensure screen readers announce the error
        this.errorText.setAttribute('role', 'alert');
        this.errorText.setAttribute('aria-live', 'assertive');
    }

    private async handleSubmit() {
        if (!this.validateInput()) {
            return;
        }
    
        try {
            const duration = this.durationField.value;
            const activity = this.activityField.value.trim();
            const project = this.projectField.value.trim();
            
            console.log('Submitting log:', { duration, activity, project });
            
            // This will now show the specific API error or network error
            await this.plugin.parseAndLog(`gus log ${duration}m ${activity}`, project);
            this.close();
        } catch (error) {
            // Show the actual error message from the API or network call
            console.error('Submit failed:', error);
            this.showError(error.message || 'Unknown error occurred');
        }
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}

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
            await this.submitToSheets({
                timestamp: entry.timestamp || new Date().toISOString(),
                duration: entry.duration,
                activity: entry.activity,
                project: entry.project  // Add this line
            });
            console.log('trying to submit to sheets')    
            // Append to local file
            await this.appendToFile(`
- Activity: ${entry.activity}
- Duration: ${entry.duration} minutes
- Project: ${entry.project || 'No project'}
- Timestamp: ${new Date(entry.timestamp || Date.now()).toLocaleString()}
- Process Notes: 

**
    `);
    
            new Notice('Activity logged successfully');
        } catch (error) {
            console.error('Error logging activity:', error);
            throw new Error('Failed to log activity. Please check your settings and try again.');
        }
    }

// In main.ts, update the submitToSheets method:
    async submitToSheets(data: { timestamp: string; duration: number; activity: string; project?: string }) {
        if (!this.settings.scriptUrl || !this.settings.apiKey) {
            throw new Error('Please configure both the Apps Script URL and API key in settings');
        }

        try {
            const baseUrl = this.settings.scriptUrl;
            const apiKey = this.settings.apiKey;

            const url = `${baseUrl}?apiKey=${encodeURIComponent(apiKey)}`;
            console.log('Submission URL:', url);
            console.log('Submission Data:', JSON.stringify(data));

            const preflightUrl = `${baseUrl}?cors=preflight&apiKey=${encodeURIComponent(apiKey)}`;
            console.log('Preflight URL:', preflightUrl);
            await fetch(preflightUrl, { method: 'GET' });

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            
            // if (!response.ok) {
            //     const errorText = await response.text();
            //     console.error('Full response text:', errorText);
            //     throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            // }

            const result = await response.json();
            console.log('Submission result:', result);

            // if (result.status === 'error') {
            //     throw new Error(result.message || 'Unknown error from Google Sheets');
            // }

        } catch (error) {
            console.error('Detailed submission error:', error);
            // throw error; // Re-throw to allow caller to handle
        }
        // return result;
    }



    async appendToFile(content: string): Promise<void> {
        const filePath = this.settings.targetFilePath;
        if (!filePath) {
            throw new Error('Target file path not configured');
        }
    
        const file = this.app.vault.getAbstractFileByPath(filePath);
        if (!(file instanceof TFile)) {
            throw new Error(`File not found: ${filePath}`);
        }
    
        try {
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
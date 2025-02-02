// log-modal.ts
import { App, Modal, Setting, Notice } from 'obsidian';
import WritingLoggerPlugin from './main';

export interface LogEntry {
    timestamp: string;
    startTime: string;  // Added start time
    activity: string;
    project?: string;
    duration: number;
    fluency?: number;
    wordCount?: number;
    notes?: string;
    stage?: string;
    plan?: string;
    nextActions?: string;
}

export class LogModal extends Modal {
    private entry: Partial<LogEntry>;

    constructor(app: App, private plugin: WritingLoggerPlugin) {
        super(app);
        const now = new Date();
        this.entry = {
            timestamp: now.toISOString(),
            startTime: now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            }),
            stage: '',
            plan: '',
            project: '',
            duration: 0,
            wordCount: undefined,
            notes: '',
            fluency: undefined,
            nextActions: ''
        };
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl('h2', { text: 'Log Writing Session' });

        // Plan
        new Setting(contentEl)
            .setName('Plan')
            .setDesc('What was your plan for this session?')
            .addTextArea(text => text
                .setValue(this.entry.plan || '')
                .setPlaceholder('What did you plan to accomplish?')
                .onChange(value => this.entry.plan = value));

        // Start Time
        new Setting(contentEl)
            .setName('Start Time')
            .setDesc('When did you start? (24-hour format)')
            .addText(text => text
                .setValue(this.entry.startTime || '')
                .setPlaceholder('e.g., 14:30')
                .onChange(value => {
                    // Validate and format time
                    if (this.isValidTime(value)) {
                        this.entry.startTime = value;
                    }
                }));

        // Stage
        new Setting(contentEl)
            .setName('Stage')
            .setDesc('Current stage of writing (e.g., prewriting, drafting, editing)')
            .addText(text => text
                .setValue(this.entry.stage || '')
                .setPlaceholder('e.g., prewriting (outlining)')
                .onChange(value => this.entry.stage = value));

        // Project
        new Setting(contentEl)
            .setName('Project')
            .setDesc('Project name (will be created as a link)')
            .addText(text => text
                .setValue(this.entry.project || '')
                .setPlaceholder('e.g., writing, fast and slow')
                .onChange(value => this.entry.project = value));

        // Duration
        new Setting(contentEl)
            .setName('Duration')
            .setDesc('Session duration (in minutes)')
            .addText(text => text
                .setValue(this.entry.duration?.toString() || '')
                .setPlaceholder('e.g., 25')
                .onChange(value => {
                    const duration = parseInt(value);
                    if (!isNaN(duration)) {
                        this.entry.duration = duration;
                    }
                }));

        // Word Count
        new Setting(contentEl)
            .setName('Word Count')
            .setDesc('Number of words written (optional)')
            .addText(text => text
                .setValue(this.entry.wordCount?.toString() || '')
                .setPlaceholder('e.g., 500')
                .onChange(value => {
                    const count = parseInt(value);
                    if (!isNaN(count)) {
                        this.entry.wordCount = count;
                    }
                }));

        // Process Notes
        new Setting(contentEl)
            .setName('Process')
            .setDesc('Notes about your writing process')
            .addTextArea(text => text
                .setValue(this.entry.notes || '')
                .setPlaceholder('How did the writing go?')
                .onChange(value => this.entry.notes = value));

        // Fluency
        new Setting(contentEl)
            .setName('Test Stat Fluency')
            .setDesc('Writing fluency rating (1-5)')
            .addSlider(slider => slider
                .setLimits(1, 5, 1)
                .setValue(this.entry.fluency || 3)
                .setDynamicTooltip()
                .onChange(value => this.entry.fluency = value));

        // Next Actions
        new Setting(contentEl)
            .setName('Next Actions')
            .setDesc('What needs to be done next?')
            .addTextArea(text => text
                .setValue(this.entry.nextActions || '')
                .setPlaceholder('Next steps for this project')
                .onChange(value => this.entry.nextActions = value));

        // Submit Button
        new Setting(contentEl)
        .addButton(button => button
            .setButtonText('Submit')
            .setCta()
            .onClick(async () => {
                if (!this.validateEntry()) {
                    return;
                }
        
                // Close form immediately
                this.close();
                
                // Handle submission after closing
                try {
                    await this.plugin.logEntry(this.entry as LogEntry);
                } catch (error) {
                    console.error('Failed to submit entry:', error);
                    new Notice('Failed to save entry: ' + error.message);
                }
            }));
    }

    private isValidTime(time: string): boolean {
        // Check if time matches HH:MM format (24-hour)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeRegex.test(time)) {
            return false;
        }
        return true;
    }

    private validateEntry(): boolean {
        if (!this.entry.startTime || !this.isValidTime(this.entry.startTime)) {
            new Notice('Please enter a valid start time (HH:MM)');
            return false;
        }

        if (!this.entry.stage) {
            new Notice('Please enter a writing stage');
            return false;
        }

        if (!this.entry.duration || this.entry.duration < 1) {
            new Notice('Please enter a valid duration');
            return false;
        }

        if (this.entry.duration > 480) { // 8 hours max
            new Notice('Duration must be less than 8 hours');
            return false;
        }

        return true;
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
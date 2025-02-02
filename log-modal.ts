import { App, Modal, Notice } from 'obsidian';
import type TimerPlugin from './main';

// Export the interface
export interface LogEntry {
    duration: number;
    activity: string;
    timestamp?: string;
    project?: string;
    fluency?: number;
    wordCount?: number;
    notes?: string;
}

export class LogModal extends Modal {
    private plugin: TimerPlugin;
    private durationField: HTMLInputElement;
    private activityField: HTMLInputElement;
    private projectField: HTMLInputElement;
    private fluencyField: HTMLInputElement;
    private wordCountField: HTMLInputElement;
    private notesField: HTMLTextAreaElement;
    private errorText: HTMLDivElement;
    private submitButton: HTMLButtonElement;
 
    constructor(app: App, plugin: TimerPlugin) {
        super(app);
        this.plugin = plugin;
    }
    
    // Rest of the LogModal implementation remains the same...
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

        // Fluency Rating
        const fluencyGroup = form.createDiv('form-group');
        fluencyGroup.createEl('label', {
            text: 'Fluency Rating (1-10)',
            attr: {'for': 'fluency-input'}
        });

        this.fluencyField = fluencyGroup.createEl('input', {
            type: 'range',
            attr: {
                id: 'fluency-input',
                min: '1',
                max: '10',
                value: '5',
                'aria-required': 'false'
            }
        });

        // Word Count
        const wordCountGroup = form.createDiv('form-group');
        wordCountGroup.createEl('label', {
            text: 'Word Count',
            attr: {'for': 'wordcount-input'}
        });

        this.wordCountField = wordCountGroup.createEl('input', {
            type: 'number',
            attr: {
                id: 'wordcount-input',
                placeholder: '0',
                min: '0',
                'aria-required': 'false'
            }
        });

        // Process Notes
        const notesGroup = form.createDiv('form-group');
        notesGroup.createEl('label', {
            text: 'Process Notes (Optional)',
            attr: {'for': 'notes-input'}
        });

        this.notesField = notesGroup.createEl('textarea', {
            attr: {
                id: 'notes-input',
                placeholder: 'How did the writing go? Any challenges or breakthroughs?',
                rows: '3',
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
        this.errorText.style.padding = '8px';
        this.errorText.style.marginTop = '8px';
        this.errorText.style.marginBottom = '8px';
        this.errorText.setAttribute('role', 'alert');
        this.errorText.setAttribute('aria-live', 'assertive');
    }

    private async handleSubmit() {
        if (!this.validateInput()) {
            return;
        }
    
        try {
            const entry: LogEntry = {
                duration: parseInt(this.durationField.value),
                activity: this.activityField.value.trim(),
                project: this.projectField.value.trim(),
                timestamp: new Date().toISOString(),
                fluency: parseInt(this.fluencyField.value),
                wordCount: parseInt(this.wordCountField.value) || 0,
                notes: this.notesField.value.trim()
            };
            
            console.log('Submitting log:', entry);
            await this.plugin.logEntry(entry);
            this.close();
        } catch (error) {
            console.error('Submit failed:', error);
            this.showError(error.message || 'Unknown error occurred');
        }
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}
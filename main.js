'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : undefined, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var LogModal = /** @class */ (function (_super) {
    __extends(LogModal, _super);
    function LogModal(app, plugin) {
        var _this = _super.call(this, app) || this;
        _this.plugin = plugin;
        return _this;
    }
    // Rest of the LogModal implementation remains the same...
    LogModal.prototype.onOpen = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
        var container = contentEl.createDiv('log-modal-container');
        container.createEl('h2', {
            text: 'Log Writing Activity',
            attr: { 'aria-label': 'Log Writing Activity Form' }
        });
        var form = container.createEl('form', {
            cls: 'log-form',
            attr: {
                role: 'form',
                'aria-label': 'Writing activity log form'
            }
        });
        form.onsubmit = function (e) { return e.preventDefault(); };
        // Duration field
        var durationGroup = form.createDiv('form-group');
        durationGroup.createEl('label', {
            text: 'Duration (minutes)',
            attr: { 'for': 'duration-input' }
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
        var activityGroup = form.createDiv('form-group');
        activityGroup.createEl('label', {
            text: 'Activity Description',
            attr: { 'for': 'activity-input' }
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
        var projectGroup = form.createDiv('form-group');
        projectGroup.createEl('label', {
            text: 'Project',
            attr: { 'for': 'project-input' }
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
        var fluencyGroup = form.createDiv('form-group');
        fluencyGroup.createEl('label', {
            text: 'Fluency Rating (1-10)',
            attr: { 'for': 'fluency-input' }
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
        var wordCountGroup = form.createDiv('form-group');
        wordCountGroup.createEl('label', {
            text: 'Word Count',
            attr: { 'for': 'wordcount-input' }
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
        var notesGroup = form.createDiv('form-group');
        notesGroup.createEl('label', {
            text: 'Process Notes (Optional)',
            attr: { 'for': 'notes-input' }
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
        var buttonContainer = form.createDiv('button-container');
        this.submitButton = buttonContainer.createEl('button', {
            text: 'Log Activity',
            attr: {
                type: 'submit',
                'aria-label': 'Submit activity log'
            }
        });
        this.setupEventListeners();
        this.durationField.focus();
    };
    LogModal.prototype.setupEventListeners = function () {
        var _this = this;
        this.contentEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                _this.handleSubmit();
            }
            if (e.key === 'Escape') {
                _this.close();
            }
        });
        this.submitButton.addEventListener('click', function () {
            _this.handleSubmit();
        });
        this.durationField.addEventListener('input', function () {
            _this.validateInput();
        });
        this.activityField.addEventListener('input', function () {
            _this.validateInput();
        });
    };
    LogModal.prototype.validateInput = function () {
        var duration = parseInt(this.durationField.value);
        var activity = this.activityField.value.trim();
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
    };
    LogModal.prototype.showError = function (message) {
        this.errorText.textContent = message;
        this.errorText.style.display = 'block';
        this.errorText.style.padding = '8px';
        this.errorText.style.marginTop = '8px';
        this.errorText.style.marginBottom = '8px';
        this.errorText.setAttribute('role', 'alert');
        this.errorText.setAttribute('aria-live', 'assertive');
    };
    LogModal.prototype.handleSubmit = function () {
        return __awaiter(this, undefined, undefined, function () {
            var entry, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateInput()) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        entry = {
                            duration: parseInt(this.durationField.value),
                            activity: this.activityField.value.trim(),
                            project: this.projectField.value.trim(),
                            timestamp: new Date().toISOString(),
                            fluency: parseInt(this.fluencyField.value),
                            wordCount: parseInt(this.wordCountField.value) || 0,
                            notes: this.notesField.value.trim()
                        };
                        console.log('Submitting log:', entry);
                        return [4 /*yield*/, this.plugin.logEntry(entry)];
                    case 2:
                        _a.sent();
                        this.close();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Submit failed:', error_1);
                        this.showError(error_1.message || 'Unknown error occurred');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LogModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return LogModal;
}(obsidian.Modal));

var DEFAULT_SETTINGS = {
    scriptUrl: '',
    apiKey: '',
    targetFilePath: '',
    timerDuration: 25 * 60
};
var TimerPlugin = /** @class */ (function (_super) {
    __extends(TimerPlugin, _super);
    function TimerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null;
        _this.timeRemaining = 0;
        _this.isRunning = false;
        return _this;
    }
    TimerPlugin.prototype.onload = function () {
        return __awaiter(this, undefined, undefined, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        // Add timer ribbon icon
                        this.addRibbonIcon('clock', 'Start Timer', function () {
                            if (!_this.isRunning) {
                                _this.startTimer();
                            }
                            else {
                                _this.stopTimer();
                            }
                        });
                        // Add logging ribbon icon
                        this.addRibbonIcon('book-heart', 'Log Writing Activity', function () {
                            if (!_this.settings.targetFilePath) {
                                new obsidian.Notice('Please configure target file path in settings');
                                return;
                            }
                            // Check if file exists
                            var file = _this.app.vault.getAbstractFileByPath(_this.settings.targetFilePath);
                            if (!file) {
                                new obsidian.Notice('Writing log file not found. Please create it or check the path in settings.');
                                return;
                            }
                            new LogModal(_this.app, _this).open();
                        });
                        this.addSettingTab(new TimerSettingTab(this.app, this));
                        this.registerInterval(window.setInterval(function () { return _this.checkTimer(); }, 1000));
                        this.addCommand({
                            id: 'test-sheets-connection',
                            name: 'Test Google Sheets Connection',
                            callback: function () { return __awaiter(_this, undefined, undefined, function () {
                                var testData, error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            testData = {
                                                timestamp: new Date().toISOString(),
                                                activity: 'test entry',
                                                project: 'test project',
                                                duration: 5,
                                                fluency: 7,
                                                wordCount: 100,
                                                notes: 'This is a test entry'
                                            };
                                            return [4 /*yield*/, this.submitToSheets(testData)];
                                        case 1:
                                            _a.sent();
                                            new obsidian.Notice('Test submission successful!');
                                            return [3 /*break*/, 3];
                                        case 2:
                                            error_1 = _a.sent();
                                            console.error('Test submission failed:', error_1);
                                            new obsidian.Notice("Test failed: ".concat(error_1.message));
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.loadSettings = function () {
        return __awaiter(this, undefined, undefined, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.saveSettings = function () {
        return __awaiter(this, undefined, undefined, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.parseAndLog = function (command, project) {
        return __awaiter(this, undefined, undefined, function () {
            var regex, match, duration, activity, durationNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regex = /gus log (\d+)m (.+)$/;
                        match = command.match(regex);
                        if (!match) {
                            throw new Error('Invalid format. Use: gus log <minutes>m <activity>');
                        }
                        match[0], duration = match[1], activity = match[2];
                        durationNum = parseInt(duration);
                        if (isNaN(durationNum) || durationNum < 1 || durationNum > 480) {
                            throw new Error('Duration must be between 1 and 480 minutes');
                        }
                        return [4 /*yield*/, this.logEntry({
                                duration: durationNum,
                                activity: activity.trim(),
                                timestamp: new Date().toISOString(),
                                project: project
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.logEntry = function (entry) {
        return __awaiter(this, undefined, undefined, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Submit to Google Sheets
                        return [4 /*yield*/, this.submitToSheets(entry)];
                    case 1:
                        // Submit to Google Sheets
                        _a.sent();
                        // Append to local file
                        return [4 /*yield*/, this.appendToFile(entry)];
                    case 2:
                        // Append to local file
                        _a.sent();
                        new obsidian.Notice('Activity logged successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error logging activity:', error_2);
                        throw new Error('Failed to log activity. Please check your settings and try again.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.submitToSheets = function (entry) {
        return __awaiter(this, undefined, undefined, function () {
            var dataArray, baseUrl, apiKey, url, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.settings.scriptUrl || !this.settings.apiKey) {
                            throw new Error('Please configure both the Apps Script URL and API key in settings');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        dataArray = [
                            entry.timestamp || new Date().toISOString(),
                            entry.activity,
                            entry.project || '',
                            String(entry.duration),
                            String(entry.fluency || ''),
                            String(entry.wordCount || ''),
                            entry.notes || ''
                        ];
                        baseUrl = this.settings.scriptUrl;
                        apiKey = this.settings.apiKey;
                        url = "".concat(baseUrl, "?apiKey=").concat(encodeURIComponent(apiKey));
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                mode: 'no-cors', // Keep this for CORS handling
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataArray)
                            })];
                    case 2:
                        _a.sent();
                        // With no-cors mode, we can't read the response
                        // So we'll assume success if we get here without throwing
                        return [2 /*return*/, { success: true }];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Failed to submit to Google Sheets:', error_3);
                        throw new Error('Failed to submit to Google Sheets');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.appendToFile = function (entry) {
        return __awaiter(this, undefined, undefined, function () {
            var filePath, file, content, currentContent, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = this.settings.targetFilePath;
                        if (!filePath) {
                            throw new Error('Target file path not configured');
                        }
                        file = this.app.vault.getAbstractFileByPath(filePath);
                        if (!(file instanceof obsidian.TFile)) {
                            throw new Error("File not found: ".concat(filePath));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        content = "\n    - Activity: ".concat(entry.activity, "\n    - Duration: ").concat(entry.duration, " minutes\n    - Project: ").concat(entry.project || 'No project', "\n    - Timestamp: ").concat(new Date(entry.timestamp || Date.now()).toLocaleString(), "\n    - Fluency: ").concat(entry.fluency || 'Not rated', "/10\n    - Word Count: ").concat(entry.wordCount || '0', "\n    - Process Notes: ").concat(entry.notes || 'None', "\n    \n    **\n            ");
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 2:
                        currentContent = _a.sent();
                        return [4 /*yield*/, this.app.vault.modify(file, "".concat(currentContent, "\n").concat(content))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error('Error writing to file:', error_4);
                        throw new Error('Failed to save log entry to file');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.startTimer = function () {
        this.timeRemaining = this.settings.timerDuration;
        this.isRunning = true;
        this.checkTimer();
        new obsidian.Notice("Timer started: ".concat(Math.floor(this.settings.timerDuration / 60), " minutes"));
    };
    TimerPlugin.prototype.stopTimer = function () {
        this.isRunning = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        new obsidian.Notice('Timer stopped');
    };
    TimerPlugin.prototype.checkTimer = function () {
        return __awaiter(this, undefined, undefined, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isRunning)
                            return [2 /*return*/];
                        this.timeRemaining--;
                        if (!(this.timeRemaining <= 0)) return [3 /*break*/, 2];
                        this.isRunning = false;
                        return [4 /*yield*/, this.onTimerComplete()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.onTimerComplete = function () {
        return __awaiter(this, undefined, undefined, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logEntry({
                                duration: this.settings.timerDuration / 60,
                                activity: 'Timer Session',
                                timestamp: new Date().toISOString()
                            })];
                    case 1:
                        _a.sent();
                        new obsidian.Notice('Timer complete! Session logged.');
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Error logging timer session:', error_5);
                        new obsidian.Notice('Timer complete, but failed to log session');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TimerPlugin;
}(obsidian.Plugin));
var TimerSettingTab = /** @class */ (function (_super) {
    __extends(TimerSettingTab, _super);
    function TimerSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    TimerSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Writing Timer Settings' });
        // File Settings Section
        // In TimerSettingTab class, update the display method file settings section:
        new obsidian.Setting(containerEl)
            .setName('Target File Path')
            .setDesc('Path to your writing log file (e.g. "Writing Log.md" or "Folder/Writing Log.md")')
            .addText(function (text) { return text
            .setPlaceholder('Writing Log.md')
            .setValue(_this.plugin.settings.targetFilePath)
            .onChange(function (value) { return __awaiter(_this, undefined, undefined, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.targetFilePath = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        // Add file path help text
        var helpList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });
        helpList.createEl('p', {
            text: 'File path examples:'
        });
        var examples = [
            '"Writing Log.md" - In vault root',
            '"Notes/Writing Log.md" - In Notes folder',
            '"Daily Notes/Writing/Log.md" - Nested folders'
        ];
        var ul = helpList.createEl('ul');
        examples.forEach(function (example) {
            ul.createEl('li', { text: example });
        });
        helpList.createEl('p', {
            text: 'Note: The file must already exist in your vault. Create it first, then enter its path here.'
        });
        // Timer Settings Section
        containerEl.createEl('h3', { text: 'Timer Settings' });
        new obsidian.Setting(containerEl)
            .setName('Timer Duration')
            .setDesc('Default duration for the writing timer (in minutes)')
            .addText(function (text) { return text
            .setPlaceholder('25')
            .setValue(String(_this.plugin.settings.timerDuration / 60))
            .onChange(function (value) { return __awaiter(_this, undefined, undefined, function () {
            var duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        duration = parseInt(value);
                        if (!(!isNaN(duration) && duration > 0)) return [3 /*break*/, 2];
                        this.plugin.settings.timerDuration = duration * 60;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }); });
        // Google Sheets Integration Section
        containerEl.createEl('h3', { text: 'Google Sheets Integration' });
        new obsidian.Setting(containerEl)
            .setName('Apps Script URL')
            .setDesc('URL of your Google Apps Script web app')
            .addText(function (text) { return text
            .setPlaceholder('https://script.google.com/...')
            .setValue(_this.plugin.settings.scriptUrl)
            .onChange(function (value) { return __awaiter(_this, undefined, undefined, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.scriptUrl = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('API Key')
            .setDesc('API key for Google Sheets authentication')
            .addText(function (text) { return text
            .setPlaceholder('Enter your API key')
            .setValue(_this.plugin.settings.apiKey)
            .onChange(function (value) { return __awaiter(_this, undefined, undefined, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.apiKey = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        // Setup Instructions
        containerEl.createEl('h3', { text: 'Setup Instructions' });
        var instructions = [
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
        var instructionsList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });
        instructions.forEach(function (instruction) {
            instructionsList.createEl('div', { text: instruction });
        });
    };
    return TimerSettingTab;
}(obsidian.PluginSettingTab));

module.exports = TimerPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImxvZy1tb2RhbC50cyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSBUaW1lclBsdWdpbiBmcm9tICcuL21haW4nO1xuXG4vLyBFeHBvcnQgdGhlIGludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBMb2dFbnRyeSB7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBhY3Rpdml0eTogc3RyaW5nO1xuICAgIHRpbWVzdGFtcD86IHN0cmluZztcbiAgICBwcm9qZWN0Pzogc3RyaW5nO1xuICAgIGZsdWVuY3k/OiBudW1iZXI7XG4gICAgd29yZENvdW50PzogbnVtYmVyO1xuICAgIG5vdGVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcHJpdmF0ZSBwbHVnaW46IFRpbWVyUGx1Z2luO1xuICAgIHByaXZhdGUgZHVyYXRpb25GaWVsZDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIGFjdGl2aXR5RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBwcm9qZWN0RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBmbHVlbmN5RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSB3b3JkQ291bnRGaWVsZDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIG5vdGVzRmllbGQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBlcnJvclRleHQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgc3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiBcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBUaW1lclBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVzdCBvZiB0aGUgTG9nTW9kYWwgaW1wbGVtZW50YXRpb24gcmVtYWlucyB0aGUgc2FtZS4uLlxuICAgIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoJ2xvZy1tb2RhbC1jb250YWluZXInKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVFbCgnaDInLCB7XG4gICAgICAgICAgICB0ZXh0OiAnTG9nIFdyaXRpbmcgQWN0aXZpdHknLFxuICAgICAgICAgICAgYXR0cjogeydhcmlhLWxhYmVsJzogJ0xvZyBXcml0aW5nIEFjdGl2aXR5IEZvcm0nfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBmb3JtID0gY29udGFpbmVyLmNyZWF0ZUVsKCdmb3JtJywge1xuICAgICAgICAgICAgY2xzOiAnbG9nLWZvcm0nLFxuICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgIHJvbGU6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICdXcml0aW5nIGFjdGl2aXR5IGxvZyBmb3JtJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtLm9uc3VibWl0ID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBEdXJhdGlvbiBmaWVsZFxuICAgICAgICBjb25zdCBkdXJhdGlvbkdyb3VwID0gZm9ybS5jcmVhdGVEaXYoJ2Zvcm0tZ3JvdXAnKTtcbiAgICAgICAgZHVyYXRpb25Hcm91cC5jcmVhdGVFbCgnbGFiZWwnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnRHVyYXRpb24gKG1pbnV0ZXMpJyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ2R1cmF0aW9uLWlucHV0J31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kdXJhdGlvbkZpZWxkID0gZHVyYXRpb25Hcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICBpZDogJ2R1cmF0aW9uLWlucHV0JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJzI1JyxcbiAgICAgICAgICAgICAgICBtaW46ICcxJyxcbiAgICAgICAgICAgICAgICBtYXg6ICc0ODAnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAndHJ1ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWN0aXZpdHkgZmllbGRcbiAgICAgICAgY29uc3QgYWN0aXZpdHlHcm91cCA9IGZvcm0uY3JlYXRlRGl2KCdmb3JtLWdyb3VwJyk7XG4gICAgICAgIGFjdGl2aXR5R3JvdXAuY3JlYXRlRWwoJ2xhYmVsJywge1xuICAgICAgICAgICAgdGV4dDogJ0FjdGl2aXR5IERlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ2FjdGl2aXR5LWlucHV0J31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hY3Rpdml0eUZpZWxkID0gYWN0aXZpdHlHcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhY3Rpdml0eS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdwcmV3cml0aW5nJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ3RydWUnLFxuICAgICAgICAgICAgICAgICdhcmlhLXJlcXVpcmVkJzogJ3RydWUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByb2plY3QgZmllbGRcbiAgICAgICAgY29uc3QgcHJvamVjdEdyb3VwID0gZm9ybS5jcmVhdGVEaXYoJ2Zvcm0tZ3JvdXAnKTtcbiAgICAgICAgcHJvamVjdEdyb3VwLmNyZWF0ZUVsKCdsYWJlbCcsIHtcbiAgICAgICAgICAgIHRleHQ6ICdQcm9qZWN0JyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ3Byb2plY3QtaW5wdXQnfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb2plY3RGaWVsZCA9IHByb2plY3RHcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwcm9qZWN0LWlucHV0JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3NhdmUgdGhlIGNhdCcsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAnZmFsc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZsdWVuY3kgUmF0aW5nXG4gICAgICAgIGNvbnN0IGZsdWVuY3lHcm91cCA9IGZvcm0uY3JlYXRlRGl2KCdmb3JtLWdyb3VwJyk7XG4gICAgICAgIGZsdWVuY3lHcm91cC5jcmVhdGVFbCgnbGFiZWwnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnRmx1ZW5jeSBSYXRpbmcgKDEtMTApJyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ2ZsdWVuY3ktaW5wdXQnfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZsdWVuY3lGaWVsZCA9IGZsdWVuY3lHcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAncmFuZ2UnLFxuICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgIGlkOiAnZmx1ZW5jeS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgbWluOiAnMScsXG4gICAgICAgICAgICAgICAgbWF4OiAnMTAnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNScsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAnZmFsc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdvcmQgQ291bnRcbiAgICAgICAgY29uc3Qgd29yZENvdW50R3JvdXAgPSBmb3JtLmNyZWF0ZURpdignZm9ybS1ncm91cCcpO1xuICAgICAgICB3b3JkQ291bnRHcm91cC5jcmVhdGVFbCgnbGFiZWwnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnV29yZCBDb3VudCcsXG4gICAgICAgICAgICBhdHRyOiB7J2Zvcic6ICd3b3JkY291bnQtaW5wdXQnfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndvcmRDb3VudEZpZWxkID0gd29yZENvdW50R3JvdXAuY3JlYXRlRWwoJ2lucHV0Jywge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICd3b3JkY291bnQtaW5wdXQnLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnMCcsXG4gICAgICAgICAgICAgICAgbWluOiAnMCcsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAnZmFsc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByb2Nlc3MgTm90ZXNcbiAgICAgICAgY29uc3Qgbm90ZXNHcm91cCA9IGZvcm0uY3JlYXRlRGl2KCdmb3JtLWdyb3VwJyk7XG4gICAgICAgIG5vdGVzR3JvdXAuY3JlYXRlRWwoJ2xhYmVsJywge1xuICAgICAgICAgICAgdGV4dDogJ1Byb2Nlc3MgTm90ZXMgKE9wdGlvbmFsKScsXG4gICAgICAgICAgICBhdHRyOiB7J2Zvcic6ICdub3Rlcy1pbnB1dCd9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm90ZXNGaWVsZCA9IG5vdGVzR3JvdXAuY3JlYXRlRWwoJ3RleHRhcmVhJywge1xuICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgIGlkOiAnbm90ZXMtaW5wdXQnLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnSG93IGRpZCB0aGUgd3JpdGluZyBnbz8gQW55IGNoYWxsZW5nZXMgb3IgYnJlYWt0aHJvdWdocz8nLFxuICAgICAgICAgICAgICAgIHJvd3M6ICczJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1yZXF1aXJlZCc6ICdmYWxzZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRXJyb3IgbWVzc2FnZSBjb250YWluZXJcbiAgICAgICAgdGhpcy5lcnJvclRleHQgPSBmb3JtLmNyZWF0ZURpdignZXJyb3ItdGV4dCcpO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYWxlcnQnKTtcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG5cbiAgICAgICAgLy8gQnV0dG9uIGNvbnRhaW5lclxuICAgICAgICBjb25zdCBidXR0b25Db250YWluZXIgPSBmb3JtLmNyZWF0ZURpdignYnV0dG9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gYnV0dG9uQ29udGFpbmVyLmNyZWF0ZUVsKCdidXR0b24nLCB7XG4gICAgICAgICAgICB0ZXh0OiAnTG9nIEFjdGl2aXR5JyxcbiAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICdTdWJtaXQgYWN0aXZpdHkgbG9nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbkZpZWxkLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAhZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZHVyYXRpb25GaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGl2aXR5RmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUlucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlSW50KHRoaXMuZHVyYXRpb25GaWVsZC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGFjdGl2aXR5ID0gdGhpcy5hY3Rpdml0eUZpZWxkLnZhbHVlLnRyaW0oKTtcblxuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIGlmICghZHVyYXRpb24gfHwgZHVyYXRpb24gPCAxIHx8IGR1cmF0aW9uID4gNDgwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcignRHVyYXRpb24gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDQ4MCBtaW51dGVzJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcignUGxlYXNlIGVudGVyIGFuIGFjdGl2aXR5IGRlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lcnJvclRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc3R5bGUucGFkZGluZyA9ICc4cHgnO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5tYXJnaW5Ub3AgPSAnOHB4JztcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0LnNldEF0dHJpYnV0ZSgncm9sZScsICdhbGVydCcpO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdhc3NlcnRpdmUnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlSW5wdXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeTogTG9nRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHBhcnNlSW50KHRoaXMuZHVyYXRpb25GaWVsZC52YWx1ZSksXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6IHRoaXMuYWN0aXZpdHlGaWVsZC52YWx1ZS50cmltKCksXG4gICAgICAgICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0RmllbGQudmFsdWUudHJpbSgpLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGZsdWVuY3k6IHBhcnNlSW50KHRoaXMuZmx1ZW5jeUZpZWxkLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB3b3JkQ291bnQ6IHBhcnNlSW50KHRoaXMud29yZENvdW50RmllbGQudmFsdWUpIHx8IDAsXG4gICAgICAgICAgICAgICAgbm90ZXM6IHRoaXMubm90ZXNGaWVsZC52YWx1ZS50cmltKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIGxvZzonLCBlbnRyeSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5sb2dFbnRyeShlbnRyeSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTdWJtaXQgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3Igb2NjdXJyZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcbiAgICAgICAgY29udGVudEVsLmVtcHR5KCk7XG4gICAgfVxufSIsImltcG9ydCB7IEFwcCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgTG9nTW9kYWwsIExvZ0VudHJ5IH0gZnJvbSAnLi9sb2ctbW9kYWwnO1xuXG5pbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuICAgIHNjcmlwdFVybDogc3RyaW5nO1xuICAgIGFwaUtleTogc3RyaW5nO1xuICAgIHRhcmdldEZpbGVQYXRoOiBzdHJpbmc7XG4gICAgdGltZXJEdXJhdGlvbjogbnVtYmVyO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcbiAgICBzY3JpcHRVcmw6ICcnLFxuICAgIGFwaUtleTogJycsXG4gICAgdGFyZ2V0RmlsZVBhdGg6ICcnLFxuICAgIHRpbWVyRHVyYXRpb246IDI1ICogNjBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3M7XG4gICAgdGltZXI6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCA9IG51bGw7XG4gICAgdGltZVJlbWFpbmluZzogbnVtYmVyID0gMDtcbiAgICBpc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgICAvLyBBZGQgdGltZXIgcmliYm9uIGljb25cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdjbG9jaycsICdTdGFydCBUaW1lcicsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGxvZ2dpbmcgcmliYm9uIGljb25cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdib29rLWhlYXJ0JywgJ0xvZyBXcml0aW5nIEFjdGl2aXR5JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZSgnUGxlYXNlIGNvbmZpZ3VyZSB0YXJnZXQgZmlsZSBwYXRoIGluIHNldHRpbmdzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aCh0aGlzLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoKTtcbiAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1dyaXRpbmcgbG9nIGZpbGUgbm90IGZvdW5kLiBQbGVhc2UgY3JlYXRlIGl0IG9yIGNoZWNrIHRoZSBwYXRoIGluIHNldHRpbmdzLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBuZXcgTG9nTW9kYWwodGhpcy5hcHAsIHRoaXMpLm9wZW4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBUaW1lclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckludGVydmFsKHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmNoZWNrVGltZXIoKSwgMTAwMCkpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ3Rlc3Qtc2hlZXRzLWNvbm5lY3Rpb24nLFxuICAgICAgICAgICAgbmFtZTogJ1Rlc3QgR29vZ2xlIFNoZWV0cyBDb25uZWN0aW9uJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdERhdGE6IExvZ0VudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ3Rlc3QgZW50cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdDogJ3Rlc3QgcHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdWVuY3k6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkQ291bnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVzOiAnVGhpcyBpcyBhIHRlc3QgZW50cnknXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VibWl0VG9TaGVldHModGVzdERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKCdUZXN0IHN1Ym1pc3Npb24gc3VjY2Vzc2Z1bCEnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUZXN0IHN1Ym1pc3Npb24gZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgVGVzdCBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIGFzeW5jIHBhcnNlQW5kTG9nKGNvbW1hbmQ6IHN0cmluZywgcHJvamVjdD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCByZWdleCA9IC9ndXMgbG9nIChcXGQrKW0gKC4rKSQvO1xuICAgICAgICBjb25zdCBtYXRjaCA9IGNvbW1hbmQubWF0Y2gocmVnZXgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm1hdC4gVXNlOiBndXMgbG9nIDxtaW51dGVzPm0gPGFjdGl2aXR5PicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IFtfLCBkdXJhdGlvbiwgYWN0aXZpdHldID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uTnVtID0gcGFyc2VJbnQoZHVyYXRpb24pO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uTnVtKSB8fCBkdXJhdGlvbk51bSA8IDEgfHwgZHVyYXRpb25OdW0gPiA0ODApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVyYXRpb24gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDQ4MCBtaW51dGVzJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dFbnRyeSh7XG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25OdW0sXG4gICAgICAgICAgICBhY3Rpdml0eTogYWN0aXZpdHkudHJpbSgpLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICBwcm9qZWN0OiBwcm9qZWN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ0VudHJ5KGVudHJ5OiBMb2dFbnRyeSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU3VibWl0IHRvIEdvb2dsZSBTaGVldHNcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VibWl0VG9TaGVldHMoZW50cnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gbG9jYWwgZmlsZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBlbmRUb0ZpbGUoZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0FjdGl2aXR5IGxvZ2dlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvZ2dpbmcgYWN0aXZpdHk6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9nIGFjdGl2aXR5LiBQbGVhc2UgY2hlY2sgeW91ciBzZXR0aW5ncyBhbmQgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3VibWl0VG9TaGVldHMoZW50cnk6IExvZ0VudHJ5KSB7XG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5zY3JpcHRVcmwgfHwgIXRoaXMuc2V0dGluZ3MuYXBpS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBjb25maWd1cmUgYm90aCB0aGUgQXBwcyBTY3JpcHQgVVJMIGFuZCBBUEkga2V5IGluIHNldHRpbmdzJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFBcnJheSA9IFtcbiAgICAgICAgICAgICAgICBlbnRyeS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGVudHJ5LmFjdGl2aXR5LFxuICAgICAgICAgICAgICAgIGVudHJ5LnByb2plY3QgfHwgJycsXG4gICAgICAgICAgICAgICAgU3RyaW5nKGVudHJ5LmR1cmF0aW9uKSxcbiAgICAgICAgICAgICAgICBTdHJpbmcoZW50cnkuZmx1ZW5jeSB8fCAnJyksXG4gICAgICAgICAgICAgICAgU3RyaW5nKGVudHJ5LndvcmRDb3VudCB8fCAnJyksXG4gICAgICAgICAgICAgICAgZW50cnkubm90ZXMgfHwgJydcbiAgICAgICAgICAgIF07XG4gICAgXG4gICAgICAgICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5zZXR0aW5ncy5zY3JpcHRVcmw7XG4gICAgICAgICAgICBjb25zdCBhcGlLZXkgPSB0aGlzLnNldHRpbmdzLmFwaUtleTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9P2FwaUtleT0ke2VuY29kZVVSSUNvbXBvbmVudChhcGlLZXkpfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBHRVQgcmVxdWVzdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIG1vZGU6ICduby1jb3JzJywgIC8vIEtlZXAgdGhpcyBmb3IgQ09SUyBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YUFycmF5KVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBXaXRoIG5vLWNvcnMgbW9kZSwgd2UgY2FuJ3QgcmVhZCB0aGUgcmVzcG9uc2VcbiAgICAgICAgICAgIC8vIFNvIHdlJ2xsIGFzc3VtZSBzdWNjZXNzIGlmIHdlIGdldCBoZXJlIHdpdGhvdXQgdGhyb3dpbmdcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzdWJtaXQgdG8gR29vZ2xlIFNoZWV0czonLCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBzdWJtaXQgdG8gR29vZ2xlIFNoZWV0cycpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIGFzeW5jIGFwcGVuZFRvRmlsZShlbnRyeTogTG9nRW50cnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoO1xuICAgICAgICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBmaWxlIHBhdGggbm90IGNvbmZpZ3VyZWQnKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGBcbiAgICAtIEFjdGl2aXR5OiAke2VudHJ5LmFjdGl2aXR5fVxuICAgIC0gRHVyYXRpb246ICR7ZW50cnkuZHVyYXRpb259IG1pbnV0ZXNcbiAgICAtIFByb2plY3Q6ICR7ZW50cnkucHJvamVjdCB8fCAnTm8gcHJvamVjdCd9XG4gICAgLSBUaW1lc3RhbXA6ICR7bmV3IERhdGUoZW50cnkudGltZXN0YW1wIHx8IERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgLSBGbHVlbmN5OiAke2VudHJ5LmZsdWVuY3kgfHwgJ05vdCByYXRlZCd9LzEwXG4gICAgLSBXb3JkIENvdW50OiAke2VudHJ5LndvcmRDb3VudCB8fCAnMCd9XG4gICAgLSBQcm9jZXNzIE5vdGVzOiAke2VudHJ5Lm5vdGVzIHx8ICdOb25lJ31cbiAgICBcbiAgICAqKlxuICAgICAgICAgICAgYDtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBgJHtjdXJyZW50Q29udGVudH1cXG4ke2NvbnRlbnR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIGZpbGU6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gc2F2ZSBsb2cgZW50cnkgdG8gZmlsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRUaW1lcigpIHtcbiAgICAgICAgdGhpcy50aW1lUmVtYWluaW5nID0gdGhpcy5zZXR0aW5ncy50aW1lckR1cmF0aW9uO1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tUaW1lcigpO1xuICAgICAgICBuZXcgTm90aWNlKGBUaW1lciBzdGFydGVkOiAke01hdGguZmxvb3IodGhpcy5zZXR0aW5ncy50aW1lckR1cmF0aW9uIC8gNjApfSBtaW51dGVzYCk7XG4gICAgfVxuXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbmV3IE5vdGljZSgnVGltZXIgc3RvcHBlZCcpO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrVGltZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGltZVJlbWFpbmluZy0tO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudGltZVJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5vblRpbWVyQ29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9uVGltZXJDb21wbGV0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nRW50cnkoe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNldHRpbmdzLnRpbWVyRHVyYXRpb24gLyA2MCxcbiAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ1RpbWVyIFNlc3Npb24nLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbmV3IE5vdGljZSgnVGltZXIgY29tcGxldGUhIFNlc3Npb24gbG9nZ2VkLicpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9nZ2luZyB0aW1lciBzZXNzaW9uOicsIGVycm9yKTtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1RpbWVyIGNvbXBsZXRlLCBidXQgZmFpbGVkIHRvIGxvZyBzZXNzaW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRpbWVyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogVGltZXJQbHVnaW47XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBUaW1lclBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuICAgICAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnV3JpdGluZyBUaW1lciBTZXR0aW5ncyd9KTtcblxuICAgICAgICAvLyBGaWxlIFNldHRpbmdzIFNlY3Rpb25cbiAgICAgICAgLy8gSW4gVGltZXJTZXR0aW5nVGFiIGNsYXNzLCB1cGRhdGUgdGhlIGRpc3BsYXkgbWV0aG9kIGZpbGUgc2V0dGluZ3Mgc2VjdGlvbjpcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnVGFyZ2V0IEZpbGUgUGF0aCcpXG4gICAgICAgICAgICAuc2V0RGVzYygnUGF0aCB0byB5b3VyIHdyaXRpbmcgbG9nIGZpbGUgKGUuZy4gXCJXcml0aW5nIExvZy5tZFwiIG9yIFwiRm9sZGVyL1dyaXRpbmcgTG9nLm1kXCIpJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignV3JpdGluZyBMb2cubWQnKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50YXJnZXRGaWxlUGF0aClcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAvLyBBZGQgZmlsZSBwYXRoIGhlbHAgdGV4dFxuICAgICAgICBjb25zdCBoZWxwTGlzdCA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgICAgICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nXG4gICAgICAgIH0pO1xuICAgICAgICBoZWxwTGlzdC5jcmVhdGVFbCgncCcsIHtcbiAgICAgICAgICAgIHRleHQ6ICdGaWxlIHBhdGggZXhhbXBsZXM6J1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhhbXBsZXMgPSBbXG4gICAgICAgICAgICAnXCJXcml0aW5nIExvZy5tZFwiIC0gSW4gdmF1bHQgcm9vdCcsXG4gICAgICAgICAgICAnXCJOb3Rlcy9Xcml0aW5nIExvZy5tZFwiIC0gSW4gTm90ZXMgZm9sZGVyJyxcbiAgICAgICAgICAgICdcIkRhaWx5IE5vdGVzL1dyaXRpbmcvTG9nLm1kXCIgLSBOZXN0ZWQgZm9sZGVycydcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgdWwgPSBoZWxwTGlzdC5jcmVhdGVFbCgndWwnKTtcbiAgICAgICAgZXhhbXBsZXMuZm9yRWFjaChleGFtcGxlID0+IHtcbiAgICAgICAgICAgIHVsLmNyZWF0ZUVsKCdsaScsIHt0ZXh0OiBleGFtcGxlfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBoZWxwTGlzdC5jcmVhdGVFbCgncCcsIHtcbiAgICAgICAgICAgIHRleHQ6ICdOb3RlOiBUaGUgZmlsZSBtdXN0IGFscmVhZHkgZXhpc3QgaW4geW91ciB2YXVsdC4gQ3JlYXRlIGl0IGZpcnN0LCB0aGVuIGVudGVyIGl0cyBwYXRoIGhlcmUuJ1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUaW1lciBTZXR0aW5ncyBTZWN0aW9uXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycsIHt0ZXh0OiAnVGltZXIgU2V0dGluZ3MnfSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnVGltZXIgRHVyYXRpb24nKVxuICAgICAgICAgICAgLnNldERlc2MoJ0RlZmF1bHQgZHVyYXRpb24gZm9yIHRoZSB3cml0aW5nIHRpbWVyIChpbiBtaW51dGVzKScpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJzI1JylcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoU3RyaW5nKHRoaXMucGx1Z2luLnNldHRpbmdzLnRpbWVyRHVyYXRpb24gLyA2MCkpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihkdXJhdGlvbikgJiYgZHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50aW1lckR1cmF0aW9uID0gZHVyYXRpb24gKiA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIEdvb2dsZSBTaGVldHMgSW50ZWdyYXRpb24gU2VjdGlvblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ0dvb2dsZSBTaGVldHMgSW50ZWdyYXRpb24nfSk7XG4gICAgICAgIFxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdBcHBzIFNjcmlwdCBVUkwnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1VSTCBvZiB5b3VyIEdvb2dsZSBBcHBzIFNjcmlwdCB3ZWIgYXBwJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS8uLi4nKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0FQSSBLZXknKVxuICAgICAgICAgICAgLnNldERlc2MoJ0FQSSBrZXkgZm9yIEdvb2dsZSBTaGVldHMgYXV0aGVudGljYXRpb24nKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdFbnRlciB5b3VyIEFQSSBrZXknKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFNldHVwIEluc3RydWN0aW9uc1xuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ1NldHVwIEluc3RydWN0aW9ucyd9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtcbiAgICAgICAgICAgICcxLiBDcmVhdGUgYSBjb3B5IG9mIHRoZSB0ZW1wbGF0ZSBHb29nbGUgU2hlZXQnLFxuICAgICAgICAgICAgJzIuIEluIHRoZSBzaGVldCwgZ28gdG8gRXh0ZW5zaW9ucyA+IEFwcHMgU2NyaXB0JyxcbiAgICAgICAgICAgICczLiBDb3B5IHRoZSBBcHBzIFNjcmlwdCBjb2RlIGludG8gdGhlIHNjcmlwdCBlZGl0b3InLFxuICAgICAgICAgICAgJzQuIENsaWNrIHNhdmUgaWNvbiB0byBzYXZlIHRvIERyaXZlJyxcbiAgICAgICAgICAgICc1LiBSdW4gdGhlIHNldHVwQXBpS2V5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHlvdXIgQVBJIGtleScsXG4gICAgICAgICAgICAnNi4gRGVwbG95IGFzIGEgd2ViIGFwcDonLFxuICAgICAgICAgICAgJ1xcdFxcdC0gRXhlY3V0ZSBhczogTWUnLFxuICAgICAgICAgICAgJ1xcdFxcdC0gV2hvIGhhcyBhY2Nlc3M6IEFueW9uZSB3aXRoIEdvb2dsZSBBY2NvdW50JyxcbiAgICAgICAgICAgICc3LiBDb3B5IHRoZSBkZXBsb3ltZW50IFVSTCBhbmQgQVBJIGtleSBpbnRvIHRoZXNlIHNldHRpbmdzJ1xuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9uc0xpc3QgPSBjb250YWluZXJFbC5jcmVhdGVFbCgnZGl2Jywge1xuICAgICAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpbnN0cnVjdGlvbnMuZm9yRWFjaChpbnN0cnVjdGlvbiA9PiB7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnNMaXN0LmNyZWF0ZUVsKCdkaXYnLCB7dGV4dDogaW5zdHJ1Y3Rpb259KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJuYW1lcyI6WyJNb2RhbCIsIk5vdGljZSIsIlRGaWxlIiwiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQW9GRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLFFBQVEsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDck0sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtBQUN0RCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxH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QUFBLEVBQUEsWUFBQTs7Ozt3QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUs7QUFDdEMsd0JBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFBOztBQUFoQyx3QkFBQSxFQUFBLENBQUEsSUFBQSxFQUFnQzs7OzthQUNuQyxDQUFDLENBQUEsRUFBQSxDQUFDO1FBRVgsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXO2FBQ2xCLE9BQU8sQ0FBQyxTQUFTO2FBQ2pCLE9BQU8sQ0FBQywwQ0FBMEM7QUFDbEQsYUFBQSxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUEsRUFBSSxPQUFBO2FBQ1osY0FBYyxDQUFDLG9CQUFvQjthQUNuQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTthQUNwQyxRQUFRLENBQUMsVUFBTyxLQUFLLEVBQUEsRUFBQSxPQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsU0FBQSxFQUFBLFNBQUEsRUFBQSxZQUFBOzs7O3dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSztBQUNuQyx3QkFBQSxPQUFBLENBQUEsQ0FBQSxZQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUE7O0FBQWhDLHdCQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQWdDOzs7O2FBQ25DLENBQUMsQ0FBQSxFQUFBLENBQUM7O1FBR1gsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQztBQUV4RCxRQUFBLElBQU0sWUFBWSxHQUFHO1lBQ2pCLCtDQUErQztZQUMvQyxpREFBaUQ7WUFDakQscURBQXFEO1lBQ3JELHFDQUFxQztZQUNyQywwREFBMEQ7WUFDMUQseUJBQXlCO1lBQ3pCLHNCQUFzQjtZQUN0QixrREFBa0Q7WUFDbEQ7U0FDSDtBQUVELFFBQUEsSUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtBQUNqRCxZQUFBLEdBQUcsRUFBRTtBQUNSLFNBQUEsQ0FBQztBQUVGLFFBQUEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFdBQVcsRUFBQTtZQUM1QixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQ3pELFNBQUMsQ0FBQztLQUNMO0lBQ0wsT0FBQyxlQUFBO0FBQUQsQ0FoSEEsQ0FBOEJDLHlCQUFnQixDQWdIN0MsQ0FBQTs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19

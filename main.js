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

var DEFAULT_SETTINGS = {
    scriptUrl: '',
    apiKey: '',
    targetFilePath: '',
    timerDuration: 25 * 60
};
var LogModal = /** @class */ (function (_super) {
    __extends(LogModal, _super);
    function LogModal(app, plugin) {
        var _this = _super.call(this, app) || this;
        _this.plugin = plugin;
        return _this;
    }
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
        // this.cancelButton = buttonContainer.createEl('button', {
        //     text: 'Cancel',
        //     attr: {
        //         type: 'button',
        //         'aria-label': 'Cancel logging'
        //     }
        // });
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
        // Make errors more noticeable
        this.errorText.style.padding = '8px';
        this.errorText.style.marginTop = '8px';
        this.errorText.style.marginBottom = '8px';
        // Ensure screen readers announce the error
        this.errorText.setAttribute('role', 'alert');
        this.errorText.setAttribute('aria-live', 'assertive');
    };
    LogModal.prototype.handleSubmit = function () {
        return __awaiter(this, undefined, undefined, function () {
            var duration, activity, project, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateInput()) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        duration = this.durationField.value;
                        activity = this.activityField.value.trim();
                        project = this.projectField.value.trim();
                        console.log('Submitting log:', { duration: duration, activity: activity, project: project });
                        // This will now show the specific API error or network error
                        return [4 /*yield*/, this.plugin.parseAndLog("gus log ".concat(duration, "m ").concat(activity), project)];
                    case 2:
                        // This will now show the specific API error or network error
                        _a.sent();
                        this.close();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // Show the actual error message from the API or network call
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
                        return [4 /*yield*/, this.submitToSheets({
                                timestamp: entry.timestamp || new Date().toISOString(),
                                duration: entry.duration,
                                activity: entry.activity,
                                project: entry.project // Add this line
                            })];
                    case 1:
                        // Submit to Google Sheets
                        _a.sent();
                        console.log('trying to submit to sheets');
                        // Append to local file
                        return [4 /*yield*/, this.appendToFile("\n- Activity: ".concat(entry.activity, "\n- Duration: ").concat(entry.duration, " minutes\n- Project: ").concat(entry.project || 'No project', "\n- Timestamp: ").concat(new Date(entry.timestamp || Date.now()).toLocaleString(), "\n- Process Notes: \n\n**\n    "))];
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
    // In main.ts, update the submitToSheets method:
    TimerPlugin.prototype.submitToSheets = function (data) {
        return __awaiter(this, undefined, undefined, function () {
            var baseUrl, apiKey, url, preflightUrl, response, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.settings.scriptUrl || !this.settings.apiKey) {
                            throw new Error('Please configure both the Apps Script URL and API key in settings');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        baseUrl = this.settings.scriptUrl;
                        apiKey = this.settings.apiKey;
                        url = "".concat(baseUrl, "?apiKey=").concat(encodeURIComponent(apiKey));
                        console.log('Submission URL:', url);
                        console.log('Submission Data:', JSON.stringify(data));
                        preflightUrl = "".concat(baseUrl, "?cors=preflight&apiKey=").concat(encodeURIComponent(apiKey));
                        console.log('Preflight URL:', preflightUrl);
                        return [4 /*yield*/, fetch(preflightUrl, { method: 'GET' })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        console.log('Response status:', response.status);
                        return [4 /*yield*/, response.json()];
                    case 4:
                        result = _a.sent();
                        console.log('Submission result:', result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.error('Detailed submission error:', error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TimerPlugin.prototype.appendToFile = function (content) {
        return __awaiter(this, undefined, undefined, function () {
            var filePath, file, currentContent, error_4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XG5cbmludGVyZmFjZSBMb2dFbnRyeSB7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBhY3Rpdml0eTogc3RyaW5nO1xuICAgIHRpbWVzdGFtcD86IHN0cmluZztcbiAgICBwcm9qZWN0Pzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuICAgIHNjcmlwdFVybDogc3RyaW5nO1xuICAgIGFwaUtleTogc3RyaW5nO1xuICAgIHRhcmdldEZpbGVQYXRoOiBzdHJpbmc7XG4gICAgdGltZXJEdXJhdGlvbjogbnVtYmVyO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcbiAgICBzY3JpcHRVcmw6ICcnLFxuICAgIGFwaUtleTogJycsXG4gICAgdGFyZ2V0RmlsZVBhdGg6ICcnLFxuICAgIHRpbWVyRHVyYXRpb246IDI1ICogNjBcbn07XG5cbmNsYXNzIExvZ01vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIHByaXZhdGUgcGx1Z2luOiBUaW1lclBsdWdpbjtcbiAgICBwcml2YXRlIGlucHV0RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkdXJhdGlvbkZpZWxkOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByaXZhdGUgYWN0aXZpdHlGaWVsZDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIHByb2plY3RGaWVsZDogSFRNTElucHV0RWxlbWVudDsgIC8vIE5ldyBmaWVsZFxuICAgIHByaXZhdGUgZXJyb3JUZXh0OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogVGltZXJQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuIFxuICAgIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoJ2xvZy1tb2RhbC1jb250YWluZXInKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVFbCgnaDInLCB7XG4gICAgICAgICAgICB0ZXh0OiAnTG9nIFdyaXRpbmcgQWN0aXZpdHknLFxuICAgICAgICAgICAgYXR0cjogeydhcmlhLWxhYmVsJzogJ0xvZyBXcml0aW5nIEFjdGl2aXR5IEZvcm0nfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBmb3JtID0gY29udGFpbmVyLmNyZWF0ZUVsKCdmb3JtJywge1xuICAgICAgICAgICAgY2xzOiAnbG9nLWZvcm0nLFxuICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgIHJvbGU6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICdXcml0aW5nIGFjdGl2aXR5IGxvZyBmb3JtJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtLm9uc3VibWl0ID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBEdXJhdGlvbiBmaWVsZFxuICAgICAgICBjb25zdCBkdXJhdGlvbkdyb3VwID0gZm9ybS5jcmVhdGVEaXYoJ2Zvcm0tZ3JvdXAnKTtcbiAgICAgICAgZHVyYXRpb25Hcm91cC5jcmVhdGVFbCgnbGFiZWwnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnRHVyYXRpb24gKG1pbnV0ZXMpJyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ2R1cmF0aW9uLWlucHV0J31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kdXJhdGlvbkZpZWxkID0gZHVyYXRpb25Hcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICBpZDogJ2R1cmF0aW9uLWlucHV0JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJzI1JyxcbiAgICAgICAgICAgICAgICBtaW46ICcxJyxcbiAgICAgICAgICAgICAgICBtYXg6ICc0ODAnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAndHJ1ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWN0aXZpdHkgZmllbGRcbiAgICAgICAgY29uc3QgYWN0aXZpdHlHcm91cCA9IGZvcm0uY3JlYXRlRGl2KCdmb3JtLWdyb3VwJyk7XG4gICAgICAgIGFjdGl2aXR5R3JvdXAuY3JlYXRlRWwoJ2xhYmVsJywge1xuICAgICAgICAgICAgdGV4dDogJ0FjdGl2aXR5IERlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ2FjdGl2aXR5LWlucHV0J31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hY3Rpdml0eUZpZWxkID0gYWN0aXZpdHlHcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdhY3Rpdml0eS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdwcmV3cml0aW5nJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ3RydWUnLFxuICAgICAgICAgICAgICAgICdhcmlhLXJlcXVpcmVkJzogJ3RydWUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByb2plY3QgZmllbGRcbiAgICAgICAgY29uc3QgcHJvamVjdEdyb3VwID0gZm9ybS5jcmVhdGVEaXYoJ2Zvcm0tZ3JvdXAnKTtcbiAgICAgICAgcHJvamVjdEdyb3VwLmNyZWF0ZUVsKCdsYWJlbCcsIHtcbiAgICAgICAgICAgIHRleHQ6ICdQcm9qZWN0JyxcbiAgICAgICAgICAgIGF0dHI6IHsnZm9yJzogJ3Byb2plY3QtaW5wdXQnfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb2plY3RGaWVsZCA9IHByb2plY3RHcm91cC5jcmVhdGVFbCgnaW5wdXQnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdwcm9qZWN0LWlucHV0JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3NhdmUgdGhlIGNhdCcsXG4gICAgICAgICAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAnZmFsc2UnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEVycm9yIG1lc3NhZ2UgY29udGFpbmVyXG4gICAgICAgIHRoaXMuZXJyb3JUZXh0ID0gZm9ybS5jcmVhdGVEaXYoJ2Vycm9yLXRleHQnKTtcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuXG4gICAgICAgIC8vIEJ1dHRvbiBjb250YWluZXJcbiAgICAgICAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZm9ybS5jcmVhdGVEaXYoJ2J1dHRvbi1jb250YWluZXInKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGJ1dHRvbkNvbnRhaW5lci5jcmVhdGVFbCgnYnV0dG9uJywge1xuICAgICAgICAgICAgdGV4dDogJ0xvZyBBY3Rpdml0eScsXG4gICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAnU3VibWl0IGFjdGl2aXR5IGxvZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy5jYW5jZWxCdXR0b24gPSBidXR0b25Db250YWluZXIuY3JlYXRlRWwoJ2J1dHRvbicsIHtcbiAgICAgICAgLy8gICAgIHRleHQ6ICdDYW5jZWwnLFxuICAgICAgICAvLyAgICAgYXR0cjoge1xuICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAvLyAgICAgICAgICdhcmlhLWxhYmVsJzogJ0NhbmNlbCBsb2dnaW5nJ1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbkZpZWxkLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAhZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZHVyYXRpb25GaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGl2aXR5RmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUlucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlSW50KHRoaXMuZHVyYXRpb25GaWVsZC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGFjdGl2aXR5ID0gdGhpcy5hY3Rpdml0eUZpZWxkLnZhbHVlLnRyaW0oKTtcblxuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIGlmICghZHVyYXRpb24gfHwgZHVyYXRpb24gPCAxIHx8IGR1cmF0aW9uID4gNDgwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcignRHVyYXRpb24gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDQ4MCBtaW51dGVzJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcignUGxlYXNlIGVudGVyIGFuIGFjdGl2aXR5IGRlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lcnJvclRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgXG4gICAgICAgIC8vIE1ha2UgZXJyb3JzIG1vcmUgbm90aWNlYWJsZVxuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0LnN0eWxlLm1hcmdpblRvcCA9ICc4cHgnO1xuICAgICAgICB0aGlzLmVycm9yVGV4dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyZSBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSB0aGUgZXJyb3JcbiAgICAgICAgdGhpcy5lcnJvclRleHQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ2Fzc2VydGl2ZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaGFuZGxlU3VibWl0KCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbkZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZpdHkgPSB0aGlzLmFjdGl2aXR5RmllbGQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdEZpZWxkLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgbG9nOicsIHsgZHVyYXRpb24sIGFjdGl2aXR5LCBwcm9qZWN0IH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgbm93IHNob3cgdGhlIHNwZWNpZmljIEFQSSBlcnJvciBvciBuZXR3b3JrIGVycm9yXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5wYXJzZUFuZExvZyhgZ3VzIGxvZyAke2R1cmF0aW9ufW0gJHthY3Rpdml0eX1gLCBwcm9qZWN0KTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFNob3cgdGhlIGFjdHVhbCBlcnJvciBtZXNzYWdlIGZyb20gdGhlIEFQSSBvciBuZXR3b3JrIGNhbGxcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1N1Ym1pdCBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnVW5rbm93biBlcnJvciBvY2N1cnJlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgY29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3M7XG4gICAgdGltZXI6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCA9IG51bGw7XG4gICAgdGltZVJlbWFpbmluZzogbnVtYmVyID0gMDtcbiAgICBpc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgICAvLyBBZGQgdGltZXIgcmliYm9uIGljb25cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdjbG9jaycsICdTdGFydCBUaW1lcicsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGxvZ2dpbmcgcmliYm9uIGljb25cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdib29rLWhlYXJ0JywgJ0xvZyBXcml0aW5nIEFjdGl2aXR5JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZSgnUGxlYXNlIGNvbmZpZ3VyZSB0YXJnZXQgZmlsZSBwYXRoIGluIHNldHRpbmdzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aCh0aGlzLnNldHRpbmdzLnRhcmdldEZpbGVQYXRoKTtcbiAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1dyaXRpbmcgbG9nIGZpbGUgbm90IGZvdW5kLiBQbGVhc2UgY3JlYXRlIGl0IG9yIGNoZWNrIHRoZSBwYXRoIGluIHNldHRpbmdzLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBuZXcgTG9nTW9kYWwodGhpcy5hcHAsIHRoaXMpLm9wZW4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBUaW1lclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckludGVydmFsKHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmNoZWNrVGltZXIoKSwgMTAwMCkpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIGFzeW5jIHBhcnNlQW5kTG9nKGNvbW1hbmQ6IHN0cmluZywgcHJvamVjdD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCByZWdleCA9IC9ndXMgbG9nIChcXGQrKW0gKC4rKSQvO1xuICAgICAgICBjb25zdCBtYXRjaCA9IGNvbW1hbmQubWF0Y2gocmVnZXgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm1hdC4gVXNlOiBndXMgbG9nIDxtaW51dGVzPm0gPGFjdGl2aXR5PicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IFtfLCBkdXJhdGlvbiwgYWN0aXZpdHldID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uTnVtID0gcGFyc2VJbnQoZHVyYXRpb24pO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uTnVtKSB8fCBkdXJhdGlvbk51bSA8IDEgfHwgZHVyYXRpb25OdW0gPiA0ODApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVyYXRpb24gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDQ4MCBtaW51dGVzJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dFbnRyeSh7XG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25OdW0sXG4gICAgICAgICAgICBhY3Rpdml0eTogYWN0aXZpdHkudHJpbSgpLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICBwcm9qZWN0OiBwcm9qZWN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ0VudHJ5KGVudHJ5OiBMb2dFbnRyeSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU3VibWl0IHRvIEdvb2dsZSBTaGVldHNcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VibWl0VG9TaGVldHMoe1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZW50cnkudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZW50cnkuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6IGVudHJ5LmFjdGl2aXR5LFxuICAgICAgICAgICAgICAgIHByb2plY3Q6IGVudHJ5LnByb2plY3QgIC8vIEFkZCB0aGlzIGxpbmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeWluZyB0byBzdWJtaXQgdG8gc2hlZXRzJykgICAgXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gbG9jYWwgZmlsZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBlbmRUb0ZpbGUoYFxuLSBBY3Rpdml0eTogJHtlbnRyeS5hY3Rpdml0eX1cbi0gRHVyYXRpb246ICR7ZW50cnkuZHVyYXRpb259IG1pbnV0ZXNcbi0gUHJvamVjdDogJHtlbnRyeS5wcm9qZWN0IHx8ICdObyBwcm9qZWN0J31cbi0gVGltZXN0YW1wOiAke25ldyBEYXRlKGVudHJ5LnRpbWVzdGFtcCB8fCBEYXRlLm5vdygpKS50b0xvY2FsZVN0cmluZygpfVxuLSBQcm9jZXNzIE5vdGVzOiBcblxuKipcbiAgICBgKTtcbiAgICBcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0FjdGl2aXR5IGxvZ2dlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvZ2dpbmcgYWN0aXZpdHk6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9nIGFjdGl2aXR5LiBQbGVhc2UgY2hlY2sgeW91ciBzZXR0aW5ncyBhbmQgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyBJbiBtYWluLnRzLCB1cGRhdGUgdGhlIHN1Ym1pdFRvU2hlZXRzIG1ldGhvZDpcbiAgICBhc3luYyBzdWJtaXRUb1NoZWV0cyhkYXRhOiB7IHRpbWVzdGFtcDogc3RyaW5nOyBkdXJhdGlvbjogbnVtYmVyOyBhY3Rpdml0eTogc3RyaW5nOyBwcm9qZWN0Pzogc3RyaW5nIH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnNjcmlwdFVybCB8fCAhdGhpcy5zZXR0aW5ncy5hcGlLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNvbmZpZ3VyZSBib3RoIHRoZSBBcHBzIFNjcmlwdCBVUkwgYW5kIEFQSSBrZXkgaW4gc2V0dGluZ3MnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5zZXR0aW5ncy5zY3JpcHRVcmw7XG4gICAgICAgICAgICBjb25zdCBhcGlLZXkgPSB0aGlzLnNldHRpbmdzLmFwaUtleTtcblxuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7YmFzZVVybH0/YXBpS2V5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFwaUtleSl9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXNzaW9uIFVSTDonLCB1cmwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pc3Npb24gRGF0YTonLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByZWZsaWdodFVybCA9IGAke2Jhc2VVcmx9P2NvcnM9cHJlZmxpZ2h0JmFwaUtleT0ke2VuY29kZVVSSUNvbXBvbmVudChhcGlLZXkpfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJlZmxpZ2h0IFVSTDonLCBwcmVmbGlnaHRVcmwpO1xuICAgICAgICAgICAgYXdhaXQgZmV0Y2gocHJlZmxpZ2h0VXJsLCB7IG1ldGhvZDogJ0dFVCcgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zZSBzdGF0dXM6JywgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IGVycm9yVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKCdGdWxsIHJlc3BvbnNlIHRleHQ6JywgZXJyb3JUZXh0KTtcbiAgICAgICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9LCBtZXNzYWdlOiAke2Vycm9yVGV4dH1gKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pc3Npb24gcmVzdWx0OicsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIC8vIGlmIChyZXN1bHQuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlIHx8ICdVbmtub3duIGVycm9yIGZyb20gR29vZ2xlIFNoZWV0cycpO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEZXRhaWxlZCBzdWJtaXNzaW9uIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyB0byBhbGxvdyBjYWxsZXIgdG8gaGFuZGxlXG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuXG4gICAgYXN5bmMgYXBwZW5kVG9GaWxlKGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuc2V0dGluZ3MudGFyZ2V0RmlsZVBhdGg7XG4gICAgICAgIGlmICghZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IGZpbGUgcGF0aCBub3QgY29uZmlndXJlZCcpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgICAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgYCR7Y3VycmVudENvbnRlbnR9XFxuJHtjb250ZW50fWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd3JpdGluZyB0byBmaWxlOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgbG9nIGVudHJ5IHRvIGZpbGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IHRoaXMuc2V0dGluZ3MudGltZXJEdXJhdGlvbjtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoZWNrVGltZXIoKTtcbiAgICAgICAgbmV3IE5vdGljZShgVGltZXIgc3RhcnRlZDogJHtNYXRoLmZsb29yKHRoaXMuc2V0dGluZ3MudGltZXJEdXJhdGlvbiAvIDYwKX0gbWludXRlc2ApO1xuICAgIH1cblxuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG5ldyBOb3RpY2UoJ1RpbWVyIHN0b3BwZWQnKTtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1RpbWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRpbWVSZW1haW5pbmctLTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnRpbWVSZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25UaW1lckNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvblRpbWVyQ29tcGxldGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ0VudHJ5KHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zZXR0aW5ncy50aW1lckR1cmF0aW9uIC8gNjAsXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdUaW1lciBTZXNzaW9uJyxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1RpbWVyIGNvbXBsZXRlISBTZXNzaW9uIGxvZ2dlZC4nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvZ2dpbmcgdGltZXIgc2Vzc2lvbjonLCBlcnJvcik7XG4gICAgICAgICAgICBuZXcgTm90aWNlKCdUaW1lciBjb21wbGV0ZSwgYnV0IGZhaWxlZCB0byBsb2cgc2Vzc2lvbicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBUaW1lclNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IFRpbWVyUGx1Z2luO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogVGltZXJQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ1dyaXRpbmcgVGltZXIgU2V0dGluZ3MnfSk7XG5cbiAgICAgICAgLy8gRmlsZSBTZXR0aW5ncyBTZWN0aW9uXG4gICAgICAgIC8vIEluIFRpbWVyU2V0dGluZ1RhYiBjbGFzcywgdXBkYXRlIHRoZSBkaXNwbGF5IG1ldGhvZCBmaWxlIHNldHRpbmdzIHNlY3Rpb246XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1RhcmdldCBGaWxlIFBhdGgnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1BhdGggdG8geW91ciB3cml0aW5nIGxvZyBmaWxlIChlLmcuIFwiV3JpdGluZyBMb2cubWRcIiBvciBcIkZvbGRlci9Xcml0aW5nIExvZy5tZFwiKScpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ1dyaXRpbmcgTG9nLm1kJylcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGFyZ2V0RmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50YXJnZXRGaWxlUGF0aCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gQWRkIGZpbGUgcGF0aCBoZWxwIHRleHRcbiAgICAgICAgY29uc3QgaGVscExpc3QgPSBjb250YWluZXJFbC5jcmVhdGVFbCgnZGl2Jywge1xuICAgICAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJ1xuICAgICAgICB9KTtcbiAgICAgICAgaGVscExpc3QuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnRmlsZSBwYXRoIGV4YW1wbGVzOidcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGV4YW1wbGVzID0gW1xuICAgICAgICAgICAgJ1wiV3JpdGluZyBMb2cubWRcIiAtIEluIHZhdWx0IHJvb3QnLFxuICAgICAgICAgICAgJ1wiTm90ZXMvV3JpdGluZyBMb2cubWRcIiAtIEluIE5vdGVzIGZvbGRlcicsXG4gICAgICAgICAgICAnXCJEYWlseSBOb3Rlcy9Xcml0aW5nL0xvZy5tZFwiIC0gTmVzdGVkIGZvbGRlcnMnXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHVsID0gaGVscExpc3QuY3JlYXRlRWwoJ3VsJyk7XG4gICAgICAgIGV4YW1wbGVzLmZvckVhY2goZXhhbXBsZSA9PiB7XG4gICAgICAgICAgICB1bC5jcmVhdGVFbCgnbGknLCB7dGV4dDogZXhhbXBsZX0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaGVscExpc3QuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgICAgICB0ZXh0OiAnTm90ZTogVGhlIGZpbGUgbXVzdCBhbHJlYWR5IGV4aXN0IGluIHlvdXIgdmF1bHQuIENyZWF0ZSBpdCBmaXJzdCwgdGhlbiBlbnRlciBpdHMgcGF0aCBoZXJlLidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVGltZXIgU2V0dGluZ3MgU2VjdGlvblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ1RpbWVyIFNldHRpbmdzJ30pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1RpbWVyIER1cmF0aW9uJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdEZWZhdWx0IGR1cmF0aW9uIGZvciB0aGUgd3JpdGluZyB0aW1lciAoaW4gbWludXRlcyknKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCcyNScpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy50aW1lckR1cmF0aW9uIC8gNjApKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZHVyYXRpb24pICYmIGR1cmF0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGltZXJEdXJhdGlvbiA9IGR1cmF0aW9uICogNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAvLyBHb29nbGUgU2hlZXRzIEludGVncmF0aW9uIFNlY3Rpb25cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJywge3RleHQ6ICdHb29nbGUgU2hlZXRzIEludGVncmF0aW9uJ30pO1xuICAgICAgICBcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnQXBwcyBTY3JpcHQgVVJMJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdVUkwgb2YgeW91ciBHb29nbGUgQXBwcyBTY3JpcHQgd2ViIGFwcCcpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vLi4uJylcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2NyaXB0VXJsKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2NyaXB0VXJsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdBUEkgS2V5JylcbiAgICAgICAgICAgIC5zZXREZXNjKCdBUEkga2V5IGZvciBHb29nbGUgU2hlZXRzIGF1dGhlbnRpY2F0aW9uJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBBUEkga2V5JylcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAvLyBTZXR1cCBJbnN0cnVjdGlvbnNcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJywge3RleHQ6ICdTZXR1cCBJbnN0cnVjdGlvbnMnfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXG4gICAgICAgICAgICAnMS4gQ3JlYXRlIGEgY29weSBvZiB0aGUgdGVtcGxhdGUgR29vZ2xlIFNoZWV0JyxcbiAgICAgICAgICAgICcyLiBJbiB0aGUgc2hlZXQsIGdvIHRvIEV4dGVuc2lvbnMgPiBBcHBzIFNjcmlwdCcsXG4gICAgICAgICAgICAnMy4gQ29weSB0aGUgQXBwcyBTY3JpcHQgY29kZSBpbnRvIHRoZSBzY3JpcHQgZWRpdG9yJyxcbiAgICAgICAgICAgICc0LiBDbGljayBzYXZlIGljb24gdG8gc2F2ZSB0byBEcml2ZScsXG4gICAgICAgICAgICAnNS4gUnVuIHRoZSBzZXR1cEFwaUtleSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB5b3VyIEFQSSBrZXknLFxuICAgICAgICAgICAgJzYuIERlcGxveSBhcyBhIHdlYiBhcHA6JyxcbiAgICAgICAgICAgICdcXHRcXHQtIEV4ZWN1dGUgYXM6IE1lJyxcbiAgICAgICAgICAgICdcXHRcXHQtIFdobyBoYXMgYWNjZXNzOiBBbnlvbmUgd2l0aCBHb29nbGUgQWNjb3VudCcsXG4gICAgICAgICAgICAnNy4gQ29weSB0aGUgZGVwbG95bWVudCBVUkwgYW5kIEFQSSBrZXkgaW50byB0aGVzZSBzZXR0aW5ncydcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnNMaXN0ID0gY29udGFpbmVyRWwuY3JlYXRlRWwoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5zdHJ1Y3Rpb25zLmZvckVhY2goaW5zdHJ1Y3Rpb24gPT4ge1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zTGlzdC5jcmVhdGVFbCgnZGl2Jywge3RleHQ6IGluc3RydWN0aW9ufSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiTW9kYWwiLCJOb3RpY2UiLCJURmlsZSIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFvRkQ7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxRQUFRLEdBQUcsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3JNLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoSyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7QUFDdEQsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMs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

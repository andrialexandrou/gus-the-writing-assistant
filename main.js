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
        var now = new Date();
        _this.entry = {
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
        return _this;
    }
    LogModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.empty();
        contentEl.createEl('h2', { text: 'Log Writing Session' });
        // Plan
        new obsidian.Setting(contentEl)
            .setName('Plan')
            .setDesc('What was your plan for this session?')
            .addTextArea(function (text) { return text
            .setValue(_this.entry.plan || '')
            .setPlaceholder('What did you plan to accomplish?')
            .onChange(function (value) { return _this.entry.plan = value; }); });
        // Start Time
        new obsidian.Setting(contentEl)
            .setName('Start Time')
            .setDesc('When did you start? (24-hour format)')
            .addText(function (text) { return text
            .setValue(_this.entry.startTime || '')
            .setPlaceholder('e.g., 14:30')
            .onChange(function (value) {
            // Validate and format time
            if (_this.isValidTime(value)) {
                _this.entry.startTime = value;
            }
        }); });
        // Stage
        new obsidian.Setting(contentEl)
            .setName('Stage')
            .setDesc('Current stage of writing (e.g., prewriting, drafting, editing)')
            .addText(function (text) { return text
            .setValue(_this.entry.stage || '')
            .setPlaceholder('e.g., prewriting (outlining)')
            .onChange(function (value) { return _this.entry.stage = value; }); });
        // Project
        new obsidian.Setting(contentEl)
            .setName('Project')
            .setDesc('Project name (will be created as a link)')
            .addText(function (text) { return text
            .setValue(_this.entry.project || '')
            .setPlaceholder('e.g., writing, fast and slow')
            .onChange(function (value) { return _this.entry.project = value; }); });
        // Duration
        new obsidian.Setting(contentEl)
            .setName('Duration')
            .setDesc('Session duration (in minutes)')
            .addText(function (text) {
            var _a;
            return text
                .setValue(((_a = _this.entry.duration) === null || _a === undefined ? undefined : _a.toString()) || '')
                .setPlaceholder('e.g., 25')
                .onChange(function (value) {
                var duration = parseInt(value);
                if (!isNaN(duration)) {
                    _this.entry.duration = duration;
                }
            });
        });
        // Word Count
        new obsidian.Setting(contentEl)
            .setName('Word Count')
            .setDesc('Number of words written (optional)')
            .addText(function (text) {
            var _a;
            return text
                .setValue(((_a = _this.entry.wordCount) === null || _a === undefined ? undefined : _a.toString()) || '')
                .setPlaceholder('e.g., 500')
                .onChange(function (value) {
                var count = parseInt(value);
                if (!isNaN(count)) {
                    _this.entry.wordCount = count;
                }
            });
        });
        // Process Notes
        new obsidian.Setting(contentEl)
            .setName('Process')
            .setDesc('Notes about your writing process')
            .addTextArea(function (text) { return text
            .setValue(_this.entry.notes || '')
            .setPlaceholder('How did the writing go?')
            .onChange(function (value) { return _this.entry.notes = value; }); });
        // Fluency
        new obsidian.Setting(contentEl)
            .setName('Test Stat Fluency')
            .setDesc('Writing fluency rating (1-5)')
            .addSlider(function (slider) { return slider
            .setLimits(1, 5, 1)
            .setValue(_this.entry.fluency || 3)
            .setDynamicTooltip()
            .onChange(function (value) { return _this.entry.fluency = value; }); });
        // Next Actions
        new obsidian.Setting(contentEl)
            .setName('Next Actions')
            .setDesc('What needs to be done next?')
            .addTextArea(function (text) { return text
            .setValue(_this.entry.nextActions || '')
            .setPlaceholder('Next steps for this project')
            .onChange(function (value) { return _this.entry.nextActions = value; }); });
        // Submit Button
        new obsidian.Setting(contentEl)
            .addButton(function (button) { return button
            .setButtonText('Submit')
            .setCta()
            .onClick(function () { return __awaiter(_this, undefined, undefined, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateEntry()) {
                            return [2 /*return*/];
                        }
                        // Close form immediately
                        this.close();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.plugin.logEntry(this.entry)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Failed to submit entry:', error_1);
                        new obsidian.Notice('Failed to save entry: ' + error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }); });
    };
    LogModal.prototype.isValidTime = function (time) {
        // Check if time matches HH:MM format (24-hour)
        var timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeRegex.test(time)) {
            return false;
        }
        return true;
    };
    LogModal.prototype.validateEntry = function () {
        if (!this.entry.startTime || !this.isValidTime(this.entry.startTime)) {
            new obsidian.Notice('Please enter a valid start time (HH:MM)');
            return false;
        }
        if (!this.entry.stage) {
            new obsidian.Notice('Please enter a writing stage');
            return false;
        }
        if (!this.entry.duration || this.entry.duration < 1) {
            new obsidian.Notice('Please enter a valid duration');
            return false;
        }
        if (this.entry.duration > 480) { // 8 hours max
            new obsidian.Notice('Duration must be less than 8 hours');
            return false;
        }
        return true;
    };
    LogModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return LogModal;
}(obsidian.Modal));

var DEFAULT_SETTINGS = {
    scriptUrl: '',
    apiKey: ''
};
var WritingLoggerPlugin = /** @class */ (function (_super) {
    __extends(WritingLoggerPlugin, _super);
    function WritingLoggerPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WritingLoggerPlugin.prototype.onload = function () {
        return __awaiter(this, undefined, undefined, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addCommand({
                            id: 'log-writing-activity',
                            name: 'Log Writing Activity',
                            callback: function () {
                                new LogModal(_this.app, _this).open();
                            }
                        });
                        // Add logging ribbon icon
                        this.addRibbonIcon('book-heart', 'Log Writing Activity', function () {
                            new LogModal(_this.app, _this).open();
                        });
                        this.addSettingTab(new WritingLoggerSettingTab(this.app, this));
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
    WritingLoggerPlugin.prototype.loadSettings = function () {
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
    WritingLoggerPlugin.prototype.saveSettings = function () {
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
    WritingLoggerPlugin.prototype.logEntry = function (entry) {
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
                        // Create or append to daily file
                        return [4 /*yield*/, this.appendToFile(entry)];
                    case 2:
                        // Create or append to daily file
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
    WritingLoggerPlugin.prototype.submitToSheets = function (entry) {
        return __awaiter(this, undefined, undefined, function () {
            var dataArray, url, error_3;
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
                            new Date(entry.timestamp).toISOString().split('T')[0],
                            entry.startTime || '',
                            entry.project || '',
                            entry.stage || '',
                            String(entry.wordCount || ''),
                            String(entry.fluency || ''),
                            String(entry.duration),
                        ];
                        url = "".concat(this.settings.scriptUrl, "?apiKey=").concat(encodeURIComponent(this.settings.apiKey));
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                mode: 'no-cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataArray)
                            })];
                    case 2:
                        _a.sent();
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
    WritingLoggerPlugin.prototype.appendToFile = function (entry) {
        return __awaiter(this, undefined, undefined, function () {
            var date, dateStr, sessionNum, fileName, content, newFile, leaf, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date(entry.timestamp);
                        dateStr = date.toISOString().split('T')[0];
                        return [4 /*yield*/, this.getNextSessionNumber(dateStr)];
                    case 1:
                        sessionNum = _a.sent();
                        fileName = "".concat(dateStr, " Session ").concat(sessionNum, ".md");
                        content = "\n**\n\n**plan**: ".concat(entry.plan || '', "\n**start time**: ").concat(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), "\n**stage**: ").concat(entry.stage || '', "\n**project**: [[").concat(entry.project || 'No project', "]]\n**duration**: ").concat(entry.duration, ":00\n**word count**: ").concat(entry.wordCount || '', "\n**process**: ").concat(entry.notes || '', "\n**test stat fluency out of 5**: ").concat(entry.fluency || '', "\n**next actions**: ").concat(entry.nextActions || '', "\n\n**").trim();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        // Create the file
                        return [4 /*yield*/, this.app.vault.create(fileName, content)];
                    case 3:
                        // Create the file
                        _a.sent();
                        newFile = this.app.vault.getAbstractFileByPath(fileName);
                        if (!(newFile instanceof obsidian.TFile)) return [3 /*break*/, 5];
                        leaf = this.app.workspace.getUnpinnedLeaf();
                        return [4 /*yield*/, leaf.openFile(newFile)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        console.error('Error writing to file:', error_4);
                        throw new Error('Failed to create log entry file');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    WritingLoggerPlugin.prototype.getNextSessionNumber = function (dateStr) {
        return __awaiter(this, undefined, undefined, function () {
            var files, todayFiles, maxSession;
            return __generator(this, function (_a) {
                files = this.app.vault.getFiles();
                todayFiles = files.filter(function (file) {
                    return file.name.startsWith(dateStr) &&
                        file.name.includes('Session');
                });
                if (todayFiles.length === 0) {
                    return [2 /*return*/, 1];
                }
                maxSession = 0;
                todayFiles.forEach(function (file) {
                    var match = file.name.match(/Session (\d+)/);
                    if (match) {
                        var num = parseInt(match[1]);
                        if (num > maxSession)
                            maxSession = num;
                    }
                });
                return [2 /*return*/, maxSession + 1];
            });
        });
    };
    return WritingLoggerPlugin;
}(obsidian.Plugin));
var WritingLoggerSettingTab = /** @class */ (function (_super) {
    __extends(WritingLoggerSettingTab, _super);
    function WritingLoggerSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    WritingLoggerSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Writing Logger Settings' });
        // Google Sheets Integration Section
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
            '4. Deploy as a web app',
            '5. Copy the deployment URL and API key into these settings'
        ];
        var instructionsList = containerEl.createEl('div', {
            cls: 'setting-item-description'
        });
        instructions.forEach(function (instruction) {
            instructionsList.createEl('div', { text: instruction });
        });
    };
    return WritingLoggerSettingTab;
}(obsidian.PluginSettingTab));

module.exports = WritingLoggerPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImxvZy1tb2RhbC50cyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCIvLyBsb2ctbW9kYWwudHNcbmltcG9ydCB7IEFwcCwgTW9kYWwsIFNldHRpbmcsIE5vdGljZSB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBXcml0aW5nTG9nZ2VyUGx1Z2luIGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nRW50cnkge1xuICAgIHRpbWVzdGFtcDogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogc3RyaW5nOyAgLy8gQWRkZWQgc3RhcnQgdGltZVxuICAgIGFjdGl2aXR5OiBzdHJpbmc7XG4gICAgcHJvamVjdD86IHN0cmluZztcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xuICAgIGZsdWVuY3k/OiBudW1iZXI7XG4gICAgd29yZENvdW50PzogbnVtYmVyO1xuICAgIG5vdGVzPzogc3RyaW5nO1xuICAgIHN0YWdlPzogc3RyaW5nO1xuICAgIHBsYW4/OiBzdHJpbmc7XG4gICAgbmV4dEFjdGlvbnM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgICBwcml2YXRlIGVudHJ5OiBQYXJ0aWFsPExvZ0VudHJ5PjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHBsdWdpbjogV3JpdGluZ0xvZ2dlclBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmVudHJ5ID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiBub3cudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogbm93LnRvTG9jYWxlVGltZVN0cmluZygnZW4tVVMnLCB7IFxuICAgICAgICAgICAgICAgIGhvdXI6ICcyLWRpZ2l0JywgXG4gICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgaG91cjEyOiBmYWxzZSBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3RhZ2U6ICcnLFxuICAgICAgICAgICAgcGxhbjogJycsXG4gICAgICAgICAgICBwcm9qZWN0OiAnJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgd29yZENvdW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBub3RlczogJycsXG4gICAgICAgICAgICBmbHVlbmN5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBuZXh0QWN0aW9uczogJydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0xvZyBXcml0aW5nIFNlc3Npb24nIH0pO1xuXG4gICAgICAgIC8vIFBsYW5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1BsYW4nKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doYXQgd2FzIHlvdXIgcGxhbiBmb3IgdGhpcyBzZXNzaW9uPycpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkucGxhbiB8fCAnJylcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ1doYXQgZGlkIHlvdSBwbGFuIHRvIGFjY29tcGxpc2g/JylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4gdGhpcy5lbnRyeS5wbGFuID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBTdGFydCBUaW1lXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdTdGFydCBUaW1lJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdXaGVuIGRpZCB5b3Ugc3RhcnQ/ICgyNC1ob3VyIGZvcm1hdCknKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkuc3RhcnRUaW1lIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgMTQ6MzAnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlIGFuZCBmb3JtYXQgdGltZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGltZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50cnkuc3RhcnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gU3RhZ2VcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1N0YWdlJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdDdXJyZW50IHN0YWdlIG9mIHdyaXRpbmcgKGUuZy4sIHByZXdyaXRpbmcsIGRyYWZ0aW5nLCBlZGl0aW5nKScpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5lbnRyeS5zdGFnZSB8fCAnJylcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ2UuZy4sIHByZXdyaXRpbmcgKG91dGxpbmluZyknKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5LnN0YWdlID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBQcm9qZWN0XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdQcm9qZWN0JylcbiAgICAgICAgICAgIC5zZXREZXNjKCdQcm9qZWN0IG5hbWUgKHdpbGwgYmUgY3JlYXRlZCBhcyBhIGxpbmspJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5LnByb2plY3QgfHwgJycpXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdlLmcuLCB3cml0aW5nLCBmYXN0IGFuZCBzbG93JylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4gdGhpcy5lbnRyeS5wcm9qZWN0ID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBEdXJhdGlvblxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRHVyYXRpb24nKVxuICAgICAgICAgICAgLnNldERlc2MoJ1Nlc3Npb24gZHVyYXRpb24gKGluIG1pbnV0ZXMpJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5LmR1cmF0aW9uPy50b1N0cmluZygpIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgMjUnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRyeS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFdvcmQgQ291bnRcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1dvcmQgQ291bnQnKVxuICAgICAgICAgICAgLnNldERlc2MoJ051bWJlciBvZiB3b3JkcyB3cml0dGVuIChvcHRpb25hbCknKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkud29yZENvdW50Py50b1N0cmluZygpIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgNTAwJylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihjb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50cnkud29yZENvdW50ID0gY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gUHJvY2VzcyBOb3Rlc1xuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnUHJvY2VzcycpXG4gICAgICAgICAgICAuc2V0RGVzYygnTm90ZXMgYWJvdXQgeW91ciB3cml0aW5nIHByb2Nlc3MnKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5Lm5vdGVzIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSG93IGRpZCB0aGUgd3JpdGluZyBnbz8nKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5Lm5vdGVzID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBGbHVlbmN5XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdUZXN0IFN0YXQgRmx1ZW5jeScpXG4gICAgICAgICAgICAuc2V0RGVzYygnV3JpdGluZyBmbHVlbmN5IHJhdGluZyAoMS01KScpXG4gICAgICAgICAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiBzbGlkZXJcbiAgICAgICAgICAgICAgICAuc2V0TGltaXRzKDEsIDUsIDEpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkuZmx1ZW5jeSB8fCAzKVxuICAgICAgICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKHZhbHVlID0+IHRoaXMuZW50cnkuZmx1ZW5jeSA9IHZhbHVlKSk7XG5cbiAgICAgICAgLy8gTmV4dCBBY3Rpb25zXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdOZXh0IEFjdGlvbnMnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doYXQgbmVlZHMgdG8gYmUgZG9uZSBuZXh0PycpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkubmV4dEFjdGlvbnMgfHwgJycpXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdOZXh0IHN0ZXBzIGZvciB0aGlzIHByb2plY3QnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5Lm5leHRBY3Rpb25zID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBTdWJtaXQgQnV0dG9uXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLmFkZEJ1dHRvbihidXR0b24gPT4gYnV0dG9uXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dCgnU3VibWl0JylcbiAgICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0ZUVudHJ5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQ2xvc2UgZm9ybSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgc3VibWlzc2lvbiBhZnRlciBjbG9zaW5nXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ubG9nRW50cnkodGhpcy5lbnRyeSBhcyBMb2dFbnRyeSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHN1Ym1pdCBlbnRyeTonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0ZhaWxlZCB0byBzYXZlIGVudHJ5OiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWYWxpZFRpbWUodGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRpbWUgbWF0Y2hlcyBISDpNTSBmb3JtYXQgKDI0LWhvdXIpXG4gICAgICAgIGNvbnN0IHRpbWVSZWdleCA9IC9eKFswLTFdP1swLTldfDJbMC0zXSk6KFswLTVdWzAtOV0pJC87XG4gICAgICAgIGlmICghdGltZVJlZ2V4LnRlc3QodGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlRW50cnkoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5lbnRyeS5zdGFydFRpbWUgfHwgIXRoaXMuaXNWYWxpZFRpbWUodGhpcy5lbnRyeS5zdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBzdGFydCB0aW1lIChISDpNTSknKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbnRyeS5zdGFnZSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZSgnUGxlYXNlIGVudGVyIGEgd3JpdGluZyBzdGFnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmVudHJ5LmR1cmF0aW9uIHx8IHRoaXMuZW50cnkuZHVyYXRpb24gPCAxKSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBkdXJhdGlvbicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW50cnkuZHVyYXRpb24gPiA0ODApIHsgLy8gOCBob3VycyBtYXhcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0R1cmF0aW9uIG11c3QgYmUgbGVzcyB0aGFuIDggaG91cnMnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59IiwiLy8gbWFpbi50c1xuaW1wb3J0IHsgQXBwLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBMb2dNb2RhbCwgTG9nRW50cnkgfSBmcm9tICcuL2xvZy1tb2RhbCc7XG5cbmludGVyZmFjZSBQbHVnaW5TZXR0aW5ncyB7XG4gICAgc2NyaXB0VXJsOiBzdHJpbmc7XG4gICAgYXBpS2V5OiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFBsdWdpblNldHRpbmdzID0ge1xuICAgIHNjcmlwdFVybDogJycsXG4gICAgYXBpS2V5OiAnJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JpdGluZ0xvZ2dlclBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IFBsdWdpblNldHRpbmdzO1xuXG4gICAgYXN5bmMgb25sb2FkKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ2xvZy13cml0aW5nLWFjdGl2aXR5JyxcbiAgICAgICAgICAgIG5hbWU6ICdMb2cgV3JpdGluZyBBY3Rpdml0eScsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ldyBMb2dNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBZGQgbG9nZ2luZyByaWJib24gaWNvblxuICAgICAgICB0aGlzLmFkZFJpYmJvbkljb24oJ2Jvb2staGVhcnQnLCAnTG9nIFdyaXRpbmcgQWN0aXZpdHknLCAoKSA9PiB7XG4gICAgICAgICAgICBuZXcgTG9nTW9kYWwodGhpcy5hcHAsIHRoaXMpLm9wZW4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBXcml0aW5nTG9nZ2VyU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ3Rlc3Qtc2hlZXRzLWNvbm5lY3Rpb24nLFxuICAgICAgICAgICAgbmFtZTogJ1Rlc3QgR29vZ2xlIFNoZWV0cyBDb25uZWN0aW9uJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdERhdGE6IExvZ0VudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JywgaG91cjEyOiBmYWxzZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5OiAndGVzdCBlbnRyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0OiAndGVzdCBwcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmx1ZW5jeTogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmRDb3VudDogMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZXM6ICdUaGlzIGlzIGEgdGVzdCBlbnRyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFnZTogJ3Rlc3RpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhbjogJ1Rlc3QgcGxhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uczogJ05leHQgc3RlcHMnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VibWl0VG9TaGVldHModGVzdERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKCdUZXN0IHN1Ym1pc3Npb24gc3VjY2Vzc2Z1bCEnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUZXN0IHN1Ym1pc3Npb24gZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgVGVzdCBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ0VudHJ5KGVudHJ5OiBMb2dFbnRyeSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU3VibWl0IHRvIEdvb2dsZSBTaGVldHNcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VibWl0VG9TaGVldHMoZW50cnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDcmVhdGUgb3IgYXBwZW5kIHRvIGRhaWx5IGZpbGVcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwZW5kVG9GaWxlKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgICAgICBuZXcgTm90aWNlKCdBY3Rpdml0eSBsb2dnZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2dnaW5nIGFjdGl2aXR5OicsIGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvZyBhY3Rpdml0eS4gUGxlYXNlIGNoZWNrIHlvdXIgc2V0dGluZ3MgYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN1Ym1pdFRvU2hlZXRzKGVudHJ5OiBMb2dFbnRyeSkge1xuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3Muc2NyaXB0VXJsIHx8ICF0aGlzLnNldHRpbmdzLmFwaUtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgY29uZmlndXJlIGJvdGggdGhlIEFwcHMgU2NyaXB0IFVSTCBhbmQgQVBJIGtleSBpbiBzZXR0aW5ncycpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoZW50cnkudGltZXN0YW1wKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICAgICAgICAgZW50cnkuc3RhcnRUaW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIGVudHJ5LnByb2plY3QgfHwgJycsXG4gICAgICAgICAgICAgICAgZW50cnkuc3RhZ2UgfHwgJycsXG4gICAgICAgICAgICAgICAgU3RyaW5nKGVudHJ5LndvcmRDb3VudCB8fCAnJyksXG4gICAgICAgICAgICAgICAgU3RyaW5nKGVudHJ5LmZsdWVuY3kgfHwgJycpLFxuICAgICAgICAgICAgICAgIFN0cmluZyhlbnRyeS5kdXJhdGlvbiksXG4gICAgICAgICAgICBdO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5zZXR0aW5ncy5zY3JpcHRVcmx9P2FwaUtleT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmFwaUtleSl9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm8tY29ycycsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQXJyYXkpXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzdWJtaXQgdG8gR29vZ2xlIFNoZWV0czonLCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBzdWJtaXQgdG8gR29vZ2xlIFNoZWV0cycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgYXBwZW5kVG9GaWxlKGVudHJ5OiBMb2dFbnRyeSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZW50cnkudGltZXN0YW1wKTtcbiAgICAgICAgY29uc3QgZGF0ZVN0ciA9IGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2Vzc2lvbk51bSA9IGF3YWl0IHRoaXMuZ2V0TmV4dFNlc3Npb25OdW1iZXIoZGF0ZVN0cik7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7ZGF0ZVN0cn0gU2Vzc2lvbiAke3Nlc3Npb25OdW19Lm1kYDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4qKlxuXG4qKnBsYW4qKjogJHtlbnRyeS5wbGFuIHx8ICcnfVxuKipzdGFydCB0aW1lKio6ICR7ZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnLCBob3VyMTI6IGZhbHNlIH0pfVxuKipzdGFnZSoqOiAke2VudHJ5LnN0YWdlIHx8ICcnfVxuKipwcm9qZWN0Kio6IFtbJHtlbnRyeS5wcm9qZWN0IHx8ICdObyBwcm9qZWN0J31dXVxuKipkdXJhdGlvbioqOiAke2VudHJ5LmR1cmF0aW9ufTowMFxuKip3b3JkIGNvdW50Kio6ICR7ZW50cnkud29yZENvdW50IHx8ICcnfVxuKipwcm9jZXNzKio6ICR7ZW50cnkubm90ZXMgfHwgJyd9XG4qKnRlc3Qgc3RhdCBmbHVlbmN5IG91dCBvZiA1Kio6ICR7ZW50cnkuZmx1ZW5jeSB8fCAnJ31cbioqbmV4dCBhY3Rpb25zKio6ICR7ZW50cnkubmV4dEFjdGlvbnMgfHwgJyd9XG5cbioqYC50cmltKCk7XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGZpbGVcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlTmFtZSwgY29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbmV3bHkgY3JlYXRlZCBmaWxlXG4gICAgICAgICAgICBjb25zdCBuZXdGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuZXdGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBPcGVuIHRoZSBmaWxlIGluIGEgbmV3IGxlYWZcbiAgICAgICAgICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldFVucGlubmVkTGVhZigpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxlYWYub3BlbkZpbGUobmV3RmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIGZpbGU6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGxvZyBlbnRyeSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldE5leHRTZXNzaW9uTnVtYmVyKGRhdGVTdHI6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKTtcbiAgICAgICAgY29uc3QgdG9kYXlGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+IFxuICAgICAgICAgICAgZmlsZS5uYW1lLnN0YXJ0c1dpdGgoZGF0ZVN0cikgJiYgXG4gICAgICAgICAgICBmaWxlLm5hbWUuaW5jbHVkZXMoJ1Nlc3Npb24nKVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRvZGF5RmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG1heFNlc3Npb24gPSAwO1xuICAgICAgICB0b2RheUZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGZpbGUubmFtZS5tYXRjaCgvU2Vzc2lvbiAoXFxkKykvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAobnVtID4gbWF4U2Vzc2lvbikgbWF4U2Vzc2lvbiA9IG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWF4U2Vzc2lvbiArIDE7XG4gICAgfVxufVxuXG5jbGFzcyBXcml0aW5nTG9nZ2VyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogV3JpdGluZ0xvZ2dlclBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFdyaXRpbmdMb2dnZXJQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ1dyaXRpbmcgTG9nZ2VyIFNldHRpbmdzJ30pO1xuXG4gICAgICAgIC8vIEdvb2dsZSBTaGVldHMgSW50ZWdyYXRpb24gU2VjdGlvblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdBcHBzIFNjcmlwdCBVUkwnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1VSTCBvZiB5b3VyIEdvb2dsZSBBcHBzIFNjcmlwdCB3ZWIgYXBwJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS8uLi4nKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0FQSSBLZXknKVxuICAgICAgICAgICAgLnNldERlc2MoJ0FQSSBrZXkgZm9yIEdvb2dsZSBTaGVldHMgYXV0aGVudGljYXRpb24nKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdFbnRlciB5b3VyIEFQSSBrZXknKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFNldHVwIEluc3RydWN0aW9uc1xuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ1NldHVwIEluc3RydWN0aW9ucyd9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtcbiAgICAgICAgICAgICcxLiBDcmVhdGUgYSBjb3B5IG9mIHRoZSB0ZW1wbGF0ZSBHb29nbGUgU2hlZXQnLFxuICAgICAgICAgICAgJzIuIEluIHRoZSBzaGVldCwgZ28gdG8gRXh0ZW5zaW9ucyA+IEFwcHMgU2NyaXB0JyxcbiAgICAgICAgICAgICczLiBDb3B5IHRoZSBBcHBzIFNjcmlwdCBjb2RlIGludG8gdGhlIHNjcmlwdCBlZGl0b3InLFxuICAgICAgICAgICAgJzQuIERlcGxveSBhcyBhIHdlYiBhcHAnLFxuICAgICAgICAgICAgJzUuIENvcHkgdGhlIGRlcGxveW1lbnQgVVJMIGFuZCBBUEkga2V5IGludG8gdGhlc2Ugc2V0dGluZ3MnXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zTGlzdCA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgICAgICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluc3RydWN0aW9ucy5mb3JFYWNoKGluc3RydWN0aW9uID0+IHtcbiAgICAgICAgICAgIGluc3RydWN0aW9uc0xpc3QuY3JlYXRlRWwoJ2RpdicsIHt0ZXh0OiBpbnN0cnVjdGlvbn0pO1xuICAgICAgICB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbIlNldHRpbmciLCJOb3RpY2UiLCJNb2RhbCIsIlRGaWxlIiwiUGx1Z2luIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBb0ZEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEssSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJO0FBQ3RELFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7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

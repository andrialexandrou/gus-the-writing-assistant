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

// utils/dates.ts - Create a utility file for date handling
function getLocalDateString(date) {
    // Get local date components
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
function getLocal24HourTime(date) {
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(hours, ":").concat(minutes);
}

var LogModal = /** @class */ (function (_super) {
    __extends(LogModal, _super);
    function LogModal(app, plugin) {
        var _this = _super.call(this, app) || this;
        _this.plugin = plugin;
        var now = new Date();
        _this.entry = {
            timestamp: now.toISOString(),
            startTime: getLocal24HourTime(now),
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
            var now, dataArray, url, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.settings.scriptUrl || !this.settings.apiKey) {
                            throw new Error('Please configure both the Apps Script URL and API key in settings');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        now = new Date(entry.timestamp);
                        dataArray = [
                            getLocalDateString(now),
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
            var now, dateStr, sessionNum, fileName, content, newFile, leaf, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date(entry.timestamp);
                        dateStr = getLocalDateString(now);
                        return [4 /*yield*/, this.getNextSessionNumber(dateStr)];
                    case 1:
                        sessionNum = _a.sent();
                        fileName = "".concat(dateStr, " Session ").concat(sessionNum, ".md");
                        content = "\n**\n\n**plan**: ".concat(entry.plan || '', "\n**start time**: ").concat(getLocal24HourTime(now), "\n**stage**: ").concat(entry.stage || '', "\n**project**: [[").concat(entry.project || 'No project', "]]\n**duration**: ").concat(entry.duration, ":00\n**word count**: ").concat(entry.wordCount || '', "\n**process**: ").concat(entry.notes || '', "\n**test stat fluency out of 5**: ").concat(entry.fluency || '', "\n**next actions**: ").concat(entry.nextActions || '', "\n\n**").trim();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInV0aWxzL2RhdGVzLnRzIiwibG9nLW1vZGFsLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsIi8vIHV0aWxzL2RhdGVzLnRzIC0gQ3JlYXRlIGEgdXRpbGl0eSBmaWxlIGZvciBkYXRlIGhhbmRsaW5nXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxEYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAvLyBHZXQgbG9jYWwgZGF0ZSBjb21wb25lbnRzXG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgXG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWwyNEhvdXJUaW1lKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICBjb25zdCBob3VycyA9IFN0cmluZyhkYXRlLmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIFxuICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xufSIsIi8vIGxvZy1tb2RhbC50c1xuaW1wb3J0IHsgQXBwLCBNb2RhbCwgU2V0dGluZywgTm90aWNlIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IFdyaXRpbmdMb2dnZXJQbHVnaW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7IGdldExvY2FsMjRIb3VyVGltZSB9IGZyb20gJy4vdXRpbHMvZGF0ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvZ0VudHJ5IHtcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcbiAgICBzdGFydFRpbWU6IHN0cmluZzsgIC8vIEFkZGVkIHN0YXJ0IHRpbWVcbiAgICBhY3Rpdml0eTogc3RyaW5nO1xuICAgIHByb2plY3Q/OiBzdHJpbmc7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBmbHVlbmN5PzogbnVtYmVyO1xuICAgIHdvcmRDb3VudD86IG51bWJlcjtcbiAgICBub3Rlcz86IHN0cmluZztcbiAgICBzdGFnZT86IHN0cmluZztcbiAgICBwbGFuPzogc3RyaW5nO1xuICAgIG5leHRBY3Rpb25zPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcHJpdmF0ZSBlbnRyeTogUGFydGlhbDxMb2dFbnRyeT47XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IFdyaXRpbmdMb2dnZXJQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbm93LnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICBzdGFydFRpbWU6IGdldExvY2FsMjRIb3VyVGltZShub3cpLFxuICAgICAgICAgICAgc3RhZ2U6ICcnLFxuICAgICAgICAgICAgcGxhbjogJycsXG4gICAgICAgICAgICBwcm9qZWN0OiAnJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgd29yZENvdW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBub3RlczogJycsXG4gICAgICAgICAgICBmbHVlbmN5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBuZXh0QWN0aW9uczogJydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0xvZyBXcml0aW5nIFNlc3Npb24nIH0pO1xuXG4gICAgICAgIC8vIFBsYW5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1BsYW4nKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doYXQgd2FzIHlvdXIgcGxhbiBmb3IgdGhpcyBzZXNzaW9uPycpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkucGxhbiB8fCAnJylcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ1doYXQgZGlkIHlvdSBwbGFuIHRvIGFjY29tcGxpc2g/JylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4gdGhpcy5lbnRyeS5wbGFuID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBTdGFydCBUaW1lXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdTdGFydCBUaW1lJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdXaGVuIGRpZCB5b3Ugc3RhcnQ/ICgyNC1ob3VyIGZvcm1hdCknKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkuc3RhcnRUaW1lIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgMTQ6MzAnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlIGFuZCBmb3JtYXQgdGltZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGltZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50cnkuc3RhcnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gU3RhZ2VcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1N0YWdlJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdDdXJyZW50IHN0YWdlIG9mIHdyaXRpbmcgKGUuZy4sIHByZXdyaXRpbmcsIGRyYWZ0aW5nLCBlZGl0aW5nKScpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5lbnRyeS5zdGFnZSB8fCAnJylcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ2UuZy4sIHByZXdyaXRpbmcgKG91dGxpbmluZyknKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5LnN0YWdlID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBQcm9qZWN0XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdQcm9qZWN0JylcbiAgICAgICAgICAgIC5zZXREZXNjKCdQcm9qZWN0IG5hbWUgKHdpbGwgYmUgY3JlYXRlZCBhcyBhIGxpbmspJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5LnByb2plY3QgfHwgJycpXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdlLmcuLCB3cml0aW5nLCBmYXN0IGFuZCBzbG93JylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4gdGhpcy5lbnRyeS5wcm9qZWN0ID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBEdXJhdGlvblxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRHVyYXRpb24nKVxuICAgICAgICAgICAgLnNldERlc2MoJ1Nlc3Npb24gZHVyYXRpb24gKGluIG1pbnV0ZXMpJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5LmR1cmF0aW9uPy50b1N0cmluZygpIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgMjUnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRyeS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFdvcmQgQ291bnRcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ1dvcmQgQ291bnQnKVxuICAgICAgICAgICAgLnNldERlc2MoJ051bWJlciBvZiB3b3JkcyB3cml0dGVuIChvcHRpb25hbCknKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkud29yZENvdW50Py50b1N0cmluZygpIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignZS5nLiwgNTAwJylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihjb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50cnkud29yZENvdW50ID0gY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gUHJvY2VzcyBOb3Rlc1xuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnUHJvY2VzcycpXG4gICAgICAgICAgICAuc2V0RGVzYygnTm90ZXMgYWJvdXQgeW91ciB3cml0aW5nIHByb2Nlc3MnKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLmVudHJ5Lm5vdGVzIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSG93IGRpZCB0aGUgd3JpdGluZyBnbz8nKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5Lm5vdGVzID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBGbHVlbmN5XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdUZXN0IFN0YXQgRmx1ZW5jeScpXG4gICAgICAgICAgICAuc2V0RGVzYygnV3JpdGluZyBmbHVlbmN5IHJhdGluZyAoMS01KScpXG4gICAgICAgICAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiBzbGlkZXJcbiAgICAgICAgICAgICAgICAuc2V0TGltaXRzKDEsIDUsIDEpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkuZmx1ZW5jeSB8fCAzKVxuICAgICAgICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKHZhbHVlID0+IHRoaXMuZW50cnkuZmx1ZW5jeSA9IHZhbHVlKSk7XG5cbiAgICAgICAgLy8gTmV4dCBBY3Rpb25zXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdOZXh0IEFjdGlvbnMnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doYXQgbmVlZHMgdG8gYmUgZG9uZSBuZXh0PycpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMuZW50cnkubmV4dEFjdGlvbnMgfHwgJycpXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdOZXh0IHN0ZXBzIGZvciB0aGlzIHByb2plY3QnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB0aGlzLmVudHJ5Lm5leHRBY3Rpb25zID0gdmFsdWUpKTtcblxuICAgICAgICAvLyBTdWJtaXQgQnV0dG9uXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLmFkZEJ1dHRvbihidXR0b24gPT4gYnV0dG9uXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dCgnU3VibWl0JylcbiAgICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0ZUVudHJ5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQ2xvc2UgZm9ybSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgc3VibWlzc2lvbiBhZnRlciBjbG9zaW5nXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ubG9nRW50cnkodGhpcy5lbnRyeSBhcyBMb2dFbnRyeSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHN1Ym1pdCBlbnRyeTonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0ZhaWxlZCB0byBzYXZlIGVudHJ5OiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWYWxpZFRpbWUodGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRpbWUgbWF0Y2hlcyBISDpNTSBmb3JtYXQgKDI0LWhvdXIpXG4gICAgICAgIGNvbnN0IHRpbWVSZWdleCA9IC9eKFswLTFdP1swLTldfDJbMC0zXSk6KFswLTVdWzAtOV0pJC87XG4gICAgICAgIGlmICghdGltZVJlZ2V4LnRlc3QodGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlRW50cnkoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5lbnRyeS5zdGFydFRpbWUgfHwgIXRoaXMuaXNWYWxpZFRpbWUodGhpcy5lbnRyeS5zdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBzdGFydCB0aW1lIChISDpNTSknKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbnRyeS5zdGFnZSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZSgnUGxlYXNlIGVudGVyIGEgd3JpdGluZyBzdGFnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmVudHJ5LmR1cmF0aW9uIHx8IHRoaXMuZW50cnkuZHVyYXRpb24gPCAxKSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBkdXJhdGlvbicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW50cnkuZHVyYXRpb24gPiA0ODApIHsgLy8gOCBob3VycyBtYXhcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ0R1cmF0aW9uIG11c3QgYmUgbGVzcyB0aGFuIDggaG91cnMnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59IiwiLy8gbWFpbi50c1xuaW1wb3J0IHsgQXBwLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBMb2dNb2RhbCwgTG9nRW50cnkgfSBmcm9tICcuL2xvZy1tb2RhbCc7XG5pbXBvcnQgeyBnZXRMb2NhbDI0SG91clRpbWUsIGdldExvY2FsRGF0ZVN0cmluZyB9IGZyb20gJy4vdXRpbHMvZGF0ZXMnO1xuXG5pbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuICAgIHNjcmlwdFVybDogc3RyaW5nO1xuICAgIGFwaUtleTogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcbiAgICBzY3JpcHRVcmw6ICcnLFxuICAgIGFwaUtleTogJydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyaXRpbmdMb2dnZXJQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICAgIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncztcblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6ICdsb2ctd3JpdGluZy1hY3Rpdml0eScsXG4gICAgICAgICAgICBuYW1lOiAnTG9nIFdyaXRpbmcgQWN0aXZpdHknLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgTG9nTW9kYWwodGhpcy5hcHAsIHRoaXMpLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGxvZ2dpbmcgcmliYm9uIGljb25cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdib29rLWhlYXJ0JywgJ0xvZyBXcml0aW5nIEFjdGl2aXR5JywgKCkgPT4ge1xuICAgICAgICAgICAgbmV3IExvZ01vZGFsKHRoaXMuYXBwLCB0aGlzKS5vcGVuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgV3JpdGluZ0xvZ2dlclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6ICd0ZXN0LXNoZWV0cy1jb25uZWN0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdUZXN0IEdvb2dsZSBTaGVldHMgQ29ubmVjdGlvbicsXG4gICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlc3REYXRhOiBMb2dFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygnZW4tVVMnLCB7IGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcsIGhvdXIxMjogZmFsc2UgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ3Rlc3QgZW50cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdDogJ3Rlc3QgcHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdWVuY3k6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkQ291bnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVzOiAnVGhpcyBpcyBhIHRlc3QgZW50cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2U6ICd0ZXN0aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYW46ICdUZXN0IHBsYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbnM6ICdOZXh0IHN0ZXBzJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnN1Ym1pdFRvU2hlZXRzKHRlc3REYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSgnVGVzdCBzdWJtaXNzaW9uIHN1Y2Nlc3NmdWwhJyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGVzdCBzdWJtaXNzaW9uIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFRlc3QgZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2dFbnRyeShlbnRyeTogTG9nRW50cnkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFN1Ym1pdCB0byBHb29nbGUgU2hlZXRzXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnN1Ym1pdFRvU2hlZXRzKGVudHJ5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ3JlYXRlIG9yIGFwcGVuZCB0byBkYWlseSBmaWxlXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcGVuZFRvRmlsZShlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICAgICAgbmV3IE5vdGljZSgnQWN0aXZpdHkgbG9nZ2VkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9nZ2luZyBhY3Rpdml0eTonLCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2cgYWN0aXZpdHkuIFBsZWFzZSBjaGVjayB5b3VyIHNldHRpbmdzIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzdWJtaXRUb1NoZWV0cyhlbnRyeTogTG9nRW50cnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnNjcmlwdFVybCB8fCAhdGhpcy5zZXR0aW5ncy5hcGlLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNvbmZpZ3VyZSBib3RoIHRoZSBBcHBzIFNjcmlwdCBVUkwgYW5kIEFQSSBrZXkgaW4gc2V0dGluZ3MnKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoZW50cnkudGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFBcnJheSA9IFtcbiAgICAgICAgICAgICAgICBnZXRMb2NhbERhdGVTdHJpbmcobm93KSxcbiAgICAgICAgICAgICAgICBlbnRyeS5zdGFydFRpbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgZW50cnkucHJvamVjdCB8fCAnJyxcbiAgICAgICAgICAgICAgICBlbnRyeS5zdGFnZSB8fCAnJyxcbiAgICAgICAgICAgICAgICBTdHJpbmcoZW50cnkud29yZENvdW50IHx8ICcnKSxcbiAgICAgICAgICAgICAgICBTdHJpbmcoZW50cnkuZmx1ZW5jeSB8fCAnJyksXG4gICAgICAgICAgICAgICAgU3RyaW5nKGVudHJ5LmR1cmF0aW9uKSxcbiAgICAgICAgICAgIF07XG4gICAgXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLnNldHRpbmdzLnNjcmlwdFVybH0/YXBpS2V5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYXBpS2V5KX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIG1vZGU6ICduby1jb3JzJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFBcnJheSlcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHN1Ym1pdCB0byBHb29nbGUgU2hlZXRzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHN1Ym1pdCB0byBHb29nbGUgU2hlZXRzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhcHBlbmRUb0ZpbGUoZW50cnk6IExvZ0VudHJ5KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKGVudHJ5LnRpbWVzdGFtcCk7XG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBnZXRMb2NhbERhdGVTdHJpbmcobm93KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNlc3Npb25OdW0gPSBhd2FpdCB0aGlzLmdldE5leHRTZXNzaW9uTnVtYmVyKGRhdGVTdHIpO1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGAke2RhdGVTdHJ9IFNlc3Npb24gJHtzZXNzaW9uTnVtfS5tZGA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250ZW50ID0gYFxuKipcblxuKipwbGFuKio6ICR7ZW50cnkucGxhbiB8fCAnJ31cbioqc3RhcnQgdGltZSoqOiAke2dldExvY2FsMjRIb3VyVGltZShub3cpfVxuKipzdGFnZSoqOiAke2VudHJ5LnN0YWdlIHx8ICcnfVxuKipwcm9qZWN0Kio6IFtbJHtlbnRyeS5wcm9qZWN0IHx8ICdObyBwcm9qZWN0J31dXVxuKipkdXJhdGlvbioqOiAke2VudHJ5LmR1cmF0aW9ufTowMFxuKip3b3JkIGNvdW50Kio6ICR7ZW50cnkud29yZENvdW50IHx8ICcnfVxuKipwcm9jZXNzKio6ICR7ZW50cnkubm90ZXMgfHwgJyd9XG4qKnRlc3Qgc3RhdCBmbHVlbmN5IG91dCBvZiA1Kio6ICR7ZW50cnkuZmx1ZW5jeSB8fCAnJ31cbioqbmV4dCBhY3Rpb25zKio6ICR7ZW50cnkubmV4dEFjdGlvbnMgfHwgJyd9XG5cbioqYC50cmltKCk7XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGZpbGVcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlTmFtZSwgY29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbmV3bHkgY3JlYXRlZCBmaWxlXG4gICAgICAgICAgICBjb25zdCBuZXdGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuZXdGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBPcGVuIHRoZSBmaWxlIGluIGEgbmV3IGxlYWZcbiAgICAgICAgICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldFVucGlubmVkTGVhZigpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxlYWYub3BlbkZpbGUobmV3RmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIGZpbGU6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGxvZyBlbnRyeSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldE5leHRTZXNzaW9uTnVtYmVyKGRhdGVTdHI6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKTtcbiAgICAgICAgY29uc3QgdG9kYXlGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+IFxuICAgICAgICAgICAgZmlsZS5uYW1lLnN0YXJ0c1dpdGgoZGF0ZVN0cikgJiYgXG4gICAgICAgICAgICBmaWxlLm5hbWUuaW5jbHVkZXMoJ1Nlc3Npb24nKVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRvZGF5RmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG1heFNlc3Npb24gPSAwO1xuICAgICAgICB0b2RheUZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGZpbGUubmFtZS5tYXRjaCgvU2Vzc2lvbiAoXFxkKykvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAobnVtID4gbWF4U2Vzc2lvbikgbWF4U2Vzc2lvbiA9IG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWF4U2Vzc2lvbiArIDE7XG4gICAgfVxufVxuXG5jbGFzcyBXcml0aW5nTG9nZ2VyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogV3JpdGluZ0xvZ2dlclBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFdyaXRpbmdMb2dnZXJQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ1dyaXRpbmcgTG9nZ2VyIFNldHRpbmdzJ30pO1xuXG4gICAgICAgIC8vIEdvb2dsZSBTaGVldHMgSW50ZWdyYXRpb24gU2VjdGlvblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdBcHBzIFNjcmlwdCBVUkwnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1VSTCBvZiB5b3VyIEdvb2dsZSBBcHBzIFNjcmlwdCB3ZWIgYXBwJylcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS8uLi4nKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRVcmwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0FQSSBLZXknKVxuICAgICAgICAgICAgLnNldERlc2MoJ0FQSSBrZXkgZm9yIEdvb2dsZSBTaGVldHMgYXV0aGVudGljYXRpb24nKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdFbnRlciB5b3VyIEFQSSBrZXknKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFNldHVwIEluc3RydWN0aW9uc1xuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ1NldHVwIEluc3RydWN0aW9ucyd9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtcbiAgICAgICAgICAgICcxLiBDcmVhdGUgYSBjb3B5IG9mIHRoZSB0ZW1wbGF0ZSBHb29nbGUgU2hlZXQnLFxuICAgICAgICAgICAgJzIuIEluIHRoZSBzaGVldCwgZ28gdG8gRXh0ZW5zaW9ucyA+IEFwcHMgU2NyaXB0JyxcbiAgICAgICAgICAgICczLiBDb3B5IHRoZSBBcHBzIFNjcmlwdCBjb2RlIGludG8gdGhlIHNjcmlwdCBlZGl0b3InLFxuICAgICAgICAgICAgJzQuIERlcGxveSBhcyBhIHdlYiBhcHAnLFxuICAgICAgICAgICAgJzUuIENvcHkgdGhlIGRlcGxveW1lbnQgVVJMIGFuZCBBUEkga2V5IGludG8gdGhlc2Ugc2V0dGluZ3MnXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zTGlzdCA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgICAgICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluc3RydWN0aW9ucy5mb3JFYWNoKGluc3RydWN0aW9uID0+IHtcbiAgICAgICAgICAgIGluc3RydWN0aW9uc0xpc3QuY3JlYXRlRWwoJ2RpdicsIHt0ZXh0OiBpbnN0cnVjdGlvbn0pO1xuICAgICAgICB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbIlNldHRpbmciLCJOb3RpY2UiLCJNb2RhbCIsIlRGaWxlIiwiUGx1Z2luIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBb0ZEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEssSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJO0FBQ3RELFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDekYsb0JBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN2RixvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDM0MsYUFBYTtBQUNiLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNsRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3pGLEtBQUs7QUFDTCxDQUFDO0FBaUxEO0FBQ3VCLE9BQU8sZUFBZSxLQUFLLFVBQVUsR0FBRyxlQUFlLEdBQUcsVUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUN2SCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUNyRjs7QUMzVUE7QUFDTSxTQUFVLGtCQUFrQixDQUFDLElBQVUsRUFBQTs7QUFFM0MsSUFBQSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQy9CLElBQUEsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUMxRCxJQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUVuRCxJQUFBLE9BQU8sVUFBRyxJQUFJLEVBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFJLEtBQUssRUFBSSxHQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsR0FBRyxDQUFFO0FBQ2xDO0FBRU0sU0FBVSxrQkFBa0IsQ0FBQyxJQUFVLEVBQUE7QUFDM0MsSUFBQSxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7QUFDdEQsSUFBQSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7QUFFMUQsSUFBQSxPQUFPLEVBQUcsQ0FBQSxNQUFBLENBQUEsS0FBSyxFQUFJLEdBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFPLENBQUU7QUFDOUI7O0FDSUEsSUFBQSxRQUFBLGtCQUFBLFVBQUEsTUFBQSxFQUFBO0lBQThCLFNBQUssQ0FBQSxRQUFBLEVBQUEsTUFBQSxDQUFBO0lBRy9CLFNBQVksUUFBQSxDQUFBLEdBQVEsRUFBVSxNQUEyQixFQUFBO0FBQ3JELFFBQUEsSUFBQSxLQUFBLEdBQUEsTUFBSyxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUMsR0FBRyxDQUFDLElBQUMsSUFBQTtRQURlLEtBQU0sQ0FBQSxNQUFBLEdBQU4sTUFBTTtBQUVoQyxRQUFBLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxZQUFBLFNBQVMsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFO0FBQzVCLFlBQUEsU0FBUyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztBQUNsQyxZQUFBLEtBQUssRUFBRSxFQUFFO0FBQ1QsWUFBQSxJQUFJLEVBQUUsRUFBRTtBQUNSLFlBQUEsT0FBTyxFQUFFLEVBQUU7QUFDWCxZQUFBLFFBQVEsRUFBRSxDQUFDO0FBQ1gsWUFBQSxTQUFTLEVBQUUsU0FBUztBQUNwQixZQUFBLEtBQUssRUFBRSxFQUFFO0FBQ1QsWUFBQSxPQUFPLEVBQUUsU0FBUztBQUNsQixZQUFBLFdBQVcsRUFBRTtTQUNoQjs7O0FBR0wsSUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLE1BQU0sR0FBTixZQUFBO1FBQUEsSUEySEMsS0FBQSxHQUFBLElBQUE7QUExSFcsUUFBQSxJQUFBLFNBQVMsR0FBSyxJQUFJLENBQUEsU0FBVDtRQUNqQixTQUFTLENBQUMsS0FBSyxFQUFFO1FBQ2pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLENBQUM7O1FBR3pELElBQUlBLGdCQUFPLENBQUMsU0FBUzthQUNoQixPQUFPLENBQUMsTUFBTTthQUNkLE9BQU8sQ0FBQyxzQ0FBc0M7QUFDOUMsYUFBQSxXQUFXLENBQUMsVUFBQSxJQUFJLEVBQUEsRUFBSSxPQUFBO2FBQ2hCLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFO2FBQzlCLGNBQWMsQ0FBQyxrQ0FBa0M7QUFDakQsYUFBQSxRQUFRLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQXZCLEVBQXVCLENBQUMsQ0FIMUIsRUFHMEIsQ0FBQzs7UUFHcEQsSUFBSUEsZ0JBQU8sQ0FBQyxTQUFTO2FBQ2hCLE9BQU8sQ0FBQyxZQUFZO2FBQ3BCLE9BQU8sQ0FBQyxzQ0FBc0M7QUFDOUMsYUFBQSxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUEsRUFBSSxPQUFBO2FBQ1osUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUU7YUFDbkMsY0FBYyxDQUFDLGFBQWE7YUFDNUIsUUFBUSxDQUFDLFVBQUEsS0FBSyxFQUFBOztBQUVYLFlBQUEsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLGdCQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUs7O0FBRXBDLFNBQUMsQ0FBQyxDQUFBLEVBQUEsQ0FBQzs7UUFHWCxJQUFJQSxnQkFBTyxDQUFDLFNBQVM7YUFDaEIsT0FBTyxDQUFDLE9BQU87YUFDZixPQUFPLENBQUMsZ0VBQWdFO0FBQ3hFLGFBQUEsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFBLEVBQUksT0FBQTthQUNaLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO2FBQy9CLGNBQWMsQ0FBQyw4QkFBOEI7QUFDN0MsYUFBQSxRQUFRLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQXhCLEVBQXdCLENBQUMsQ0FIL0IsRUFHK0IsQ0FBQzs7UUFHckQsSUFBSUEsZ0JBQU8sQ0FBQyxTQUFTO2FBQ2hCLE9BQU8sQ0FBQyxTQUFTO2FBQ2pCLE9BQU8sQ0FBQywwQ0FBMEM7QUFDbEQsYUFBQSxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUEsRUFBSSxPQUFBO2FBQ1osUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUU7YUFDakMsY0FBYyxDQUFDLDhCQUE4QjtBQUM3QyxhQUFBLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBMUIsRUFBMEIsQ0FBQyxDQUhqQyxFQUdpQyxDQUFDOztRQUd2RCxJQUFJQSxnQkFBTyxDQUFDLFNBQVM7YUFDaEIsT0FBTyxDQUFDLFVBQVU7YUFDbEIsT0FBTyxDQUFDLCtCQUErQjthQUN2QyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUE7O0FBQUksWUFBQSxPQUFBO0FBQ1osaUJBQUEsUUFBUSxDQUFDLENBQUEsQ0FBQSxFQUFBLEdBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLE1BQUUsSUFBQSxJQUFBLEVBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxRQUFRLEVBQUUsS0FBSSxFQUFFO2lCQUM5QyxjQUFjLENBQUMsVUFBVTtpQkFDekIsUUFBUSxDQUFDLFVBQUEsS0FBSyxFQUFBO0FBQ1gsZ0JBQUEsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxnQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2xCLG9CQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVE7O0FBRXRDLGFBQUMsQ0FBQztBQUFBLFNBQUEsQ0FBQzs7UUFHWCxJQUFJQSxnQkFBTyxDQUFDLFNBQVM7YUFDaEIsT0FBTyxDQUFDLFlBQVk7YUFDcEIsT0FBTyxDQUFDLG9DQUFvQzthQUM1QyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUE7O0FBQUksWUFBQSxPQUFBO0FBQ1osaUJBQUEsUUFBUSxDQUFDLENBQUEsQ0FBQSxFQUFBLEdBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLE1BQUUsSUFBQSxJQUFBLEVBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxRQUFRLEVBQUUsS0FBSSxFQUFFO2lCQUMvQyxjQUFjLENBQUMsV0FBVztpQkFDMUIsUUFBUSxDQUFDLFVBQUEsS0FBSyxFQUFBO0FBQ1gsZ0JBQUEsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUM3QixnQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2Ysb0JBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSzs7QUFFcEMsYUFBQyxDQUFDO0FBQUEsU0FBQSxDQUFDOztRQUdYLElBQUlBLGdCQUFPLENBQUMsU0FBUzthQUNoQixPQUFPLENBQUMsU0FBUzthQUNqQixPQUFPLENBQUMsa0NBQWtDO0FBQzFDLGFBQUEsV0FBVyxDQUFDLFVBQUEsSUFBSSxFQUFBLEVBQUksT0FBQTthQUNoQixRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTthQUMvQixjQUFjLENBQUMseUJBQXlCO0FBQ3hDLGFBQUEsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUF4QixFQUF3QixDQUFDLENBSDNCLEVBRzJCLENBQUM7O1FBR3JELElBQUlBLGdCQUFPLENBQUMsU0FBUzthQUNoQixPQUFPLENBQUMsbUJBQW1CO2FBQzNCLE9BQU8sQ0FBQyw4QkFBOEI7QUFDdEMsYUFBQSxTQUFTLENBQUMsVUFBQSxNQUFNLEVBQUEsRUFBSSxPQUFBO0FBQ2hCLGFBQUEsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQixRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQztBQUNoQyxhQUFBLGlCQUFpQjtBQUNqQixhQUFBLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBMUIsRUFBMEIsQ0FBQyxDQUo3QixFQUk2QixDQUFDOztRQUd2RCxJQUFJQSxnQkFBTyxDQUFDLFNBQVM7YUFDaEIsT0FBTyxDQUFDLGNBQWM7YUFDdEIsT0FBTyxDQUFDLDZCQUE2QjtBQUNyQyxhQUFBLFdBQVcsQ0FBQyxVQUFBLElBQUksRUFBQSxFQUFJLE9BQUE7YUFDaEIsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUU7YUFDckMsY0FBYyxDQUFDLDZCQUE2QjtBQUM1QyxhQUFBLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBOUIsRUFBOEIsQ0FBQyxDQUhqQyxFQUdpQyxDQUFDOztRQUczRCxJQUFJQSxnQkFBTyxDQUFDLFNBQVM7QUFDcEIsYUFBQSxTQUFTLENBQUMsVUFBQSxNQUFNLEVBQUEsRUFBSSxPQUFBO2FBQ2hCLGFBQWEsQ0FBQyxRQUFRO0FBQ3RCLGFBQUEsTUFBTTtBQUNOLGFBQUEsT0FBTyxDQUFDLFlBQUEsRUFBQSxPQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsU0FBQSxFQUFBLFNBQUEsRUFBQSxZQUFBOzs7OztBQUNMLHdCQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7NEJBQ3ZCLE9BQU8sQ0FBQSxDQUFBLFlBQUE7Ozt3QkFJWCxJQUFJLENBQUMsS0FBSyxFQUFFOzs7O3dCQUlSLE9BQU0sQ0FBQSxDQUFBLFlBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQWlCLENBQUMsQ0FBQTs7QUFBbEQsd0JBQUEsRUFBQSxDQUFBLElBQUEsRUFBa0Q7Ozs7QUFFbEQsd0JBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxPQUFLLENBQUM7d0JBQy9DLElBQUlDLGVBQU0sQ0FBQyx3QkFBd0IsR0FBRyxPQUFLLENBQUMsT0FBTyxDQUFDOzs7OzthQUUzRCxDQUFDLENBQUEsRUFBQSxDQUFDO0tBQ1Y7SUFFTyxRQUFXLENBQUEsU0FBQSxDQUFBLFdBQUEsR0FBbkIsVUFBb0IsSUFBWSxFQUFBOztRQUU1QixJQUFNLFNBQVMsR0FBRyxxQ0FBcUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkIsWUFBQSxPQUFPLEtBQUs7O0FBRWhCLFFBQUEsT0FBTyxJQUFJO0tBQ2Q7QUFFTyxJQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEsYUFBYSxHQUFyQixZQUFBO0FBQ0ksUUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDbEUsWUFBQSxJQUFJQSxlQUFNLENBQUMseUNBQXlDLENBQUM7QUFDckQsWUFBQSxPQUFPLEtBQUs7O0FBR2hCLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ25CLFlBQUEsSUFBSUEsZUFBTSxDQUFDLDhCQUE4QixDQUFDO0FBQzFDLFlBQUEsT0FBTyxLQUFLOztBQUdoQixRQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7QUFDakQsWUFBQSxJQUFJQSxlQUFNLENBQUMsK0JBQStCLENBQUM7QUFDM0MsWUFBQSxPQUFPLEtBQUs7O1FBR2hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO0FBQzNCLFlBQUEsSUFBSUEsZUFBTSxDQUFDLG9DQUFvQyxDQUFDO0FBQ2hELFlBQUEsT0FBTyxLQUFLOztBQUdoQixRQUFBLE9BQU8sSUFBSTtLQUNkO0FBRUQsSUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLE9BQU8sR0FBUCxZQUFBO0FBQ1ksUUFBQSxJQUFBLFNBQVMsR0FBSyxJQUFJLENBQUEsU0FBVDtRQUNqQixTQUFTLENBQUMsS0FBSyxFQUFFO0tBQ3BCO0lBQ0wsT0FBQyxRQUFBO0FBQUQsQ0F0TEEsQ0FBOEJDLGNBQUssQ0FzTGxDLENBQUE7O0FDL0xELElBQU0sZ0JBQWdCLEdBQW1CO0FBQ3JDLElBQUEsU0FBUyxFQUFFLEVBQUU7QUFDYixJQUFBLE1BQU0sRUFBRTtDQUNYO0FBRUQsSUFBQSxtQkFBQSxrQkFBQSxVQUFBLE1BQUEsRUFBQTtJQUFpRCxTQUFNLENBQUEsbUJBQUEsRUFBQSxNQUFBLENBQUE7QUFBdkQsSUFBQSxTQUFBLG1CQUFBLEdBQUE7OztBQUdVLElBQUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsTUFBTSxHQUFaLFlBQUE7Ozs7O0FBQ0ksb0JBQUEsS0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7O0FBQXpCLHdCQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQXlCO3dCQUV6QixJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ1osNEJBQUEsRUFBRSxFQUFFLHNCQUFzQjtBQUMxQiw0QkFBQSxJQUFJLEVBQUUsc0JBQXNCO0FBQzVCLDRCQUFBLFFBQVEsRUFBRSxZQUFBO2dDQUNOLElBQUksUUFBUSxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFOztBQUUxQyx5QkFBQSxDQUFDOztBQUdGLHdCQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQUE7NEJBQ3JELElBQUksUUFBUSxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLHlCQUFDLENBQUM7QUFFRix3QkFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFFL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNaLDRCQUFBLEVBQUUsRUFBRSx3QkFBd0I7QUFDNUIsNEJBQUEsSUFBSSxFQUFFLCtCQUErQjtBQUNyQyw0QkFBQSxRQUFRLEVBQUUsWUFBQSxFQUFBLE9BQUEsU0FBQSxDQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLFlBQUE7Ozs7OztBQUVJLDRDQUFBLFFBQVEsR0FBYTtBQUN2QixnREFBQSxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7Z0RBQ25DLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEcsZ0RBQUEsUUFBUSxFQUFFLFlBQVk7QUFDdEIsZ0RBQUEsT0FBTyxFQUFFLGNBQWM7QUFDdkIsZ0RBQUEsUUFBUSxFQUFFLENBQUM7QUFDWCxnREFBQSxPQUFPLEVBQUUsQ0FBQztBQUNWLGdEQUFBLFNBQVMsRUFBRSxHQUFHO0FBQ2QsZ0RBQUEsS0FBSyxFQUFFLHNCQUFzQjtBQUM3QixnREFBQSxLQUFLLEVBQUUsU0FBUztBQUNoQixnREFBQSxJQUFJLEVBQUUsV0FBVztBQUNqQixnREFBQSxXQUFXLEVBQUU7NkNBQ2hCO0FBRUQsNENBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUFuQyw0Q0FBQSxFQUFBLENBQUEsSUFBQSxFQUFtQztBQUNuQyw0Q0FBQSxJQUFJRCxlQUFNLENBQUMsNkJBQTZCLENBQUM7Ozs7QUFFekMsNENBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxPQUFLLENBQUM7NENBQy9DLElBQUlBLGVBQU0sQ0FBQyxlQUFnQixDQUFBLE1BQUEsQ0FBQSxPQUFLLENBQUMsT0FBTyxDQUFFLENBQUM7Ozs7O0FBRWxELDZCQUFBLENBQUEsQ0FBQTtBQUNKLHlCQUFBLENBQUM7Ozs7O0FBQ0wsS0FBQTtBQUVLLElBQUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsWUFBWSxHQUFsQixZQUFBOzs7Ozs7QUFDSSx3QkFBQSxFQUFBLEdBQUEsSUFBSTtBQUFZLHdCQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxNQUFNLEVBQUMsTUFBTTtBQUFDLHdCQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQTtBQUFFLHdCQUFBLE9BQUEsQ0FBQSxDQUFBLFlBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOztBQUF6RSx3QkFBQSxFQUFBLENBQUssUUFBUSxHQUFHLEVBQW9DLENBQUEsS0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsRUFBcUIsR0FBQzs7Ozs7QUFDN0UsS0FBQTtBQUVLLElBQUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsWUFBWSxHQUFsQixZQUFBOzs7OzRCQUNJLE9BQU0sQ0FBQSxDQUFBLFlBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBQWxDLHdCQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQWtDOzs7OztBQUNyQyxLQUFBO0lBRUssbUJBQVEsQ0FBQSxTQUFBLENBQUEsUUFBQSxHQUFkLFVBQWUsS0FBZSxFQUFBOzs7Ozs7OztBQUd0Qix3QkFBQSxPQUFBLENBQUEsQ0FBQSxZQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7OztBQUFoQyx3QkFBQSxFQUFBLENBQUEsSUFBQSxFQUFnQzs7QUFHaEMsd0JBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBOzs7QUFBOUIsd0JBQUEsRUFBQSxDQUFBLElBQUEsRUFBOEI7QUFFOUIsd0JBQUEsSUFBSUEsZUFBTSxDQUFDLDhCQUE4QixDQUFDOzs7O0FBRTFDLHdCQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsT0FBSyxDQUFDO0FBQy9DLHdCQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUM7Ozs7O0FBRTNGLEtBQUE7SUFFSyxtQkFBYyxDQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQXBCLFVBQXFCLEtBQWUsRUFBQTs7Ozs7O0FBQ2hDLHdCQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ25ELDRCQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUM7Ozs7O3dCQUk5RSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUMvQix3QkFBQSxTQUFTLEdBQUc7NEJBQ2Qsa0JBQWtCLENBQUMsR0FBRyxDQUFDOzRCQUN2QixLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUU7NEJBQ3JCLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRTs0QkFDbkIsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ2pCLDRCQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztBQUM3Qiw0QkFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDM0IsNEJBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7eUJBQ3pCO0FBRUssd0JBQUEsR0FBRyxHQUFHLEVBQUcsQ0FBQSxNQUFBLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUEsVUFBQSxDQUFBLENBQUEsTUFBQSxDQUFXLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUU7d0JBRTFFLE9BQU0sQ0FBQSxDQUFBLFlBQUEsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUM5QixnQ0FBQSxNQUFNLEVBQUUsTUFBTTtBQUNkLGdDQUFBLElBQUksRUFBRSxTQUFTO0FBQ2YsZ0NBQUEsT0FBTyxFQUFFO0FBQ0wsb0NBQUEsY0FBYyxFQUFFO0FBQ25CLGlDQUFBO0FBQ0QsZ0NBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztBQUNqQyw2QkFBQSxDQUFDLENBQUE7O0FBUEksd0JBQVcsRUFPZixDQUFBLElBQUEsRUFBQTtBQUVGLHdCQUFBLE9BQUEsQ0FBQSxDQUFBLGFBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OztBQUV6Qix3QkFBQSxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLE9BQUssQ0FBQztBQUMxRCx3QkFBQSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDOzs7OztBQUUzRCxLQUFBO0lBRUssbUJBQVksQ0FBQSxTQUFBLENBQUEsWUFBQSxHQUFsQixVQUFtQixLQUFlLEVBQUE7Ozs7Ozt3QkFDeEIsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDL0Isd0JBQUEsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztBQUVwQix3QkFBQSxPQUFBLENBQUEsQ0FBQSxZQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7QUFBckQsd0JBQUEsVUFBVSxHQUFHLEVBQXdDLENBQUEsSUFBQSxFQUFBO0FBQ3JELHdCQUFBLFFBQVEsR0FBRyxFQUFHLENBQUEsTUFBQSxDQUFBLE9BQU8sRUFBWSxXQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBVSxRQUFLO3dCQUVoRCxPQUFPLEdBQUcsb0JBR1osQ0FBQSxNQUFBLENBQUEsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQ1Ysb0JBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLENBQzVCLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUNiLG1CQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsS0FBSyxDQUFDLE9BQU8sSUFBSSxZQUFZLEVBQzlCLG9CQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsS0FBSyxDQUFDLFFBQVEsa0NBQ1osS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUEsaUJBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FDeEIsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUEsb0NBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FDRSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDakMsc0JBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFFeEMsUUFBQSxDQUFBLENBQUMsSUFBSSxFQUFFOzs7OztBQUlFLHdCQUFBLE9BQUEsQ0FBQSxDQUFBLFlBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTs7O0FBQTlDLHdCQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQThDO3dCQUd4QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDO0FBQzFELHdCQUFBLElBQUEsRUFBQSxPQUFPLFlBQVlFLGNBQUssQ0FBQSxFQUF4QixPQUF3QixDQUFBLENBQUEsWUFBQSxDQUFBLENBQUE7d0JBRWxCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUU7QUFDakQsd0JBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUE1Qix3QkFBQSxFQUFBLENBQUEsSUFBQSxFQUE0Qjs7Ozs7QUFHaEMsd0JBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxPQUFLLENBQUM7QUFDOUMsd0JBQUEsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQzs7Ozs7QUFFekQsS0FBQTtJQUVhLG1CQUFvQixDQUFBLFNBQUEsQ0FBQSxvQkFBQSxHQUFsQyxVQUFtQyxPQUFlLEVBQUE7Ozs7Z0JBQ3hDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDakMsZ0JBQUEsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLEVBQUE7QUFDaEMsb0JBQUEsT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7QUFDN0Isd0JBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBRDdCLGlCQUM2QixDQUNoQztBQUVELGdCQUFBLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDekIsb0JBQUEsT0FBQSxDQUFBLENBQUEsYUFBTyxDQUFDLENBQUM7O2dCQUdULFVBQVUsR0FBRyxDQUFDO0FBQ2xCLGdCQUFBLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUE7b0JBQ25CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztvQkFDOUMsSUFBSSxLQUFLLEVBQUU7d0JBQ1AsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxHQUFHLEdBQUcsVUFBVTs0QkFBRSxVQUFVLEdBQUcsR0FBRzs7QUFFOUMsaUJBQUMsQ0FBQztnQkFFRixPQUFPLENBQUEsQ0FBQSxhQUFBLFVBQVUsR0FBRyxDQUFDLENBQUM7OztBQUN6QixLQUFBO0lBQ0wsT0FBQyxtQkFBQTtBQUFELENBektBLENBQWlEQyxlQUFNLENBeUt0RDtBQUVELElBQUEsdUJBQUEsa0JBQUEsVUFBQSxNQUFBLEVBQUE7SUFBc0MsU0FBZ0IsQ0FBQSx1QkFBQSxFQUFBLE1BQUEsQ0FBQTtJQUdsRCxTQUFZLHVCQUFBLENBQUEsR0FBUSxFQUFFLE1BQTJCLEVBQUE7QUFDN0MsUUFBQSxJQUFBLEtBQUEsR0FBQSxNQUFLLENBQUMsSUFBQSxDQUFBLElBQUEsRUFBQSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUMsSUFBQTtBQUNuQixRQUFBLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTs7O0FBR3hCLElBQUEsdUJBQUEsQ0FBQSxTQUFBLENBQUEsT0FBTyxHQUFQLFlBQUE7UUFBQSxJQStDQyxLQUFBLEdBQUEsSUFBQTtBQTlDVSxRQUFBLElBQUEsV0FBVyxHQUFJLElBQUksQ0FBQSxXQUFSO1FBQ2xCLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFFbkIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUMsQ0FBQzs7UUFHN0QsSUFBSUosZ0JBQU8sQ0FBQyxXQUFXO2FBQ2xCLE9BQU8sQ0FBQyxpQkFBaUI7YUFDekIsT0FBTyxDQUFDLHdDQUF3QztBQUNoRCxhQUFBLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBQSxFQUFJLE9BQUE7YUFDWixjQUFjLENBQUMsK0JBQStCO2FBQzlDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2FBQ3ZDLFFBQVEsQ0FBQyxVQUFPLEtBQUssRUFBQSxFQUFBLE9BQUEsU0FBQSxDQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLFlBQUE7Ozs7d0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLO0FBQ3RDLHdCQUFBLE9BQUEsQ0FBQSxDQUFBLFlBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQTs7QUFBaEMsd0JBQUEsRUFBQSxDQUFBLElBQUEsRUFBZ0M7Ozs7YUFDbkMsQ0FBQyxDQUFBLEVBQUEsQ0FBQztRQUVYLElBQUlBLGdCQUFPLENBQUMsV0FBVzthQUNsQixPQUFPLENBQUMsU0FBUzthQUNqQixPQUFPLENBQUMsMENBQTBDO0FBQ2xELGFBQUEsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFBLEVBQUksT0FBQTthQUNaLGNBQWMsQ0FBQyxvQkFBb0I7YUFDbkMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU07YUFDcEMsUUFBUSxDQUFDLFVBQU8sS0FBSyxFQUFBLEVBQUEsT0FBQSxTQUFBLENBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxTQUFBLEVBQUEsWUFBQTs7Ozt3QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUs7QUFDbkMsd0JBQUEsT0FBQSxDQUFBLENBQUEsWUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFBOztBQUFoQyx3QkFBQSxFQUFBLENBQUEsSUFBQSxFQUFnQzs7OzthQUNuQyxDQUFDLENBQUEsRUFBQSxDQUFDOztRQUdYLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFDLENBQUM7QUFFeEQsUUFBQSxJQUFNLFlBQVksR0FBRztZQUNqQiwrQ0FBK0M7WUFDL0MsaURBQWlEO1lBQ2pELHFEQUFxRDtZQUNyRCx3QkFBd0I7WUFDeEI7U0FDSDtBQUVELFFBQUEsSUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtBQUNqRCxZQUFBLEdBQUcsRUFBRTtBQUNSLFNBQUEsQ0FBQztBQUVGLFFBQUEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFdBQVcsRUFBQTtZQUM1QixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQ3pELFNBQUMsQ0FBQztLQUNMO0lBQ0wsT0FBQyx1QkFBQTtBQUFELENBeERBLENBQXNDSyx5QkFBZ0IsQ0F3RHJELENBQUE7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==

# Gus the Writing Assistant

An Obsidian plugin for tracking writing sessions with Google Sheets integration.

![A form interface titled "Log Writing Session" with multiple input fields. The form includes sections for: Plan (asking about session goals), Start Time (in 24-hour format, showing 17:19), Stage (for writing stage), Project (for project name), Duration (in minutes), Word Count (optional), Process (for notes about writing), Test Stat Fluency (with a slider rating 1-5), and Next Actions (for future steps). The form has a purple "Submit" button at the bottom. All fields appear empty or with placeholder text showing example inputs. A close button "×" appears in the top-right corner.](./assets/writing-session-form.png)

## Features

- Log writing sessions with detailed metadata
- Auto-creates dated session files in your vault
- Syncs logs to Google Sheets for analysis
- Tracks:
  - Session plans
  - Writing stage
  - Project links
  - Duration
  - Word count
  - Process notes
  - Fluency rating
  - Next actions

## Installation

1. Download the latest release from the GitHub releases page
2. Extract the zip file
3. Copy the `gus-writing-assistant` folder to your Obsidian vault's `.obsidian/plugins` directory
4. Enable the plugin in Obsidian's Community Plugins settings

## Google Sheets Setup

1. Create a new Google Sheet
2. Open the Apps Script editor (Extensions > Apps Script)
3. Copy the contents of [apps_script.gs](./apps_script.gs) from this repo into the editor
4. Save the script
5. Run the `setupApiKey` function:
   - In the Apps Script editor, select `setupApiKey` from the function dropdown
   - Click the "Run" button (play icon)
   - An API key will be displayed in the execution log
   - Save this API key - you'll need it for Obsidian
6. Deploy as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone with Google Account"
   - Click "Deploy"
   - Authorize the app when prompted
   - Copy the deployment URL
7. In Obsidian:
   - Go to Settings > Gus Writing Assistant
   - Paste the deployment URL in "Apps Script URL"
   - Paste your copied API key into the "API Key" field

## Usage

1. Launch Gus! There are 2 entrypoints:
   - Click the book icon in the Obsidian ribbon to open the logging form
   - Open the command palette (<kbd>Command</kbd>/<kbd>Control</kbd>+<kbd>P</kbd>) and type "Gus", choose "Log writing activity"
2. Fill in your session details:
   - Plan: What you intend to accomplish
   - Start Time: When you began (24-hour format)
   - Stage: Your writing stage (e.g., "drafting", "editing")
   - Project: Project name (will create a wiki link)
   - Duration: Session length in minutes
   - Word Count: Number of words written
   - Process Notes: Observations about your writing
   - Fluency Rating: How easily the words flowed (1-5)
   - Next Actions: What to do next
3. Click Submit

The plugin will:

- Create a new markdown file named `YYYY-MM-DD Session N.md`
- Open the file automatically
- Sync the data to your Google Sheet

## File Structure

Each session creates a markdown file with this format:

```markdown
**plan**: Read through existing draft
**start time**: 14:30
**stage**: revising
**project**: [[my-novel]]
**duration**: 45:00
**word count**: 500
**process**: Made good progress on chapter 3
**test stat fluency out of 5**: 4
**next actions**: Complete chapter 3 revision
```

## Troubleshooting

If you encounter issues:

1. **Plugin won't load**:
   - Check that the plugin folder is in the correct location
   - Verify the plugin is enabled in Obsidian settings

2. **Google Sheets sync fails**:
   - Verify your Apps Script URL in the settings
   - Check that the web app is properly deployed
   - Ensure you're logged into your Google account

3. **Files not creating**:
   - Check your Obsidian permissions
   - Verify you have write access to your vault

## Support

If you encounter any issues or have feature requests:

1. Check the GitHub Issues page
2. Open a new issue if needed

## License

MIT

# eln: An Electronic Lab Notebook

ELN provides a simple way to save, organize, and display experimental results.

## Install
On a UTCS machine:
```
git clone git@github.com:LARG/eln.git ~/public_html/eln
```

## Usage
1. Visit your ELN at: https://www.cs.utexas.edu/~user/eln/index.php.
2. Clicking on the blue date next to experiments will expand/hide the contents of that folder.
3. To add new content, simply create a directory with the following structure: ~/public_html/eln/project_name/experiment_name/yyyy-mm-dd/. Then add content to this directory.
4. By default ELN is configured to display .png/.txt/.mp4 files. To add support for displaying other file types, simply edit the displayFile function of main.js.

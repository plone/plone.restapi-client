SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

DOCKER_IMAGE=plone/plone-backend:6.0.1
TESTING_ADDONS=plone.app.robotframework==2.0.0 plone.app.testing==7.0.0

# Docs variables
## You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD     = $(realpath bin/sphinx-build)
SPHINXAUTOBUILD = $(realpath bin/sphinx-autobuild)
PAPER         =
DOCS_DIR      = ./docs/
BUILDDIR      = ../_build

## Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .
## the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .
VALEFILES       := $(shell find -L $(DOCS_DIR) -type d \( -path $(DOCS_DIR)/plone.restapi/lib/* -o  -path $(DOCS_DIR)"/plone.restapi/performance/*" \) -prune -false -o -type f -name "*.md" -print)

DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:6.0.6

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -d --name plone-client-acceptance-server -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: stop-test-acceptance-server
stop-test-acceptance-server: ## Stop Test Acceptance Server Main Fixture (docker container)
	docker stop plone-client-acceptance-server

# Docs commands

.PHONY: docs-clean
docs-clean: ## Clean build directory
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/*

.PHONY: docs-distclean
docs-distclean:  ## Clean docs build directory and Python virtual environment
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/
	rm -rf ./bin/ ./lib/ ./lib64 ./include ./pyvenv.cfg

bin/python:  ## Set up docs: Install requirements
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	bin/pip install -r requirements.txt
	@echo
	@echo "Installation of requirements completed."

.PHONY: html
html: bin/python  ## Build html
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: livehtml
livehtml: bin/python  ## Rebuild Sphinx documentation on changes, with live-reload in the browser
	cd "$(DOCS_DIR)" && $(SPHINXAUTOBUILD) \
		--ignore "*.swp" \
		-b html . "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)

.PHONY: dirhtml
dirhtml: bin/python
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(BUILDDIR)/dirhtml
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/dirhtml."

.PHONY: singlehtml
singlehtml: bin/python
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
	@echo
	@echo "Build finished. The HTML page is in $(BUILDDIR)/singlehtml."

.PHONY: docs-changes
docs-changes: bin/python
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo
	@echo "The overview file is in $(BUILDDIR)/changes."

.PHONY: linkcheck
linkcheck: bin/python  ## Run linkcheck
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: linkcheckbroken
linkcheckbroken: bin/python  ## Run linkcheck and show only broken links
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=auto || test $$? = 1
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: spellcheck
spellcheck: bin/python  ## Run spellcheck
	cd $(DOCS_DIR) && LANGUAGE=$* $(SPHINXBUILD) -b spelling -j 4 $(ALLSPHINXOPTS) $(BUILDDIR)/spellcheck/$*
	@echo
	@echo "Spellcheck is finished; look for any errors in the above output " \
		" or in $(BUILDDIR)/spellcheck/ ."

.PHONY: html_meta
html_meta:
	python ./docs/addMetaData.py

.PHONY: docs-test
docs-test: clean linkcheckbroken spellcheck  ## Run linkcheckbroken, spellcheck

.PHONY: vale
vale: bin/python  ## Run Vale style, grammar, and spell checks
	vale sync
	vale --no-wrap $(VALEFILES)
	@echo
	@echo "Vale is finished; look for any errors in the above output."

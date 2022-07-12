install: 
		npm ci

publish: 
		npm publish --dry-run

lint: 
		npx eslint .

test:
	npm test


test-coverage:#initilizing test-coverage
	npm test -- --coverage --coverageProvider=v8

test-watch:#initilizing tests
	NODE_OPTIONS=--experimental-vm-modules npx jest --bail --watch
